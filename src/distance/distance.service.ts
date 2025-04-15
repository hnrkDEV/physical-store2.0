import { Injectable, HttpException, Inject } from '@nestjs/common';
import axios from 'axios';
import { CalculateDistanceDto } from './dto/calculate-distance.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class DistanceService {
  private readonly apiKey = process.env.ORS_API_KEY;

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger
  ) {}

  async calculateDistances(dto: CalculateDistanceDto) {
    const locations = [
      [dto.userCoordinates.lon, dto.userCoordinates.lat],
      ...dto.storeCoordinates.map(store => [store.lon, store.lat])
    ];

    try {
      const response = await axios.post(
        'https://api.openrouteservice.org/v2/matrix/driving-car',
        {
          locations,
          metrics: ['distance', 'duration'],
          units: 'km'
        },
        {
          headers: {
            Authorization: this.apiKey,
            'Content-Type': 'application/json'
          }
        }
      );

      const distances = response.data.distances[0];
      const durations = response.data.durations[0];

      this.logger.info(`Distances calculated successfully`);

      return dto.storeCoordinates.map((store, index) => ({
        store,
        distance: distances[index + 1],
        duration: durations[index + 1]
      }));
    } catch (error) {
      this.logger.error(`Error calculating distances: ${error.message}`);
      throw new HttpException('Error calculating distance', 500);
    }
  }
}
