import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class CartDto {
  @ApiProperty({
    example: [1, 3, 7],
  })
  @IsArray()
  @IsNumber({}, { each: true })
  cart: number[];
}
