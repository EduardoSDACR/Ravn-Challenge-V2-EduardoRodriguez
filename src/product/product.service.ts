import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { join } from 'path';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  getProducts() {
    return this.prisma.product.findMany({
      where: {
        is_disabled: false,
      },
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
        where: {
          is_disabled: false,
        },
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
        where: {
          is_disabled: false,
        },
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
      where: { id: productId, is_disabled: false },
    });
  }

  getProductByCategory(categoryId: number) {
    return this.prisma.product.findMany({
      where: {
        category_id: categoryId,
        is_disabled: false,
      },
    });
  }

  async createProduct(dto: CreateProductDto, file) {
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

  async likeProduct(user_id: number, product_id: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: product_id,
      },
      include: {
        users_like: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    product.users_like.forEach((user) => {
      if (user.id == user_id) {
        throw new ConflictException(
          'You already like this product',
        );
      }
    });

    return this.prisma.product.update({
      where: {
        id: product_id,
      },
      data: {
        likes: product.likes + 1,
        users_like: {
          connect: { id: user_id },
        },
      },
    });
  }

  async uploadProductImage(product_id: number, file) {
    const imagePath = join('/images/', file.filename);

    const product = await this.prisma.product.findUnique({
      where: { id: product_id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.prisma.product.update({
      where: {
        id: product_id,
      },
      data: {
        image_url: imagePath,
      },
    });
  }
}
