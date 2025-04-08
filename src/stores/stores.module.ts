import { Module } from '@nestjs/common';
import { LoggerModule } from '../log/logger.module';
import { StoresService } from './services/stores.service';
import { StoresController } from './controllers/stores.controller';
import { StoresRepository } from './repositories/stores.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Store, StoreSchema } from './schemas/store.schema';


@Module({
  imports: [
  LoggerModule,
  MongooseModule.forRoot(process.env.MONGO_URI!),
  MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema }])
],
  providers: [
    StoresService,
    StoresRepository
  ],
  controllers: [StoresController]
})
export class StoresModule {}
