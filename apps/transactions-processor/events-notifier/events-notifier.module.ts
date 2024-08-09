import { Module } from '@nestjs/common';
import { EventsNotifierConsumerService } from './events-notifier.consumer.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
// eslint-disable-next-line boundaries/no-unknown
import { ApiConfigModule, ApiConfigService } from '../../common/api-config';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ApiConfigModule],
      inject: [ApiConfigService],
      useFactory: (apiConfigService: ApiConfigService) => ({
        uri: apiConfigService.getEventsNotifierUrl(),
      }),
    }),
  ],
  providers: [EventsNotifierConsumerService],
})
export class EventsNotifierModule {}
