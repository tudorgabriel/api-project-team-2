import { Module } from '@nestjs/common';
import { EstdController } from './estd.controller';
import { DynamicModuleUtils } from '@libs/common';
import { ServicesModule } from '@libs/services/services.module';

@Module({
  imports: [ServicesModule, DynamicModuleUtils.getCachingModule()],
  controllers: [EstdController],
  providers: [DynamicModuleUtils.getNestJsApiConfigService()],
})
export class EstdModule {}
