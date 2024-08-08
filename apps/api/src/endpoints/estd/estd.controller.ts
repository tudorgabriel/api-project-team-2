import { EstdService } from '@libs/services/estd/estd.service';
import { NativeAuthGuard } from '@multiversx/sdk-nestjs-auth';
// import { NativeAuthGuard, NativeAuth } from '@multiversx/sdk-nestjs-auth';
import { Controller, Get, UseGuards } from '@nestjs/common';
// import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('/route')
@UseGuards(NativeAuthGuard)
export class EstdController {
  constructor(private readonly estdService: EstdService) {}
  @Get('/estd')
  async getEstd() {
    return await this.estdService.getEstd();
  }
  //   @UseGuards(NativeAuthGuard)
  //   @ApiResponse({
  //     status: 200,
  //     description: 'Authorizes the user and returns the encoded address',
  //   })
  //   authorize(@NativeAuth('address') address: string): string {
  //     return address;
  //   }
}
