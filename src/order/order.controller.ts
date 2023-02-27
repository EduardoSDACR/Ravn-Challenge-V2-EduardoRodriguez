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
import { CartDto, CreateOrderDto } from 'src/order/dto';
import { OrderService } from './order.service';
import { Request } from 'express';
import { GetUser } from 'src/auth/decorator';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorator/role.decorator';
import {
  CLIENT_ROLE_ID,
  MANAGER_ROLE_ID,
} from 'src/constants';
import { RoleGuard } from 'src/auth/guard/role.guard';

@ApiTags('Order')
@UseGuards(JwtGuard, RoleGuard)
@Controller('orders')
export class OrderController {
  constructor(private order: OrderService) {}

  @Roles(MANAGER_ROLE_ID)
  @Get('client/:id')
  getClientOrdersById(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.order.getClientOrdersById(id);
  }

  @Roles(CLIENT_ROLE_ID)
  @Get('cart')
  getCartProducts(@Body() dto: CartDto) {
    return this.order.getCartProducts(dto);
  }

  @Roles(CLIENT_ROLE_ID)
  @Get('show/:id')
  showOrderById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.order.showOrderById(userId, id);
  }

  @Roles(CLIENT_ROLE_ID)
  @Post('buy')
  buyOrderProducts(
    @GetUser('id') userId: number,
    @Body() dto: CreateOrderDto,
  ) {
    return this.order.buyOrderProducts(userId, dto);
  }
}
