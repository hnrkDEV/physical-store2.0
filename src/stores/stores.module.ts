import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StoresService } from './services/stores.service';
import { StoresController } from './controllers/stores.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Store, StoreSchema } from './schemas/store.schema';

@Module({
  imports: [
  MongooseModule.forRoot(process.env.MONGO_URI!),
  MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema }])
],
  providers: [StoresService],
  controllers: [StoresController]
})
export class StoresModule {}
