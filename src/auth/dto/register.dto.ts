import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsNumber,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'Name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Surname',
  })
  @IsString()
  @IsNotEmpty()
  lastname: string;

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
