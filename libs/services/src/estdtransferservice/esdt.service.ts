// import {
//     AbiRegistry,
//     Address,
//     AddressValue,
//     ResultsParser,
//     SmartContract,
//     //Transaction,
// } from '@multiversx/sdk-core/out';
// import { Injectable } from '@nestjs/common';
// import { promises } from 'fs';
// import { CommonService } from './common.service';
// import { UtilsDataEnum } from './enums';
// import { CacheService } from '@multiversx/sdk-nestjs-cache';
// import { CacheInfo } from '@libs/common';
// @Injectable()
// export class EsdtService {
//     constructor(
//         private readonly commonService: CommonService,
//         private readonly cachingService: CacheService) {

//     }
//     async getEsdtTransferWithFeeSmartContract(address: string): Promise<SmartContract> {
//         const jsonContent: string = await promises.readFile(
//             'libs/services/src/esdt-transfer-with-fee.abi.json',
//             {
//                 encoding: 'utf8',
//             },
//         );
//         const json = JSON.parse(jsonContent);
//         const contract = new SmartContract({
//             address: Address.fromBech32(address),
//             abi: AbiRegistry.create(json),
//         });
//         return contract;
//     }

//     async getPaidFeesList(user: string): Promise<string> {
//         return this.cachingService.getOrSet(
//             CacheInfo.PaidFees(user).key,
//             async () => await this.getPaidFeesListRaw(user),
//             CacheInfo.PaidFees(user).ttl,
//         );
//     }


//     async getPaidFeesListRaw(user: string): Promise<string> {
//         console.log("Nothing was found in the cache for paid fees")
//         const provider = await this.commonService.getNetworkProvider();
//         const contract = await this.getEsdtTransferWithFeeSmartContract(UtilsDataEnum.scAdress);
//         const interactor = contract.methodsExplicit.getPaidFees([
//             new AddressValue(Address.fromBech32(user)),
//         ]);
//         const queryResult = await provider.queryContract(interactor.buildQuery());
//         const endpointDefinition = interactor.getEndpoint();
//         const result = new ResultsParser().parseQueryResponse(
//             queryResult,
//             endpointDefinition,
//         );
//         return result.firstValue?.valueOf();
//     }

//     async getTokenFeesList(user: string): Promise<string> {
//         return this.cachingService.getOrSet(
//             CacheInfo.TokenFees().key,
//             async () => await this.getTokenFeesListRaw(user),
//             CacheInfo.TokenFees().ttl,
//         );
//     }



//     async getTokenFeesListRaw(user: string): Promise<string> {
//         console.log("Nothing was found in cache for token fees")
//         const provider = await this.commonService.getNetworkProvider();
//         const contract = await this.getEsdtTransferWithFeeSmartContract(UtilsDataEnum.scAdress);
//         const interactor = contract.methodsExplicit.getTokenFee([
//         ]);
//         const queryResult = await provider.queryContract(interactor.buildQuery());
//         const endpointDefinition = interactor.getEndpoint();
//         const result = new ResultsParser().parseQueryResponse(
//             queryResult,
//             endpointDefinition,
//         );
//         console.log(result)
//         return result.firstValue?.valueOf();
//     }

//     // async getBumpTransaction(): Promise<Transaction> {
//     //     const contract = await this.getEsdtTransferWithFeeSmartContract(UtilsDataEnum.scAdress);
//     //     const interactor = contract.methodsExplicit.getPaidFees();
//     //     const transaction = interactor.buildTransaction();
//     //     return transaction;
//     // }
// }



import {
    AbiRegistry,

    QueryRunnerAdapter,
    //ResultsParser,
    SmartContractQueriesController,

} from '@multiversx/sdk-core/out';
import { Injectable } from '@nestjs/common';
import abiRow from './esdt-transfer-with-fee.abi.json';
import { ApiNetworkProvider } from '@multiversx/sdk-network-providers';
import { CacheInfo, CommonConfigService, NetworkConfigService } from '@libs/common';
import { CacheService } from '@multiversx/sdk-nestjs-cache';

@Injectable()
export class EsdtService {
    private readonly queriesController: SmartContractQueriesController;

    constructor(
        private readonly networkConfigService: NetworkConfigService,
        readonly commonConfigService: CommonConfigService,
        private readonly cachingService: CacheService) {
        const abi = AbiRegistry.create(abiRow);
        const networkProvider = new ApiNetworkProvider(
            commonConfigService.config.urls.api,
        );
        const queryRunner = new QueryRunnerAdapter({ networkProvider });
        this.queriesController = new SmartContractQueriesController({
            abi,
            queryRunner,
        });


    }

    async getPaidFeesList(): Promise<any> {
        console.log("Get Paid function called. Searching in cache")
        console.log(CacheInfo.PaidFees().key)
        return this.cachingService.getOrSet(
            CacheInfo.PaidFees().key,
            async () => await this.getPaidFeesListRaw(),
            CacheInfo.PaidFees().ttl,
        );
    }



    async getPaidFeesListRaw(): Promise<any> {
        console.log("Nu am gasit in cache!!!!")

        const query = this.queriesController.createQuery({
            contract: this.networkConfigService.config.estdtransferwithfeeContract,
            function: 'getPaidFees',
            arguments: [],
        });
        const result = await this.queriesController.runQuery(query);
        const data = this.queriesController.parseQueryResponse(result);
        //const parsedData = this.queriesController.parseQueryResponse(result);
        const obiect1 = data[0][0][0];
        const obiect2 = data[0][0][1];
        const fee_token = obiect1.field0;
        const fee_amount = obiect2.c;
        console.log(fee_token)
        console.log(fee_amount[0])
        return {
            feetoken: fee_token,
            fee_amount: fee_amount[0]
        };
    }


    async getTokenFee(token: string): Promise<any> {
        console.log("Get Token Fee function called. Searching in cache")
        console.log(CacheInfo.TokenFees(token).key)
        return this.cachingService.getOrSet(
            CacheInfo.TokenFees(token).key,
            async () => await this.getTokenFeeRaw(token),
            CacheInfo.TokenFees(token).ttl,
        );



    }


    async getTokenFeeRaw(token: string): Promise<any> {
        console.log("Nu am gasit in cache!!!!")
        const query = this.queriesController.createQuery({
            contract: this.networkConfigService.config.estdtransferwithfeeContract,
            function: 'getTokenFee',
            arguments: [token],
        });
        console.log(token)
        const result = await this.queriesController.runQuery(query);

        const parsedResult = this.queriesController.parseQueryResponse(result);
        const fee_type = parsedResult[0].name
        const amount = parsedResult[0].fields[0].amount.c
        const token_identifier = parsedResult[0].fields[0].token_identifier
        console.log(fee_type)
        console.log(amount)
        console.log(token_identifier)

        // const resultpars = new ResultsParser().parseQueryResponse(
        //     result
        // );
        //console.log(result)
        return {
            fee_type: fee_type,
            amount: amount,
            token_identifier: token_identifier
        };

    }



}


















