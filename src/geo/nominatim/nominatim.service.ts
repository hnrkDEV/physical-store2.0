import { Injectable, HttpException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class NominatimService {
  async getCoordinatesFromAddress(address: string) {
    try {
      const { data } = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: address,
          format: 'json',
          addressdetails: 1,
          limit: 1,
        },
        headers: {
          'User-Agent': 'physicalStoreApp'
        }
      });

      if (!data.length) throw new Error('Coordinates not found');
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
      };
    } catch (error) {
      throw new HttpException('Error when searching for coordinates', 400);
    }
  }
}
