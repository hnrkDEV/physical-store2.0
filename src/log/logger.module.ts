import { Global, Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './logger.service';

@Global()
@Module({
  imports: [WinstonModule.forRoot(winstonConfig)],
  exports: [WinstonModule],
})
export class LoggerModule {}
