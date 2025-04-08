import { Module } from '@nestjs/common';
import { StoresService } from './services/stores.service';
import { StoresController } from './controllers/stores.controller';

@Module({
  providers: [StoresService],
  controllers: [StoresController]
})
export class StoresModule {}
