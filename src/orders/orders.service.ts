import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, StatusType } from './entities/order.entity';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductsService } from 'src/products/products.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class OrdersService {

  constructor(
    @InjectModel(Order.name) private orderSchema: Model<Order>,
    @InjectModel(User.name) private userSchema: Model<User>,
    private productService: ProductsService
  ){}

  findAll() {
    return this.orderSchema.find();
  }

  findOne(id: string) {
    return this.orderSchema.findById(id);
  }

  // Onde cria a ordem
  
  async productBuy(createOrderDto: CreateOrderDto){
    await this.productService.decreaseQuantity(createOrderDto)

    const order = await this.orderSchema.create({
      userId: createOrderDto.userId,
      productId: createOrderDto.productId,
      quantity: createOrderDto.quantity,
      orderStatus: StatusType.SENT
    });

    await this.userSchema.findByIdAndUpdate(
      createOrderDto.userId,
      { $push: { productOrders: order._id } }
    );

    return order;
  }
}
