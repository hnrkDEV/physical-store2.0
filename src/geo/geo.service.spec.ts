import { Test, TestingModule } from '@nestjs/testing';
import { GeoService } from './geo.service';
import { ViaCepService } from './via-cep/via-cep.service';
import { GoogleMapsService } from './google-maps/google-maps.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

describe('GeoService', () => {
  let geoService: GeoService;

  const mockViaCep = {
    getAddressByCep: jest.fn().mockResolvedValue({
      logradouro: 'Rua Exemplo',
      localidade: 'Recife',
      uf: 'PE',
    }),
  };

  const mockGoogleMaps = {
    getCoordinatesFromAddress: jest.fn().mockResolvedValue({
      lat: -8.0476,
      lon: -34.877,
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GeoService,
        {
          provide: ViaCepService,
          useValue: mockViaCep,
        },
        {
          provide: GoogleMapsService,
          useValue: mockGoogleMaps,
        },
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

    geoService = module.get<GeoService>(GeoService);
  });

  it('should be defined', () => {
    expect(geoService).toBeDefined();
  });

  it('should return address and coordinates for a valid CEP', async () => {
    const result = await geoService.getCoordinatesFromCep('52051-050');

    expect(mockViaCep.getAddressByCep).toHaveBeenCalledWith('52051-050');
    expect(mockGoogleMaps.getCoordinatesFromAddress).toHaveBeenCalledWith('Rua Exemplo, Recife, PE, Brasil');

    expect(result).toEqual({
      address: {
        logradouro: 'Rua Exemplo',
        localidade: 'Recife',
        uf: 'PE',
      },
      coordinates: {
        lat: -8.0476,
        lon: -34.877,
      },
    });
  });
});
