
import { EsdtService } from "@libs/services/estdtransferservice/esdt.service";
import { Controller, Get, } from "@nestjs/common";


@Controller('/esdt-transfer')
export class TransferEsdtWithFeeController {
    constructor(
        private readonly esdtService: EsdtService,
    ) {

    }

    // @Get('/paidfees')
    // async gePaidFees() {
    //     console.log('Trying to see the paid fees');
    //     const transaction = await this.esdtService.getPaidFeesList("erd1qqqqqqqqqqqqqpgqlhr2ygmratvx5usckzl5g4992eelwe6r3e8sl62pz0");
    //     return transaction
    //     // const transaction = await this.bumpService.getBumpTransaction();
    //     // return transaction.toPlainObject();
    // }

    @Get('/tokensfee')
    async getTokensFee() {
        console.log('Trying to see the tokens fee');
        const transaction = await this.esdtService.getTokenFee("TOKENTEST-b0b5")
        return transaction
    }



}
