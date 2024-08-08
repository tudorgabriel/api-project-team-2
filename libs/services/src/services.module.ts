import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from '@libs/database';
import { DynamicModuleUtils } from '@libs/common';
import { NetworkConfigModule } from '@libs/common';
import { EsdtService } from './estdtransfer';

@Global()
@Module({
  imports: [
    NetworkConfigModule,
    DatabaseModule,
    DynamicModuleUtils.getCachingModule(),
  ],
  providers: [EsdtService],
  exports: [EsdtService],
})
export class ServicesModule {}
