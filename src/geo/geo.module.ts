import { Module } from '@nestjs/common';
import { ViaCepModule } from './via-cep/via-cep.module';
import { GoogleMapsModule } from './google-maps/google-maps.module';
import { GeoService } from './geo.service';
import { LoggerModule } from 'src/log/logger.module';

@Module({
  imports: [ViaCepModule, GoogleMapsModule, LoggerModule,],
  providers: [GeoService],
  exports: [GeoService],
})
export class GeoModule {}
