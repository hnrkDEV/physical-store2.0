import { Injectable, Logger } from '@nestjs/common';
import { StoresRepository } from '../repositories/stores.repository';
import { Store } from '../interfaces/store.interface';
import { CreateStoreDto } from '../dto/create-store.dto';
@Injectable()
export class StoresService {
  private readonly logger = new Logger(StoresService.name);

  constructor(private readonly storesRepository: StoresRepository) {}

  async getAllStores(): Promise<Store[]> {
    this.logger.log('Searching for stores in DB');
    const stores = await this.storesRepository.findAll();
    this.logger.log(`${stores.length} Stores`);
    return stores;
  }

  async createStore(dto: CreateStoreDto): Promise<Store> {
    this.logger.log(`Creating new store: ${dto.storeName}`);
    return this.storesRepository.create(dto);
  }
  
}
