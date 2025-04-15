import { Module } from '@nestjs/common';
import { ViaCepModule } from './via-cep/via-cep.module';
import { NominatimModule } from './nominatim/nominatim.module';
import { GeoService } from './geo.service';
import { LoggerModule } from 'src/log/logger.module';

@Module({
  imports: [ViaCepModule, NominatimModule, LoggerModule,],
  providers: [GeoService],
  exports: [GeoService],
})
export class GeoModule {}
