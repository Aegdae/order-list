import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Product } from "../../products/entities/product.entity";
import { User } from "../../users/entities/user.entity";

export type OrderDocument = HydratedDocument<Order>

export enum StatusType {
    RECEIVED = 'RECEIVED',
    PREPARING = 'PREPARING',
    SENT = 'SENT',
    DELIVERED = 'DELIVERED',
    CANCELED = 'CANCELED'
}

@Schema({ timestamps:true, optimisticConcurrency: true })
export class Order {
    
    @Prop({ default: () => crypto.randomUUID() })
    _id: string;

    @Prop({ type: String, ref: 'User' })
    userId: User | string;

    @Prop({ type: String, ref: Product.name })
    productId: Product | string;

    @Prop()
    quantity: number

    @Prop()
    oStatus: StatusType

}

export const OrderSchema = SchemaFactory.createForClass(Order)
