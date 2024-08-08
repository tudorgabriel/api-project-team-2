import { Module } from '@nestjs/common';
import { DynamicModuleUtils } from '@libs/common';

import { TransferEsdtWithFeeModule } from './transfer-estd-with-fee/transferesdtwithfee.module';

@Module({
  imports: [TransferEsdtWithFeeModule],
  providers: [DynamicModuleUtils.getNestJsApiConfigService()],
})
export class EndpointsModule {}
