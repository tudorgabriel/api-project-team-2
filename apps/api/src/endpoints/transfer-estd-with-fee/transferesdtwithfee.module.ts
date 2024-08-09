import { Module } from '@nestjs/common';
import { TransferEsdtWithFeeController } from './trasnferesdtwithfee.controller';
import { ServicesModule } from '@libs/services';
import { DynamicModuleUtils } from '@libs/common';

@Module({
  imports: [ServicesModule, DynamicModuleUtils.getCachingModule()],
  providers: [DynamicModuleUtils.getNestJsApiConfigService()],
  controllers: [TransferEsdtWithFeeController],
})
export class TransferEsdtWithFeeModule {}
