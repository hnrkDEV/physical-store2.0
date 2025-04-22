import { Test, TestingModule } from '@nestjs/testing';
import { DistanceService } from './distance.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('DistanceService', () => {
  let service: DistanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DistanceService,
        {
          provide: WINSTON_MODULE_PROVIDER,
          useValue: {
            log: jest.fn(),
            error: jest.fn(),
            warn: jest.fn(),
            info: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DistanceService>(DistanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return distances between user and stores', async () => {
    const userCoordinates = { lat: -8.0476, lon: -34.877 };
    const storeCoordinates = [
      { lat: -8.11752, lon: -34.89406 },
      { lat: -7.98842, lon: -34.84034 },
    ];

    const mockORSResponse = {
      data: {
        distances: [
          [0, 5.2, 10.7],
          [5.2, 0, 8.1],
          [10.7, 8.1, 0],
        ],
        durations: [
          [0, 12, 25],
          [12, 0, 16],
          [25, 16, 0],
        ],
      },
    };

    mockedAxios.post.mockResolvedValue(mockORSResponse);

    const result = await service.calculateDistances({
      userCoordinates,
      storeCoordinates,
    });

    expect(result).toEqual([
      {
        store: storeCoordinates[0],
        distance: 5.2,
        duration: 12,
      },
      {
        store: storeCoordinates[1],
        distance: 10.7,
        duration: 25,
      },
    ]);

    expect(mockedAxios.post).toHaveBeenCalled();
  });

  it('should throw error when ORS fails', async () => {
    mockedAxios.post.mockRejectedValue(new Error('ORS failure'));

    await expect(
      service.calculateDistances({
        userCoordinates: { lat: 0, lon: 0 },
        storeCoordinates: [{ lat: 1, lon: 1 }],
      }),
    ).rejects.toThrow('Error calculating distance');
  });
});
