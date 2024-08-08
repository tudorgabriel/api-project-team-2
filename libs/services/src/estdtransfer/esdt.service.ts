import {
    AbiRegistry,
    Address,
    AddressValue,
    ResultsParser,
    SmartContract,
    //Transaction,
} from '@multiversx/sdk-core/out';
import { Injectable } from '@nestjs/common';
import { promises } from 'fs';
import { CommonService } from './common.service';
import { UtilsDataEnum } from './enums';

@Injectable()
export class EsdtService {
    constructor(private readonly commonService: CommonService) { }
    async getEsdtTransferWithFeeSmartContract(address: string): Promise<SmartContract> {
        const jsonContent: string = await promises.readFile(
            'libs/services/src/esdt-transfer-with-fee.abi.json',
            {
                encoding: 'utf8',
            },
        );
        const json = JSON.parse(jsonContent);
        const contract = new SmartContract({
            address: Address.fromBech32(address),
            abi: AbiRegistry.create(json),
        });
        return contract;
    }
    async getPaidFeesList(user: string): Promise<string> {
        const provider = await this.commonService.getNetworkProvider();
        const contract = await this.getEsdtTransferWithFeeSmartContract(UtilsDataEnum.scAdress);
        const interactor = contract.methodsExplicit.getTokenFee([
            new AddressValue(Address.fromBech32(user)),
        ]);
        const queryResult = await provider.queryContract(interactor.buildQuery());
        const endpointDefinition = interactor.getEndpoint();
        const result = new ResultsParser().parseQueryResponse(
            queryResult,
            endpointDefinition,
        );
        return result.firstValue?.valueOf();
    }

    // async getBumpTransaction(): Promise<Transaction> {
    //     const contract = await this.getEsdtTransferWithFeeSmartContract(UtilsDataEnum.scAdress);
    //     const interactor = contract.methodsExplicit.getPaidFees();
    //     const transaction = interactor.buildTransaction();
    //     return transaction;
    // }

}










