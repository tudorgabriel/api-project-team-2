import { Module } from '@nestjs/common';
import {
  ApiMetricsController,
  CommonConfigModule,
  DynamicModuleUtils,
  HealthCheckController,
} from '@libs/common';
import { ApiMetricsModule } from '@libs/common';
import { LoggingModule } from '@multiversx/sdk-nestjs-common';
import { AppConfigModule } from './config/app-config.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ProcessorService } from './processor/processor.service';
import { EventsNotifierModule } from '../events-notifier/events-notifier.module';
import { EventsNotifierConsumerService } from '../events-notifier/events-notifier.consumer.service';

@Module({
  imports: [
    LoggingModule,
    ApiMetricsModule,
    AppConfigModule,
    CommonConfigModule,
    ScheduleModule.forRoot(),
    DynamicModuleUtils.getCachingModule(),
    EventsNotifierModule,
  ],
  providers: [ProcessorService, EventsNotifierConsumerService],
  controllers: [ApiMetricsController, HealthCheckController],
})
export class AppModule {}
