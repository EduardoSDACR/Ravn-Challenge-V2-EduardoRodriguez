import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { CartDto, CreateOrderDto } from 'src/dto';
import { OrderService } from './order.service';
import { Request } from 'express';
import { GetUser } from 'src/auth/decorator';

@UseGuards(JwtGuard)
@Controller('orders')
export class OrderController {
  constructor(private order: OrderService) {}

  @Get('client/:id')
  getClientOrdersById(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.order.getClientOrdersById(id);
  }

  @Get('cart')
  getCartProducts(@Body() dto: CartDto) {
    return this.order.getCartProducts(dto);
  }

  @Get('show/:id')
  showOrderById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.order.showOrderById(userId, id);
  }

  @Post('buy')
  buyOrderProducts(
    @GetUser('id') userId: number,
    @Body() dto: CreateOrderDto,
  ) {
    return this.order.buyOrderProducts(userId, dto);
  }
}
