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

  ) { }

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

  async traerCompras(idPersona: string) {
    try {
      // Buscar todas las ventas activas del usuario
      const ventas = await this.ventaRepository.find({
        where: { idPersona: idPersona, estado: true },
      });
  
      // Si no hay ventas, devolver un array vacío
      if (!ventas || ventas.length === 0) {
        return [];
      }
  
      // Iterar sobre cada venta para construir la respuesta
      const compras = await Promise.all(
        ventas.map(async (venta) => {
          // Buscar el detalle de la venta asociada
          const detalleVenta = await this.detalleVentaRepository.findOne({
            where: { venta: { idVenta: venta.idVenta }, estado: true },
          });
  
          if (!detalleVenta) {
            throw new Error(`No se encontró detalle para la venta con ID: ${venta.idVenta}`);
          }
  
          // Buscar el producto asociado al detalle
          const producto = await this.productoRepository.findOne({
            where: { idProducto: detalleVenta.idProducto },
            relations: ['idCategoria'], // Cargar relaciones necesarias
          });
  
          if (!producto) {
            throw new Error(`No se encontró el producto con ID: ${detalleVenta.idProducto}`);
          }

          const fechaFormateada = moment(venta.fecha).format(
            'HH:mm - DD/MM/YYYY',
          );
  
          // Construir la respuesta de la compra
          return { 
            idVenta: venta.idVenta,
            nombre: producto.nombre,
            categoria: producto.idCategoria?.nombre || 'Sin categoría',
            cantidad: detalleVenta.cantidad,
            fecha: fechaFormateada,
            monto: detalleVenta.precioTotal,
          };
        })
      );
  
      return compras; // Retorna un array de compras
    } catch (error) {
      throw new BadRequestException('ERROR AL TRAER LAS COMPRAS DEL USUARIO:', error.message || error);
    }
  }


  async traerVentas() {
    try {
      // Buscar todas las ventas activas del usuario
      const ventas = await this.ventaRepository.find({
        where: {  estado: true },
      });
  
      // Si no hay ventas, devolver un array vacío
      if (!ventas || ventas.length === 0) {
        return [];
      }
  
      // Iterar sobre cada venta para construir la respuesta
      const compras = await Promise.all(
        ventas.map(async (venta) => {
          // Buscar el detalle de la venta asociada
          const detalleVenta = await this.detalleVentaRepository.findOne({
            where: { venta: { idVenta: venta.idVenta }, estado: true },
          });
  
          if (!detalleVenta) {
            throw new Error(`No se encontró detalle para la venta con ID: ${venta.idVenta}`);
          }
          //buscar comprobante
          const comprobante = await this.comprobanteRepository.findOne({
            where: { venta: { idVenta: venta.idVenta }, estado: true },
          });
  
          if (!comprobante) {
            throw new Error(`No se encontró comprobante para la venta con ID: ${venta.idVenta}`);
          }

          //buscar persona
          const persona = await this.usuarioRepository.findOne({
            where: { idUsuario: venta.usuario.idUsuario, estado: true },
            relations: ['persona'],
          });
           
          if (!persona) {
            throw new Error(`No se encontró la persona con ID: ${persona.idUsuario}`);
          }

  
          // Buscar el producto asociado al detalle
          const producto = await this.productoRepository.findOne({
            where: { idProducto: detalleVenta.idProducto },
            relations: ['idCategoria'], // Cargar relaciones necesarias
          });
  
          if (!producto) {
            throw new Error(`No se encontró el producto con ID: ${detalleVenta.idProducto}`);
          }

          const fechaFormateada = moment(venta.fecha).format(
            'HH:mm - DD/MM/YYYY',
          );
  
          // Construir la respuesta de la compra
          return { 
            idVenta: venta.idVenta,
            nDocumento: persona.persona.nDocumento,
            cliente: persona.persona.nombres,
            producto: producto.nombre,
            cantidad: detalleVenta.cantidad,
            tipo: comprobante.tipoComprobante,
            fecha: fechaFormateada,
            monto: detalleVenta.precioTotal,
            
          };
        })
      );
  
      return compras; // Retorna un array de compras
    } catch (error) {
      throw new BadRequestException('ERROR AL TRAER LAS COMPRAS DEL USUARIO:', error.message || error);
    }
  }

  async compra(idVenta: string) {
    try {
      // Buscar la venta activa por ID
      const venta = await this.ventaRepository.findOne({
        where: { idVenta: idVenta, estado: true },
      });
  
      if (!venta) {
        throw new Error(`No se encontró la venta con ID: ${idVenta}`);
      }
  
      // Buscar el detalle de la venta asociada
      const detalleVenta = await this.detalleVentaRepository.findOne({
        where: { venta: { idVenta: venta.idVenta }, estado: true },
      });
  
      if (!detalleVenta) {
        throw new Error(`No se encontró detalle para la venta con ID: ${idVenta}`);
      }
  
      // Buscar el producto asociado al detalle
      const producto = await this.productoRepository.findOne({
        where: { idProducto: detalleVenta.idProducto },
        relations: ['idCategoria'], // Cargar relaciones necesarias
      });
  
      if (!producto) {
        throw new Error(`No se encontró el producto con ID: ${detalleVenta.idProducto}`);
      }

      //buscar comprobante
      const comprobante = await this.comprobanteRepository.findOne({
        where: { venta: { idVenta: venta.idVenta }, estado: true },
      });

      if (!comprobante) {
        throw new Error(`No se encontró comprobante para la venta con ID: ${venta.idVenta}`);
      }

      //buscar persona
      const persona = await this.usuarioRepository.findOne({
        where: { idUsuario: venta.usuario.idUsuario, estado: true },
        relations: ['persona'],
      });
       
      if (!persona) {
        throw new Error(`No se encontró la persona con ID: ${persona.idUsuario}`);
      }

  
      // Formatear la fecha
      const fechaFormateada = moment(venta.fecha).format('HH:mm - DD/MM/YYYY');
  

      // Construir y retornar la respuesta
      return {
        comprobante: {
          idComprobante: comprobante.idComprobante,
          serie: comprobante.serie,
          numeracion: comprobante.numeracion,
          tipo: comprobante.tipoComprobante,
        },
        venta: {
          nombrePersona: persona.persona.nombres,
          apellidos: persona.persona.apellidos,
          documento: persona.persona.documento,
          nDocumento: persona.persona.nDocumento,
          telefono: persona.persona.telefono,
          fecha: fechaFormateada,
        },
        detalleVenta: {
          categoria: producto.idCategoria.nombre,
          nombreProducto: producto.nombre,
          cantidad: detalleVenta.cantidad,
          subTotal: venta.subTotal,
          igv: venta.igv,
          total: detalleVenta.precioTotal,
        },
      };
    } catch (error) {
      throw new BadRequestException('ERROR AL TRAER LA COMPRA DEL USUARIO:', error.message || error);
    }
  }
  
  
  
}
