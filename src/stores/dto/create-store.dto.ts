import { IsString, IsBoolean, IsOptional, IsIn, IsEmail } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  storeName: string;

  @IsBoolean()
  takeOutInStore: boolean;

  @IsString()
  shippingTimeInDays: number;

  @IsString()
  latitude: string;

  @IsString()
  longitude: string;

  @IsString()
  address1: string;

  @IsOptional()
  @IsString()
  address2?: string;

  @IsOptional()
  @IsString()
  address3?: string;

  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  district?: string;

  @IsString()
  state: string;

  @IsIn(['PDV', 'LOJA'])
  type: 'PDV' | 'LOJA';

  @IsOptional()
  @IsString()
  country?: string;

  @IsString()
  postalCode: string;

  @IsOptional()
  @IsString()
  telephoneNumber?: string;

  @IsOptional()
  @IsEmail()
  emailAddress?: string;
}
