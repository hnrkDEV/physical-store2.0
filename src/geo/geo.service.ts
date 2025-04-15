import { Injectable } from '@nestjs/common';
import { ViaCepService } from './via-cep/via-cep.service';
import { NominatimService } from './nominatim/nominatim.service';

@Injectable()
export class GeoService {
  constructor(
    private readonly viaCep: ViaCepService,
    private readonly nominatim: NominatimService,
  ) {}

  async getCoordinatesFromCep(cep: string) {
    const address = await this.viaCep.getAddressByCep(cep);
    const fullAddress = `${address.logradouro}, ${address.localidade}, ${address.uf}`;

    const coordinates = await this.nominatim.getCoordinatesFromAddress(fullAddress);
    return {
      address,
      coordinates,
    };
  }
}
