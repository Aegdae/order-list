import { Controller, Get, Post, Param, Body} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';


@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('/send-order')
  async sendOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.productBuy(createOrderDto)
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }
  
}
