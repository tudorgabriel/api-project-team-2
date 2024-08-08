import { EsdtService } from '@libs/services/estdtransfer/esdt.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('/esdt-transfer')
export class TransferEsdtWithFeeController {
  constructor(private readonly esdtService: EsdtService) {}

  @Get('/paidfees')
  async getPaidFees(): Promise<any> {
    console.log('Trying to see the paid fees');
    return await this.esdtService.getPaidFeesList();
  }

  @Post('/set-exact-fee')
  async setExactValueFee(
    @Body()
    data: {
      address: string;
      feeToken: string;
      feeAmount: string;
      token: string;
    },
  ): Promise<any> {
    return await this.esdtService.setExactValueFee(
      data.address,
      data.feeToken,
      data.feeAmount,
      data.token,
    );
  }

  @Post('/set-percentage-fee')
  async setPercentageFee(
    @Body() data: { address: string; fee: number; token: string },
  ): Promise<any> {
    console.log('Setting percentage fee');
    return await this.esdtService.setPercentageFee(
      data.address,
      data.fee,
      data.token,
    );
  }

  @Post('/transfer')
  async transfer(
    @Body()
    data: {
      address: string;
      tokenIdentifier: string;
      amount: string;
      feeTokenIdentifier: string;
      feeAmount: string;
    },
  ): Promise<any> {
    console.log('Transferring');
    return await this.esdtService.transfer(
      data.address,
      data.tokenIdentifier,
      //data.tokenNonce,
      data.amount,
      data.feeTokenIdentifier,
      //data.feeTokenNonce,
      data.feeAmount,
    );
  }

  @Get('/token-fee')
  async getTokenFee(@Body() data: { token: string }): Promise<any> {
    console.log('Getting token fee');
    return await this.esdtService.getTokenFee(data.token);
  }

  @Get('/claim-fees')
  async claimFees(@Body() data: { address: string }): Promise<any> {
    console.log('Claiming fees');
    return await this.esdtService.claimFees(data.address);
  }
}
