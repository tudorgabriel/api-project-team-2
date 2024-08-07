import { EstdService } from '@libs/services/estd/estd.service';
// import { NativeAuthGuard, NativeAuth } from '@multiversx/sdk-nestjs-auth';
import { Controller, Get } from '@nestjs/common';
// import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('/route')
export class EstdController {
  constructor(private readonly estdService: EstdService) {}
  @Get('/estd')
  async getEstd() {
    return await this.estdService.getEstd(
      'erd1qqqqqqqqqqqqqpgqn6skx92uyddka3mhx9fd3pryl9p0rcsz3e8sxdx6yl',
    );
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
