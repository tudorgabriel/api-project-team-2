import { Module } from '@nestjs/common';
import { DynamicModuleUtils } from '@libs/common';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { UserModule } from './user/user.module';
import { ExampleModule } from './example/example.module';
import { EstdModule } from './estd/estd.module';

@Module({
  imports: [AuthModule, TokenModule, UserModule, ExampleModule, EstdModule],
  providers: [DynamicModuleUtils.getNestJsApiConfigService()],
})
export class EndpointsModule {}
