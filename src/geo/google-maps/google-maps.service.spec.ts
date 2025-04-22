import { Test, TestingModule } from '@nestjs/testing';
import { GoogleMapsService } from './google-maps.service';
import axios from 'axios';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { HttpException } from '@nestjs/common';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('GoogleMapsService', () => {
  let service: GoogleMapsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GoogleMapsService,
        {
          provide: WINSTON_MODULE_PROVIDER,
          useValue: {
            log: jest.fn(),
            error: jest.fn(),
            warn: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GoogleMapsService>(GoogleMapsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return coordinates for a valid address', async () => {
    const address = 'Rua Exemplo, Recife, PE, Brasil';

    const mockResponse = {
      data: {
        results: [
          {
            geometry: {
              location: {
                lat: -8.0476,
                lng: -34.877,
              },
            },
          },
        ],
        status: 'OK',
      },
    };

    mockedAxios.get.mockResolvedValue(mockResponse);

    const result = await service.getCoordinatesFromAddress(address);

    expect(result).toEqual({
      lat: -8.0476,
      lon: -34.877,
    });

    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining(encodeURIComponent(address)));
  });

  it('should throw HttpException if address not found', async () => {
    const address = 'Non-Existent Address, Test';

    const mockResponse = {
      data: {
        results: [],
        status: 'ZERO_RESULTS',
      },
    };

    mockedAxios.get.mockResolvedValue(mockResponse);

    await expect(service.getCoordinatesFromAddress(address)).rejects.toThrow(HttpException);
  });

  it('should throw HttpException on axios error', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Google API down'));

    await expect(
      service.getCoordinatesFromAddress('Any address'),
    ).rejects.toThrow('Error fetching coordinates from Google Maps');
  });
});
