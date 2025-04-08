import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoresModule } from './stores/stores.module';
import { CepModule } from './cep/cep.module';
@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [StoresModule, CepModule],
})
export class AppModule {}
