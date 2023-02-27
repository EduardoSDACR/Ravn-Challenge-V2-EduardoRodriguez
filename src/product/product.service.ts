import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from '@prisma/client';
import { join } from 'path';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  getProducts() {
    return this.prisma.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        image_url: true,
      },
    });
  }

  getOffsetPaginationProducts(
    skip?: number,
    take?: number,
  ) {
    if (isNaN(skip)) {
      return this.prisma.product.findMany({
        take,
        select: {
          id: true,
          name: true,
          price: true,
          image_url: true,
        },
      });
    } else {
      return this.prisma.product.findMany({
        skip,
        take,
        select: {
          id: true,
          name: true,
          price: true,
          image_url: true,
        },
      });
    }
  }

  getProductById(productId: number) {
    return this.prisma.product.findFirst({
      where: { id: productId },
    });
  }

  getProductByCategory(categoryId: number) {
    return this.prisma.product.findMany({
      where: { category_id: categoryId },
    });
  }

  async createProduct(dto: CreateProductDto, file) {
    const fileName = file?.filename;

    //if (!fileName) return of({ error: 'File must be a png, jpg/jpeg' });

    const imagePath = join('/images/', file.filename);

    const product = await this.prisma.product.create({
      data: {
        ...dto,
        image_url: imagePath,
      },
    });
    return product;
  }

  async updateProductById(
    productId: number,
    dto: UpdateProductDto,
  ) {
    var product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    product = await this.prisma.product.update({
      where: { id: productId },
      data: {
        ...dto,
      },
    });
    return product;
  }

  async deleteProductById(productId: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    await this.prisma.product.delete({
      where: {
        id: productId,
      },
    });
    return {
      message: 'Product was successfully removed',
    };
  }

  async disableProductById(productId: number) {
    var product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await this.prisma.product.update({
      where: { id: productId },
      data: {
        is_disabled: true,
      },
    });
    return {
      message: 'This product is now disabled',
    };
  }
}
