/* eslint-disable boundaries/no-unknown */
import {
  CacheModule,
  RedisCacheModuleOptions,
} from '@multiversx/sdk-nestjs-cache';
import { DynamicModule } from '@nestjs/common';
// eslint-disable-next-line boundaries/no-ignored
// import { AppConfigModule } from '../config/app-config.module';
// import { AppConfigService } from '../config/app-config.service';
import { ApiConfigModule, ApiConfigService } from '../../../common/api-config';

import { ApiModule, ApiModuleOptions } from '@multiversx/sdk-nestjs-http';

export class DynamicModuleUtils {
  static getCachingModule(): DynamicModule {
    return CacheModule.forRootAsync({
      imports: [ApiConfigModule],
      inject: [ApiConfigService],
      useFactory: (apiConfigService: ApiConfigService) =>
        new RedisCacheModuleOptions(
          {
            host: apiConfigService.getRedisUrl(),
            port: apiConfigService.getRedisPort(),
          },
          {
            poolLimit: 100,
            processTtl: 60,
          },
        ),
    });
  }

  static getApiModule(): DynamicModule {
    return ApiModule.forRootAsync({
      imports: [ApiConfigService],
      inject: [ApiConfigService],
      useFactory: (_apiConfigService: ApiConfigService) =>
        new ApiModuleOptions({
          axiosTimeout: 61000,
          serverTimeout: 60000,
          useKeepAliveAgent: true,
        }),
    });
  }
}
