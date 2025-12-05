import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({ description: 'Token de reset recebido por e-mail' })
  @IsString()
  token: string;

  @ApiProperty({ description: 'Nova senha (mínimo 6 caracteres)', minLength: 6 })
  @IsString()
  @MinLength(6, { message: 'A nova senha deve ter pelo menos 6 caracteres.' })
  newPassword: string;
}