
import { EsdtService } from "@libs/services/estdtransferservice/esdt.service";
import { Controller, Get, } from "@nestjs/common";


@Controller('/esdt-transfer')
export class TransferEsdtWithFeeController {
    constructor(
        private readonly esdtService: EsdtService,
    ) {

    }

    @Get('/paidfees')
    async getTest() {
        console.log('Trying to see the paid fees');
        const transaction = await this.esdtService.getPaidFeesList("erd1qqqqqqqqqqqqqpgqn6skx92uyddka3mhx9fd3pryl9p0rcsz3e8sxdx6yl");
        return transaction
        // const transaction = await this.bumpService.getBumpTransaction();
        // return transaction.toPlainObject();
    }


}
