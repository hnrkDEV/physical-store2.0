import { Test, TestingModule } from '@nestjs/testing';
import { StoresService } from './stores.service';
import { StoresRepository } from '../repositories/stores.repository';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

describe('StoresService', () => {
  let service: StoresService;

  const mockStoresRepository = {
    findAll: jest.fn().mockResolvedValue([]),
    create: jest.fn().mockImplementation((dto) => Promise.resolve(dto)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoresService,
        {
          provide: StoresRepository,
          useValue: mockStoresRepository,
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

    service = module.get<StoresService>(StoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all stores', async () => {
    const result = await service.getAllStores();
    expect(result).toEqual([]);
    expect(mockStoresRepository.findAll).toHaveBeenCalled();
  });

  it('should create a store', async () => {
    const dto = { storeName: 'Test Store' } as any;
    const result = await service.createStore(dto);
    expect(result).toEqual(dto);
    expect(mockStoresRepository.create).toHaveBeenCalledWith(dto);
  });
});
