import { Controller, Get, Query, Post, Body, Logger } from '@nestjs/common';
import { StoresService } from '../services/stores.service';
import { CreateStoreDto } from '../dto/create-store.dto';
import { Store } from '../interfaces/store.interface';
import { GeoService } from '../../geo/geo.service';
import { DistanceService } from '../../distance/distance.service';
import { MelhorEnvioService } from '../../melhor-envio/melhor-envio.service';

@Controller('stores')
export class StoresController {
  private readonly logger = new Logger(StoresController.name);

  constructor(
    private readonly storesService: StoresService,
    private readonly geoService: GeoService,
    private readonly distanceService: DistanceService,
    private readonly melhorEnvioService: MelhorEnvioService,
  ) {}

  @Get()
  async findAll(): Promise<{ stores: Store[]; limit: number; offset: number; total: number }> {
    const stores = await this.storesService.getAllStores();
    return {
      stores,
      limit: 1,
      offset: 1,
      total: stores.length,
    };
  }

  @Post()
  async create(@Body() dto: CreateStoreDto): Promise<Store> {
    this.logger.log(`POST /stores - Creating store: ${dto.storeName}`);
    return this.storesService.createStore(dto);
  }

  @Get('user-location')
  async getLocation(@Query('cep') cep: string) {
    this.logger.log(`CEP Received ${cep}`);
    return this.geoService.getCoordinatesFromCep(cep);
  }

  @Get('by-cep')
  async getStoresByCep(@Query('cep') cep: string) {
    const { coordinates } = await this.geoService.getCoordinatesFromCep(cep);
    const stores = await this.storesService.getAllStores();

    const storeCoordinates = stores.map(store => ({
      lat: parseFloat(store.latitude),
      lon: parseFloat(store.longitude),
    }));

    const results = await this.distanceService.calculateDistances({
      userCoordinates: coordinates,
      storeCoordinates,
    });

    const response = await Promise.all(
      results.map(async (result, index) => {
        const store = stores[index];
        const distance = result.distance;

        if (distance <= 50 && store.type === 'PDV') {
          return {
            name: store.storeName,
            city: store.city,
            postalCode: store.postalCode,
            type: 'PDV',
            distance: `${distance.toFixed(2)} km`,
            value: [
              {
                prazo: `${store.shippingTimeInDays} dias úteis`,
                price: 'R$ 15,00',
                description: 'Motoboy',
              },
            ],
          };
        } else {
          const fretes = await this.melhorEnvioService.calculateFreight(store.postalCode, cep);

          return {
            name: store.storeName,
            city: store.city,
            postalCode: store.postalCode,
            type: 'LOJA',
            distance: `${distance.toFixed(2)} km`,
            value: fretes
            .filter((frete: any) => frete.price && frete.delivery_time && frete.name)
            .map((frete: any) => ({
              prazo: `${frete.delivery_time} business days`,
              codProdutoAgencia: frete.id,
              price: `R$ ${frete.price}`,
              description: frete.name,
            }))
          };
        }
      })
    );

    return {
      stores: response,
      pins: stores.map(store => ({
        position: {
          lat: parseFloat(store.latitude),
          lng: parseFloat(store.longitude),
        },
        title: store.storeName,
      })),
      limit: 1,
      offset: 1,
      total: stores.length,
    };
  }
}
