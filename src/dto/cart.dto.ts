import { IsArray, IsNumber } from 'class-validator';

export class CartDto {
  @IsArray()
  @IsNumber({}, { each: true })
  cart: number[];
}
