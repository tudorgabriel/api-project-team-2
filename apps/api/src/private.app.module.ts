import { Module } from '@nestjs/common';
import { ApiMetricsController, HealthCheckController } from '@libs/common';
import { ApiMetricsModule, DynamicModuleUtils } from '@libs/common';
import { LoggingModule } from '@multiversx/sdk-nestjs-common';
import { CommonConfigModule } from '@libs/common/config/common.config.module';
import { AppConfigModule } from './config/app-config.module';
import { EstdModule } from './endpoints/estd/estd.module';

@Module({
  imports: [
    LoggingModule,
    ApiMetricsModule,
    DynamicModuleUtils.getCachingModule(),
    CommonConfigModule,
    AppConfigModule,
    EstdModule,
  ],
  providers: [
    DynamicModuleUtils.getNestJsApiConfigService(),
    DynamicModuleUtils.getPubSubService(),
  ],
  controllers: [ApiMetricsController, HealthCheckController],
})
export class PrivateAppModule {}
