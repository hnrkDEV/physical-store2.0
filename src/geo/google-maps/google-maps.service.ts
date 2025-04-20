import { Injectable, HttpException, Inject } from '@nestjs/common';
import axios from 'axios';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class GoogleMapsService {
  private readonly apiKey = process.env.GOOGLE_MAPS_API_KEY;

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {}

  async getCoordinatesFromAddress(address: string) {
    try {
      const encodedAddress = encodeURIComponent(address);
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${this.apiKey}`;

      const { data } = await axios.get(url);

      if (data.status !== 'OK' || !data.results.length) {
        this.logger.warn(`Google Maps API: Address not found - ${address}`);
        throw new HttpException('Address not found', 404);
      }

      const location = data.results[0].geometry.location;

      return {
        lat: location.lat,
        lon: location.lng,
      };
    } catch (error) {
      this.logger.error(`Google Maps API error: ${error.message}`);
      throw new HttpException('Error fetching coordinates from Google Maps', 500);
    }
  }
}
