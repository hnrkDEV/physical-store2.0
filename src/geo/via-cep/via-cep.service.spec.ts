import { Test, TestingModule } from '@nestjs/testing';
import { ViaCepService } from './via-cep.service';
import axios from 'axios';
import { HttpException } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ViaCepService', () => {
  let service: ViaCepService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ViaCepService,
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

    service = module.get<ViaCepService>(ViaCepService);
  });

  it('should return address data for a valid CEP', async () => {
    const mockCep = '52051-050';
    const mockResponse = {
      data: {
        logradouro: 'Rua exemplo',
        localidade: 'Recife',
        uf: 'PE',
        erro: false,
      },
    };

    mockedAxios.get.mockResolvedValue(mockResponse);

    const result = await service.getAddressByCep(mockCep);
    expect(result).toEqual(mockResponse.data);
  });

  it('should throw HttpException if CEP is not found', async () => {
    const mockResponse = { data: { erro: true } };
    mockedAxios.get.mockResolvedValue(mockResponse);

    await expect(service.getAddressByCep('00000-000')).rejects.toThrow(HttpException);
  });

  it('should throw HttpException on axios failure', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Request failed'));

    await expect(service.getAddressByCep('99999-999')).rejects.toThrow(HttpException);
  });
});
