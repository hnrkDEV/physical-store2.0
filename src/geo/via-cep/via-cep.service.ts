import { Injectable, HttpException, Inject } from '@nestjs/common';
import axios from 'axios';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
@Injectable()
export class ViaCepService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async getAddressByCep(cep: string) {
    try {
      const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

      if (data.erro) {
        this.logger.warn(`CEP not found: ${cep}`);
        throw new HttpException('ZIP code not found', 404);
      }

      return data;
    } catch (error) {
      this.logger.error(`Error fetching data from ViaCEP: ${error.message}`);
      throw new HttpException('Failed to retrieve ZIP code information from ViaCEP', 500);
    }
  }
}
