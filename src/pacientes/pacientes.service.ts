import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreatePacienteDto } from './dto/create-paciente.dto.js';
import { UpdatePacienteDto } from './dto/update-paciente.dto.js';

@Injectable()
export class PacientesService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreatePacienteDto) {
    if (new Date(dto.birthDate) > new Date()) {
      throw new BadRequestException(
        'La fecha de nacimiento no puede ser futura',
      );
    }
    return this.prisma.patient.create({
      data: {
        name: dto.name,
        email: dto.email,
        birthDate: new Date(dto.birthDate),
        phone: dto.phone,
      },
    });
  }

  findAll() {
    return this.prisma.patient.findMany();
  }

  findOne(id: number) {
    return this.prisma.patient.findUnique({ where: { id } });
  }

  update(id: number, dto: UpdatePacienteDto) {
    if (dto.birthDate && new Date(dto.birthDate) > new Date()) {
      throw new BadRequestException(
        'La fecha de nacimiento no puede ser futura',
      );
    }
    return this.prisma.patient.update({
      where: { id },
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        birthDate: dto.birthDate ? new Date(dto.birthDate) : undefined,
      },
    });
  }

  remove(id: number) {
    return this.prisma.patient.delete({ where: { id } });
  }
}
