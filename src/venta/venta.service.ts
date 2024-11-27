import { Injectable } from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';
import { Repository } from 'typeorm';
import { detalleVenta } from './entities/detalleventa.entity';
import { Comprobante } from './entities/comprobante.entity';
import {
  CreateComprobanteDto,
  CreateDetalleVentaDto,
  CreateMasterDto,
  UpdateMasterDto,
} from './dto';
import { Master } from './entities/master.entity';

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
  ) {}

  //VENTA
  createVenta(createVentaDto: CreateVentaDto) {
    const newVenta = this.ventaRepository.create(createVentaDto);
    return this.ventaRepository.save(newVenta);
  }

  findOneVenta(id: string) {
    return this.ventaRepository.findOne({
      where: {
        idVenta: id,
      },
    });
  }

  //DETALLE-VENTA
  createdetalleVenta(createDetalleVentaDto: CreateDetalleVentaDto) {
    const newDetalleVenta = this.detalleVentaRepository.create(
      createDetalleVentaDto,
    );
    return this.detalleVentaRepository.save(newDetalleVenta);
  }

  findOnedetalleVenta(id: string) {
    return this.detalleVentaRepository.findOne({
      where: {
        idDetalleVenta: id,
      },
    });
  }

  //COMPROBANTE
  createComprobante(createComprobanteDto: CreateComprobanteDto) {
    const newComprobante =
      this.comprobanteRepository.create(createComprobanteDto);
    return this.comprobanteRepository.save(newComprobante);
  }

  findOneComprobante(id: string) {
    return this.comprobanteRepository.findOne({
      where: {
        idComprobante: id,
      },
    });
  }

  //MASTER
  createMaster(createMasterDto: CreateMasterDto) {
    const newMaster = this.masterRepository.create(createMasterDto);
    return this.masterRepository.save(newMaster);
  }

  update(id: string, updateMasterDto: UpdateMasterDto) {
    return this.masterRepository.update(id, updateMasterDto);
  }
}
