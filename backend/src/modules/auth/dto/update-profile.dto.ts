import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength, Matches, Length } from 'class-validator';

class AddressPayload {
  @ApiPropertyOptional({ example: 'Rua das Flores' })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  street: string;

  @ApiPropertyOptional({ example: '123' })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  number: string;

  @ApiPropertyOptional({ example: 'Apto 202' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  complement?: string;

  @ApiPropertyOptional({ example: 'Centro' })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  district: string;

  @ApiPropertyOptional({ example: 'São Paulo' })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  city: string;

  @ApiPropertyOptional({ example: 'SP' })
  @IsString()
  @MinLength(2)
  @MaxLength(2)
  state: string;

  @ApiPropertyOptional({ example: '01000-000' })
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  zipCode: string;
}

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: 'Maria Silva' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name?: string;

  @ApiPropertyOptional({ example: '+55 11 99999-0000' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @ApiPropertyOptional({ example: '12345678901' })
  @IsOptional()
  @IsString()
  @Length(11, 11)
  @Matches(/^\d{11}$/)
  cpf?: string;

  @ApiPropertyOptional({ type: () => AddressPayload })
  @IsOptional()
  address?: AddressPayload;
}
