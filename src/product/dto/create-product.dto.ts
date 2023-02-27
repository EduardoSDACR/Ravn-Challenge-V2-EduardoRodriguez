import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Some description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 55.2,
  })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'only two decimal places are accepted' },
  )
  @Max(1000)
  @IsNotEmpty()
  @Transform(({ value }) => JSON.parse(value))
  price: number;

  @ApiProperty({
    example: 32,
  })
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => JSON.parse(value))
  stock: number;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => JSON.parse(value))
  category_id: number;
}
