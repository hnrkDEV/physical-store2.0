// via-cep.service.ts
import { Injectable, HttpException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ViaCepService {
  async getAddressByCep(cep: string) {
    try {
      const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (data.erro) throw new Error('CEP not found');
      return data;
    } catch (error) {
      throw new HttpException('Error searching for zip code', 400);
    }
  }
}
