import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Address } from "./address.entity";
import { Order } from "src/orders/entities/order.entity";

export type UserDocument = HydratedDocument<User>

export enum UserType {
    USER = 'USER',
    ADMIN = 'ADMIN'
}


@Schema({ timestamps: true, optimisticConcurrency: true })
export class User {

    @Prop({ default: () => crypto.randomUUID() })
    _id: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true})
    email: string;

    @Prop({ required: true })
    password: string

    @Prop({ type: String, ref: Address.name })
    address: Address

    @Prop({ type: [String], ref: Order.name })
    productOrders: Order[];

    @Prop()
    userType: UserType;
}

export const UserSchema = SchemaFactory.createForClass(User)