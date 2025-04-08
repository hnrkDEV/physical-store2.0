import { Controller, Get, Logger } from '@nestjs/common';
import { StoresService } from '../services/stores.service';
import { Store } from '../interfaces/store.interface';

@Controller('stores')
export class StoresController {
  private readonly logger = new Logger(StoresController.name);

  constructor(private readonly storesService: StoresService) {}

  @Get()
  async findAll(): Promise<{ stores: Store[]; limit: number; offset: number; total: number }> {
    this.logger.log('Recebida requisição GET /stores');

    const stores = await this.storesService.getAllStores();

    return {
      stores,
      limit: 1,
      offset: 1,
      total: stores.length,
    };
  }
}
