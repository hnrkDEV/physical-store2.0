import { Injectable, HttpException, Inject } from '@nestjs/common';
import axios from 'axios';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class MelhorEnvioService {
  private readonly useSandbox = process.env.MELHOR_ENVIO_USE_SANDBOX === 'true';

  private readonly apiUrl = this.useSandbox
    ? 'https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate'
    : 'https://www.melhorenvio.com.br/api/v2/me/shipment/calculate';

  private readonly token = this.useSandbox
    ? process.env.MELHOR_ENVIO_TOKEN_SANDBOX
    : process.env.MELHOR_ENVIO_TOKEN;

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger
  ) {}

  async calculateFreight(originCep: string, destinationCep: string) {
    try {
      const payload = {
        from: { postal_code: originCep },
        to: { postal_code: destinationCep },
        products: [
          {
            name: 'Standard product',
            quantity: 1,
            unitary_value: 2000,
            weight: 1,
            width: 11,
            height: 17,
            length: 20
          }
        ],
        options: {
          own_hand: false,
          receipt: false,
          insurance_value: 0,
          reverse: false,
          non_commercial: true
        }
      };

      this.logger.debug(`Using enviroment: ${this.useSandbox ? 'SANDBOX' : 'PRODUÇÃO'}`);
      this.logger.debug(`Endpoint: ${this.apiUrl}`);
      this.logger.debug(`Token: ${this.token?.slice(0, 20)}...`);

      const response = await axios.post(this.apiUrl, payload, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      this.logger.error(`Error when checking shipping on Melhor Envio: ${error.response?.data?.message || error.message}`);
      throw new HttpException('Error when checking shipping on Melhor Envio', 500);
    }
  }
}
