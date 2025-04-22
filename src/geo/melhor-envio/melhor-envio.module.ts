import { Module } from '@nestjs/common';
import { MelhorEnvioService } from './melhor-envio.service';

@Module({
  providers: [MelhorEnvioService],
  exports: [MelhorEnvioService],
})
export class MelhorEnvioModule {}
