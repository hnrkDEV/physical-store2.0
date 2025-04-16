import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Store } from '../interfaces/store.interface';
import { CreateStoreDto } from '../dto/create-store.dto';

@Injectable()
export class StoresRepository {
  constructor(@InjectModel('Store') private readonly storeModel: Model<Store>) {}

  async findAll(): Promise<Store[]> {
    return this.storeModel.find().exec();
  }

  async create(storeData: CreateStoreDto): Promise<Store> {
    const createdStore = new this.storeModel(storeData);
    return createdStore.save();
  }

  async findById(id: string): Promise<Store | null> {
    return this.storeModel.findById(id).exec();
  }

  async findByState(uf: string): Promise<Store[]> {
    return this.storeModel.find({ state: uf.toUpperCase() }).exec();
  }
  
}
