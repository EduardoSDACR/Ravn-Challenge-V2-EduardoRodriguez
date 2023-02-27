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
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorator';
import { Roles } from 'src/auth/decorator/role.decorator';
import { JwtGuard } from 'src/auth/guard';
import { RoleGuard } from 'src/auth/guard/role.guard';
import {
  CLIENT_ROLE_ID,
  MANAGER_ROLE_ID,
} from 'src/constants';
import { CreateProductDto, UpdateProductDto } from './dto';
import { saveImageToStorage } from './helpers';
import { ProductService } from './product.service';

@ApiTags('Product')
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

  @Roles(MANAGER_ROLE_ID)
  @UseGuards(JwtGuard, RoleGuard)
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

  @Roles(MANAGER_ROLE_ID)
  @UseGuards(JwtGuard, RoleGuard)
  @Put(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductDto,
  ) {
    return this.product.updateProductById(id, dto);
  }

  @Roles(MANAGER_ROLE_ID)
  @UseGuards(JwtGuard, RoleGuard)
  @UseInterceptors(
    FileInterceptor('file', saveImageToStorage),
  )
  @Put(':id/image')
  uploadProductImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id', ParseIntPipe) productId: number,
  ) {
    return this.product.uploadProductImage(productId, file);
  }

  @Roles(MANAGER_ROLE_ID)
  @UseGuards(JwtGuard, RoleGuard)
  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.product.deleteProductById(id);
  }

  @Roles(MANAGER_ROLE_ID)
  @UseGuards(JwtGuard, RoleGuard)
  @Put('disable/:id')
  disableProduct(@Param('id', ParseIntPipe) id: number) {
    return this.product.disableProductById(id);
  }

  @Roles(CLIENT_ROLE_ID)
  @UseGuards(JwtGuard, RoleGuard)
  @Post('likeProduct/:id')
  likeProduct(
    @Param('id', ParseIntPipe) productId: number,
    @GetUser('id') userId: number,
  ) {
    return this.product.likeProduct(userId, productId);
  }
}
