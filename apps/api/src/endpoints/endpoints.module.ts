import { Module } from "@nestjs/common";
import { DynamicModuleUtils } from "@libs/common";
import { UserModule } from "./user/user.module";

import { TransferEsdtWithFeeModule } from "./transfer-estd-with-fee/transferesdtwithfee.module";

@Module({
  imports: [
    UserModule,
    TransferEsdtWithFeeModule
  ],
  providers: [
    DynamicModuleUtils.getNestJsApiConfigService(),
  ],
})
export class EndpointsModule { }
