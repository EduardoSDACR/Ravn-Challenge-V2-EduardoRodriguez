import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsNumber,
} from 'class-validator';

export class AuthDto {
  @ApiProperty({
    example: 'example@hotmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'pass',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
