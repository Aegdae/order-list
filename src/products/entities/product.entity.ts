import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type ProductDocument = HydratedDocument<Product>

export enum ProductStatus {
    AVAILABLE = 'AVAILABLE',
    SOLDOUT = 'SOLD_OUT'
}

@Schema()
export class Product {

    @Prop({ default: () => crypto.randomUUID() })
    _id: string;

    @Prop()
    name: string;

    @Prop()
    description?: string;

    @Prop()
    stock: number;

    @Prop({ enum: ['AVAILABLE', 'SOLD_OUT'], default: 'AVAILABLE'})
    pStatus: ProductStatus

}

export const ProductSchema = SchemaFactory.createForClass(Product)
