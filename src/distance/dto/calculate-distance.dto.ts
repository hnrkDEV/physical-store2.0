import { ApiProperty } from '@nestjs/swagger';
import { CoordinateDto } from '../../geo/dto/coordinate.dto';

export class CalculateDistanceDto {
  @ApiProperty({ type: CoordinateDto, description: 'User location coordinates' })
  userCoordinates: CoordinateDto;

  @ApiProperty({
    type: [CoordinateDto],
    description: 'Array of store coordinates'
  })
  storeCoordinates: CoordinateDto[];
}
