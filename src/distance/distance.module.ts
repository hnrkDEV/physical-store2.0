import { Module } from '@nestjs/common';
import { DistanceService } from './distance.service';

@Module({
  providers: [DistanceService],
  exports: [DistanceService],
})
export class DistanceModule {}
