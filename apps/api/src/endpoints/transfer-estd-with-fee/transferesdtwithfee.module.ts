import { Module } from '@nestjs/common';
import { TransferEsdtWithFeeController } from './trasnferesdtwithfee.controller';
import { ServicesModule } from '@libs/services';

@Module({
  imports: [ServicesModule],
  providers: [],
  controllers: [TransferEsdtWithFeeController],
})
export class TransferEsdtWithFeeModule {}
