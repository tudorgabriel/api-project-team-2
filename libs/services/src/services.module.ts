import { Global, Module } from '@nestjs/common';
import { TokenService } from './token/token.service';
import { UserService } from './user/user.service';
import { DatabaseModule } from '@libs/database';
import { ExampleService } from './example/example.service';
import { DynamicModuleUtils } from '@libs/common';
import { EstdService } from './estd/estd.service';

@Global()
@Module({
  imports: [DatabaseModule, DynamicModuleUtils.getCachingModule()],
  providers: [TokenService, UserService, ExampleService, EstdService],
  exports: [TokenService, UserService, ExampleService, EstdService],
})
export class ServicesModule {}
