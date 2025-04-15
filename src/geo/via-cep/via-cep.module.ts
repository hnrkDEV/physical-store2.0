import { Module } from '@nestjs/common';
import { ViaCepService } from './via-cep.service';

@Module({
  providers: [ViaCepService],
  exports: [ViaCepService],
})
export class ViaCepModule {}
