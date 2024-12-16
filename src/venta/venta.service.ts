import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';
import { Repository } from 'typeorm';
import { detalleVenta } from './entities/detalleventa.entity';
import { Comprobante } from './entities/comprobante.entity';
import { CreateDetalleVentaDto, CreateMasterDto } from './dto';
import { Master } from './entities/master.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import * as moment from 'moment';

@Injectable()
export class VentaService {
  constructor(
    @InjectRepository(Venta)
    private readonly ventaRepository: Repository<Venta>,
    @InjectRepository(detalleVenta)
    private readonly detalleVentaRepository: Repository<detalleVenta>,
    @InjectRepository(Comprobante)
    private readonly comprobanteRepository: Repository<Comprobante>,
    @InjectRepository(Master)
    private readonly masterRepository: Repository<Master>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  //VENTA
  async createVenta(idUsuario: string, createVentaDto: CreateDetalleVentaDto) {
    try {
      // Obtener la persona relacionada al usuario
      const usuario = await this.usuarioRepository.findOne({
        where: { idUsuario: idUsuario },
        relations: ['persona'],
      });

      if (!usuario || !usuario.persona) {
        throw new BadRequestException(
          'El usuario no tiene una persona asociada',
        );
      }

      const persona = usuario.persona;

      // Obtener el precio del producto y calcular el precioTotal
      const producto = await this.productoRepository.findOne({
        where: { idProducto: createVentaDto.idProducto },
      });

      if (!producto) {
        throw new BadRequestException('El producto no existe');
      }

      const precioTotal = +(producto.precio * createVentaDto.cantidad).toFixed(
        2,
      );

      // Calcular subtotal e IGV
      const igv = +(precioTotal * 0.18).toFixed(2);
      const subTotal = +(precioTotal - igv).toFixed(2);

      // Crear la venta
      const venta = this.ventaRepository.create({
        persona,
        subTotal,
        igv,
        tipoPago: 'TARJETA',
        usuario,
      });

      const nuevaVenta = await this.ventaRepository.save(venta);

      // Crear el detalle de la venta
      const detalleVenta = this.detalleVentaRepository.create({
        ...createVentaDto,
        precioTotal,
        venta: nuevaVenta,
      });

      await this.detalleVentaRepository.save(detalleVenta);

      // Crear el comprobante
      const serieKey = persona.documento === 'RUC' ? 'F001' : 'B001';
      const tipoComprobante =
        persona.documento === 'RUC' ? 'Factura' : 'Boleta';

      const master = await this.masterRepository.findOne({
        where: { serie: serieKey },
      });

      if (!master) {
        throw new BadRequestException(
          'No se encontró la información de la serie en Master',
        );
      }

      const comprobante = this.comprobanteRepository.create({
        serie: master.serie,
        numeracion: master.numeracion,
        tipoComprobante,
        venta: nuevaVenta,
      });

      await this.comprobanteRepository.save(comprobante);

      // Actualizar la numeración en Master
      master.numeracion += 1;
      await this.masterRepository.save(master);

      const fechaFormateada = moment(nuevaVenta.fecha).format(
        'HH:mm - DD/MM/YYYY',
      );

      return {
        comprobante: {
          idComprobante: comprobante.idComprobante,
          serie: comprobante.serie,
          numeracion: comprobante.numeracion,
          tipo: comprobante.tipoComprobante,
        },
        venta: {
          nombrePersona: persona.nombres,
          apellidos: persona.apellidos,
          documento: persona.documento,
          nDocumento: persona.nDocumento,
          telefono: persona.telefono,
          fecha: fechaFormateada,
        },
        detalleVenta: {
          categoria: producto.idCategoria.nombre,
          nombreProducto: producto.nombre,
          cantidad: createVentaDto.cantidad,
          subTotal,
          igv,
          total: precioTotal,
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message || 'Error al crear la venta');
    }
  }

  async createMaster(createMasterDto: CreateMasterDto) {
    try {
      const newMaster = this.masterRepository.create(createMasterDto);
      return await this.masterRepository.save(newMaster);
    } catch (error) {
      throw new BadRequestException('ERROR AL CREAR DATO MASTER: ', error);
    }
  }
}
