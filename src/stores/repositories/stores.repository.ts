import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Store } from '../interfaces/store.interface';

@Injectable()
export class StoresRepository {
  constructor(@InjectModel('Store') private readonly storeModel: Model<Store>) {}

  async findAll(): Promise<Store[]> {
    return this.storeModel.find().exec();
  }
}
