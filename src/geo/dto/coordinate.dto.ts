import { ApiProperty } from '@nestjs/swagger';

export class CoordinateDto {
  @ApiProperty({ example: -8.0476, description: 'Latitude' })
  lat: number;

  @ApiProperty({ example: -34.8770, description: 'Longitude' })
  lon: number;
}
