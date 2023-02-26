import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductDto, UpdateProductDto } from './dto';
import { saveImageToStorage } from './helpers';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private product: ProductService) {}

  @Get()
  getProducts() {
    return this.product.getProducts();
  }

  @Get(':id')
  getProductById(@Param('id', ParseIntPipe) id: number) {
    return this.product.getProductById(id);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', saveImageToStorage),
  )
  createProduct(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateProductDto,
  ) {
    return this.product.createProduct(dto, file);
  }

  @Put(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductDto,
  ) {
    return this.product.updateProductById(id, dto);
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.product.deleteProductById(id);
  }

  @Put('disable/:id')
  disableProduct(@Param('id', ParseIntPipe) id: number) {
    return this.product.disableProductById(id);
  }
}
