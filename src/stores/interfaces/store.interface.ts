import { Document } from 'mongoose';
export interface Store extends Document {
  readonly storeName: string;
  readonly takeOutInStore: boolean;
  readonly shippingTimeInDays: number;
  readonly latitude: string;
  readonly longitude: string;
  readonly address1: string;
  readonly address2: string;
  readonly address3: string;
  readonly city: string;
  readonly district: string;
  readonly state: string;
  readonly type: 'PDV' | 'LOJA';
  readonly country: string;
  readonly postalCode: string;
  readonly telephoneNumber: string;
  readonly emailAddress: string;
}
