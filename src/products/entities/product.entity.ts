import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ProductDocument = HydratedDocument<Product>

export enum ProductStatus {
    AVAILABLE = 'AVAILABLE',
    SOLDOUT = 'SOLD OUT'
}

@Schema()
export class Product {

    @Prop({ default: crypto.randomUUID() })
    _id: string;

    @Prop()
    name: string;

    @Prop()
    description?: string;

    @Prop()
    quantity: number;

    @Prop()
    pStatus: ProductStatus

}

export const ProductSchema = SchemaFactory.createForClass(Product)
