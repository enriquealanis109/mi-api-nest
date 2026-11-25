import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateMedicoDto } from './dto/create-medico.dto.js';
import { UpdateMedicoDto } from './dto/update-medico.dto.js';

@Injectable()
export class MedicosService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateMedicoDto) {
    return this.prisma.doctor.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        specialtyId: dto.specialtyId,
        userId: dto.userId,
      },
    });
  }

  findAll() {
    return this.prisma.doctor.findMany();
  }

  findOne(id: number) {
    return this.prisma.doctor.findUnique({ where: { id } });
  }

  update(id: number, dto: UpdateMedicoDto) {
    return this.prisma.doctor.update({
      where: { id },
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        specialtyId: dto.specialtyId,
        userId: dto.userId,
      },
    });
  }

  remove(id: number) {
    return this.prisma.doctor.delete({ where: { id } });
  }
}
