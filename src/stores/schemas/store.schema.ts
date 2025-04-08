import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StoreDocument = Store & Document;
@Schema()
export class Store {
  @Prop({ required: true })
  storeName: string;

  @Prop({ default: true })
  takeOutInStore: boolean;

  @Prop({ required: true })
  shippingTimeInDays: number;

  @Prop()
  latitude: string;

  @Prop()
  longitude: string;

  @Prop()
  address1: string;

  @Prop()
  address2: string;

  @Prop()
  address3: string;

  @Prop({ required: true })
  city: string;

  @Prop()
  district: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true, enum: ['PDV', 'LOJA'] })
  type: string;

  @Prop({ default: 'Brasil' })
  country: string;

  @Prop({ required: true })
  postalCode: string;

  @Prop()
  telephoneNumber: string;

  @Prop()
  emailAddress: string;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
