<<<<<<< HEAD
import { Module } from '@nestjs/common';
import { TransferEsdtWithFeeController } from './trasnferesdtwithfee.controller';
import { ServicesModule } from '@libs/services';
import { DynamicModuleUtils } from '@libs/common';

@Module({
  imports: [ServicesModule, DynamicModuleUtils.getCachingModule()],
  providers: [DynamicModuleUtils.getNestJsApiConfigService()],
  controllers: [TransferEsdtWithFeeController],
=======
import { Module } from "@nestjs/common";
import { TransferEsdtWithFeeController } from "./trasnferesdtwithfee.controller";
import { EsdtService } from "@libs/services/estdtransferservice";
import { CommonService } from "@libs/services/estdtransferservice/common.service";
import { NetworkConfigService } from "@libs/common";

@Module({
    imports: [],
    providers: [EsdtService, CommonService, NetworkConfigService],
    controllers: [
        TransferEsdtWithFeeController
    ]
>>>>>>> main
})
export class TransferEsdtWithFeeModule {}
