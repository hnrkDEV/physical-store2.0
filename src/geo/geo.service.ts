import { Injectable } from '@nestjs/common';
import { ViaCepService } from './via-cep/via-cep.service';
import { GoogleMapsService } from './google-maps/google-maps.service';


@Injectable()
export class GeoService {
  constructor(
    private readonly viaCep: ViaCepService,
    private readonly googleMaps: GoogleMapsService,
  ) {}

  async getCoordinatesFromCep(cep: string) {
    const address = await this.viaCep.getAddressByCep(cep);
    const fullAddress = `${address.logradouro}, ${address.localidade}, ${address.uf}, Brasil`;

    const coordinates = await this.googleMaps.getCoordinatesFromAddress(fullAddress);
    return {
      address,
      coordinates,
    };
  }
}
