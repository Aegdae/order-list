import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type AddressDocument = HydratedDocument<Address>

@Schema()
export class Address {

    @Prop({ default: crypto.randomUUID()})
    _id: string;

    @Prop()
    cep: string;

    @Prop()
    address: string;

    @Prop()
    numberAddress: number;

    @Prop()
    referencePointer?: string;

}

export const AddressSchema = SchemaFactory.createForClass(Address)