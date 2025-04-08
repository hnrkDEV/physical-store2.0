import { Module } from '@nestjs/common';
import { CepService } from './services/cep.service';

@Module({
  providers: [CepService]
})
export class CepModule {}
