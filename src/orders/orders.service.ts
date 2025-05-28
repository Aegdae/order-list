import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, StatusType } from './entities/order.entity';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { ClientKafka } from '@nestjs/microservices';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {

  constructor(
    @InjectModel(Order.name) private orderSchema: Model<Order>,
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    private readonly httpService: HttpService,
  ){}

  findAll() {
    return this.orderSchema.find();
  }

  findOne(id: string) {
    return this.orderSchema.findById(id);
  }

  async moduleInit() {
    await this.kafkaClient.connect()
  }

  async productBuy(CreateOrderDto: CreateOrderDto){

    const order = await this.orderSchema.create({
      userId: CreateOrderDto.userId,
      productId: CreateOrderDto.productId,
      quantity: CreateOrderDto.quantity,
      orderStatus: StatusType.SENT
    });

    this.kafkaClient.emit('order-created',{
      value: JSON.stringify({
        orderId: order._id,
        userId: CreateOrderDto.userId,
        productId: CreateOrderDto.productId,
        quantity: CreateOrderDto.quantity
      })
    });
    return order;
  }

  async validateOrder(productId: string, quantity: number){
    const response = await firstValueFrom(
      this.httpService.get(`http://localhost:3000/products/${productId}`)
    )
    const product = response.data;

    if (product.stock > quantity){
      return true
    } else {
      return false
    }
  }
}
