import { Test, TestingModule } from '@nestjs/testing';
import { MelhorEnvioService } from './melhor-envio.service';
import axios from 'axios';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('MelhorEnvioService', () => {
  let service: MelhorEnvioService;

  beforeEach(async () => {
    process.env.MELHOR_ENVIO_USE_SANDBOX = 'true';
    process.env.MELHOR_ENVIO_TOKEN_SANDBOX = 'fake-token';

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MelhorEnvioService,
        {
          provide: WINSTON_MODULE_PROVIDER,
          useValue: {
            log: jest.fn(),
            error: jest.fn(),
            warn: jest.fn(),
            debug: jest.fn(),
            info: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MelhorEnvioService>(MelhorEnvioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return freight options successfully', async () => {
    const mockResponse = {
      data: [
        {
          id: 1,
          name: 'PAC',
          price: '22.50',
          delivery_time: 5,
        },
        {
          id: 2,
          name: 'SEDEX',
          price: '33.90',
          delivery_time: 2,
        },
      ],
    };

    mockedAxios.post.mockResolvedValueOnce(mockResponse);

    const result = await service.calculateFreight('52051-050', '01001-000');

    expect(result).toEqual(mockResponse.data);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining('sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate'),
      expect.objectContaining({
        from: { postal_code: '52051-050' },
        to: { postal_code: '01001-000' },
      }),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: `Bearer fake-token`,
        }),
      }),
    );
  });

  it('should throw HttpException on API error', async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: {
        data: { message: 'Unauthorized' },
      },
    });

    await expect(
      service.calculateFreight('00000-000', '99999-999'),
    ).rejects.toThrow('Error when checking shipping on Melhor Envio');
  });
});
