import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from 'src/auth/guard';
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

  @Get('offset')
  getBookListWithOffset(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('take', ParseIntPipe) take: number,
  ) {
    return this.product.getOffsetPaginationProducts(
      skip,
      take,
    );
  }

  @Get(':id')
  getProductById(@Param('id', ParseIntPipe) id: number) {
    return this.product.getProductById(id);
  }

  @Get('category/:id')
  getProductsByCategory(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.product.getProductByCategory(id);
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
