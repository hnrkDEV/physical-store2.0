export class CalculateDistanceDto {
  userCoordinates: {
    lat: number;
    lon: number;
  };
  storeCoordinates: {
    lat: number;
    lon: number;
  }[];
}
