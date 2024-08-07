import { Module } from "@nestjs/common";
import { TransferEsdtWithFeeController } from "./trasnferesdtwithfee.controller";
import { EsdtService } from "@libs/services/estdtransferservice";
import { CommonService } from "@libs/services/estdtransferservice/common.service";

@Module({
    imports: [],
    providers: [EsdtService, CommonService],
    controllers: [
        TransferEsdtWithFeeController
    ]
})
export class TransferEsdtWithFeeModule { }