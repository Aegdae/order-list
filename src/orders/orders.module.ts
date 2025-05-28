import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './entities/order.entity';
import { Product, ProductSchema } from 'src/products/entities/product.entity';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { ProductsService } from 'src/products/products.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema
      },
      {
        name: Product.name,
        schema: ProductSchema
      },
      {
        name: User.name,
        schema: UserSchema
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, ProductsService],
})
export class OrdersModule {}
