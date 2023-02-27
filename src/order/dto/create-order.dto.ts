import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    example: [1, 3, 6],
  })
  @IsArray()
  @IsNumber({}, { each: true })
  cart: number[];
}
