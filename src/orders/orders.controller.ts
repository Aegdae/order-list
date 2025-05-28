import { Controller, Get, Post, Param, Body, BadRequestException} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';


@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('/send-order')
  async sendOrder(@Body() createOrderDto: CreateOrderDto) {
    
    const response = await this.ordersService.validateOrder(createOrderDto.productId, createOrderDto.quantity)

    if (response === true) {
      const order = await this.ordersService.productBuy(createOrderDto);
      return {
        message: 'Order created',
        orderId: order._id
      }
    } else {
      throw new BadRequestException('insufficient stock');
    }    
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Get(':id')
  async validateOrder(@Param() productId: string) {
    const quantity: number = 5;
    this.ordersService.validateOrder(productId, quantity)
  }
  
}
