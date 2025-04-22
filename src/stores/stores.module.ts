import { Module } from '@nestjs/common';
import { StoresService } from './services/stores.service';
import { StoresController } from './controllers/stores.controller';
import { StoresRepository } from './repositories/stores.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Store, StoreSchema } from './schemas/store.schema';
import { GeoModule } from 'src/geo/geo.module';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from 'src/log/logger.service';
import { DistanceModule } from 'src/distance/distance.module';
import { MelhorEnvioModule } from '../geo/melhor-envio/melhor-envio.module'



@Module({
  imports: [
  WinstonModule.forRoot(winstonConfig),
  GeoModule,
  MelhorEnvioModule,
  DistanceModule,
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
