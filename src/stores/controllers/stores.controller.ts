import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { StoresService } from '../services/stores.service';
import { Store } from '../interfaces/store.interface';
import { CreateStoreDto } from '../dto/create-store.dto';

@Controller('stores')
export class StoresController {
  private readonly logger = new Logger(StoresController.name);

  constructor(private readonly storesService: StoresService) {}

  @Get()
  async findAll(): Promise<{ stores: Store[]; limit: number; offset: number; total: number }> {
    this.logger.log('Request Received GET /stores');

    const stores = await this.storesService.getAllStores();

    return {
      stores,
      limit: 1,
      offset: 1,
      total: stores.length,
    };
  }

  @Post()
  async create(@Body() dto: CreateStoreDto): Promise<Store> {
    this.logger.log(`POST /stores - Creating store: ${dto.storeName}`);
    return this.storesService.createStore(dto);
  }
}
