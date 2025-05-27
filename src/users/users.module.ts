import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { Address, AddressSchema } from './entities/address.entity';
import { Order, OrderSchema } from 'src/orders/entities/order.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      },
      {
        name: Address.name,
        schema: AddressSchema
      },
      {
        name: Order.name,
        schema: OrderSchema
      }
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
