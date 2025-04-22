import { Test, TestingModule } from '@nestjs/testing';
import { StoresController } from './stores.controller';
import { StoresService } from '../services/stores.service';
import { GeoService } from '../../geo/geo.service';
import { DistanceService } from '../../distance/distance.service';
import { MelhorEnvioService } from '../../melhor-envio/melhor-envio.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

describe('StoresController', () => {
  let controller: StoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoresController],
      providers: [
        {
          provide: StoresService,
          useValue: { getAllStores: jest.fn(), createStore: jest.fn() },
        },
        {
          provide: GeoService,
          useValue: { getCoordinatesFromCep: jest.fn() },
        },
        {
          provide: DistanceService,
          useValue: { calculateDistances: jest.fn() },
        },
        {
          provide: MelhorEnvioService,
          useValue: { calculateFreight: jest.fn() },
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

    controller = module.get<StoresController>(StoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
