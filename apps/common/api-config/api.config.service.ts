/* eslint-disable boundaries/no-unknown-files */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiConfigService {
  constructor(private readonly configService: ConfigService) {}

  getApiUrl(): string {
    return this.getGenericConfig('urls.api');
  }

  getRedisUrl(): string {
    return this.getGenericConfig('urls.redis');
  }

  getEventsNotifierUrl(): string {
    return this.getGenericConfig('urls.eventsNotifier');
  }

  getRedisHost(): string {
    const url = this.getRedisUrl();
    return url.split(':')[0];
  }

  getRedisPort(): number {
    const url = this.getRedisUrl();
    const components = url.split(':');

    if (components.length > 1) {
      return Number(components[1]);
    }

    return 6379;
  }

  getIsEventsNotifierFeatureActive(): boolean {
    return this.getGenericConfig('features.eventsNotifier.enabled');
  }

  getEventsNotifierFeaturePort(): number {
    return this.getGenericConfig('features.eventsNotifier.port');
  }

  private getGenericConfig<T>(key: string, options?: { defaultValue: T }): T {
    const config = this.configService.get<T>(key);

    if (config === undefined && options) {
      return options.defaultValue;
    }

    if (config === undefined) {
      throw new Error(`No config with key '${key}' is present`);
    }

    return config;
  }
}
