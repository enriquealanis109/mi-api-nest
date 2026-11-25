import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMedicoDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  name: string;

  @IsEmail({}, { message: 'El correo no tiene un formato válido' })
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsInt({ message: 'La especialidad debe ser un número' })
  specialtyId: number;

  @IsOptional()
  @IsInt()
  userId?: number;
}
