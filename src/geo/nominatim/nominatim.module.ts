import { Module } from '@nestjs/common';
import { NominatimService } from './nominatim.service';

@Module({
  providers: [NominatimService],
  exports: [NominatimService],
})
export class NominatimModule {}
