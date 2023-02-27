import { Injectable } from '@nestjs/common';
import { CartDto, CreateOrderDto } from 'src/order/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    private product: ProductService,
  ) {}

  getClientOrdersById(clientId: number) {
    return this.prisma.order.findMany({
      where: {
        user_id: clientId,
      },
      include: {
        products: true,
      },
    });
  }

  async getCartProducts(dto: CartDto) {
    const cart = await this.prisma.product.findMany({
      where: {
        id: { in: dto.cart },
      },
      select: {
        id: true,
        name: true,
        price: true,
        image_url: true,
      },
    });
    var total_price: number = 0;
    cart.forEach((product) => {
      total_price = total_price + +product.price;
    });
    return {
      cart: cart,
      total_price: total_price,
    };
  }

  showOrderById(user_id: number, orderId: number) {
    return this.prisma.order.findFirst({
      where: {
        id: orderId,
        user_id: user_id,
      },
      select: {
        id: true,
        buy_date: true,
        total_cost: true,
        products: {
          select: {
            id: true,
            name: true,
            price: true,
            image_url: true,
          },
        },
      },
    });
  }

  async buyOrderProducts(
    user_id: number,
    dto: CreateOrderDto,
  ) {
    const cart = await this.prisma.product.findMany({
      where: {
        id: { in: dto.cart },
      },
      select: {
        id: true,
        price: true,
      },
    });
    var total_price: number = 0;
    cart.forEach((product) => {
      total_price = total_price + +product.price;
    });
    const products_ids = cart.map((product) => {
      return { id: product.id };
    });
    return this.prisma.order.create({
      data: {
        total_cost: total_price,
        user_id: user_id,
        products: {
          connect: products_ids,
        },
      },
    });
  }
}
