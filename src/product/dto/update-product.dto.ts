import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  Max,
} from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({
    example: 'Product name',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 'Product description',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 75.5,
  })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'only two decimal places are accepted' },
  )
  @Max(1000)
  @IsOptional()
  price?: number;

  @ApiProperty({
    example: 74,
  })
  @IsNumber()
  @IsOptional()
  stock?: number;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  category_id?: number;
}
