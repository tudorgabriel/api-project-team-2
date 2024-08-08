import {
  AbiRegistry,
  Address,
  QueryRunnerAdapter,
  SmartContractQueriesController,
  SmartContractTransactionsFactory,
  Token,
  TokenTransfer,
  TransactionComputer,
  TransactionsFactoryConfig,
} from '@multiversx/sdk-core/out';
import { Injectable } from '@nestjs/common';
import abiRow from './esdt-transfer-with-fee.abi.json';
import { ApiNetworkProvider } from '@multiversx/sdk-network-providers';
import { CommonConfigService, NetworkConfigService } from '@libs/common';
import { promises } from 'fs';
import { UserSigner } from '@multiversx/sdk-wallet';

@Injectable()
export class EsdtService {
  private readonly queriesController: SmartContractQueriesController;
  private readonly transactionsFactory: SmartContractTransactionsFactory;

  constructor(
    private readonly networkConfigService: NetworkConfigService,
    readonly commonConfigService: CommonConfigService,
  ) {
    const abi = AbiRegistry.create(abiRow);
    const networkProvider = new ApiNetworkProvider(
      commonConfigService.config.urls.api,
    );
    const queryRunner = new QueryRunnerAdapter({ networkProvider });
    this.queriesController = new SmartContractQueriesController({
      abi,
      queryRunner,
    });

    this.transactionsFactory = new SmartContractTransactionsFactory({
      config: new TransactionsFactoryConfig({
        chainID: networkConfigService.config.chainID,
      }),
      abi,
    });
  }

  async getPaidFeesList(): Promise<String> {
    const query = this.queriesController.createQuery({
      contract: this.networkConfigService.config.scAdress,
      function: 'getPaidFees',
      arguments: [],
    });
    const result = await this.queriesController.runQuery(query);
    const data = this.queriesController.parseQueryResponse(result);
    console.log(data);
    return '';
  }

  async setExactValueFee(
    address: string,
    feeToken: string,
    feeAmount: string,
    token: string,
  ): Promise<any> {
    const transaction = this.transactionsFactory.createTransactionForExecute({
      sender: Address.fromBech32(address),
      contract: Address.fromBech32(this.networkConfigService.config.scAdress),
      function: 'setExactValueFee',
      arguments: [feeToken, feeAmount, token],
      gasLimit: BigInt(10_000_000),
    });
    const pemText = await promises.readFile(
      'libs/services/src/estdtransfer/walletNew.pem',
      { encoding: 'utf8' },
    );
    const networkProvider = new ApiNetworkProvider(
      this.commonConfigService.config.urls.api,
    );
    const aux = await networkProvider.getAccount(
      Address.fromBech32(transaction.sender),
    );
    transaction.nonce = BigInt(aux.nonce);
    const signer = UserSigner.fromPem(pemText);
    const computer = new TransactionComputer();
    const serializedTx = computer.computeBytesForSigning(transaction);
    transaction.signature = await signer.sign(serializedTx);

    console.log(transaction);

    const txHash = await networkProvider.sendTransaction(transaction);
    console.log('TX hash:', txHash);

    return transaction;
  }

  async setPercentageFee(
    address: string,
    fee: number,
    token: string,
  ): Promise<any> {
    const transaction = this.transactionsFactory.createTransactionForExecute({
      contract: Address.fromBech32(this.networkConfigService.config.scAdress),
      function: 'setPercentageFee',
      arguments: [fee, token],
      sender: Address.fromBech32(address),
      gasLimit: BigInt(10_000_000),
    });

    const pemText = await promises.readFile(
      'libs/services/src/estdtransfer/walletNew.pem',
      { encoding: 'utf8' },
    );
    const networkProvider = new ApiNetworkProvider(
      this.commonConfigService.config.urls.api,
    );
    const aux = await networkProvider.getAccount(
      Address.fromBech32(transaction.sender),
    );
    transaction.nonce = BigInt(aux.nonce);
    const signer = UserSigner.fromPem(pemText);
    const computer = new TransactionComputer();
    const serializedTx = computer.computeBytesForSigning(transaction);
    transaction.signature = await signer.sign(serializedTx);

    console.log(transaction);

    const txHash = await networkProvider.sendTransaction(transaction);
    console.log('TX hash:', txHash);
  }

  async transfer(
    address: string,
    tokenIdentifier: string,
    amount: string,
    feeTokenIdentifier: string,
    feeAmount: string,
  ): Promise<any> {
    const transaction = this.transactionsFactory.createTransactionForExecute({
      sender: Address.fromBech32(address),
      contract: Address.fromBech32(this.networkConfigService.config.scAdress),
      function: 'transfer',
      arguments: [address],
      tokenTransfers: [
        new TokenTransfer({
          token: new Token({ identifier: tokenIdentifier }),
          amount: BigInt(amount),
        }),
        new TokenTransfer({
          token: new Token({ identifier: feeTokenIdentifier }),
          amount: BigInt(feeAmount),
        }),
      ],
      gasLimit: BigInt(10_000_000),
    });

    const pemText = await promises.readFile(
      'libs/services/src/estdtransfer/walletNew.pem',
      { encoding: 'utf8' },
    );
    const networkProvider = new ApiNetworkProvider(
      this.commonConfigService.config.urls.api,
    );
    const aux = await networkProvider.getAccount(
      Address.fromBech32(transaction.sender),
    );
    transaction.nonce = BigInt(aux.nonce);
    const signer = UserSigner.fromPem(pemText);
    const computer = new TransactionComputer();
    const serializedTx = computer.computeBytesForSigning(transaction);
    transaction.signature = await signer.sign(serializedTx);

    console.log(transaction);

    const txHash = await networkProvider.sendTransaction(transaction);
    console.log('TX hash:', txHash);
  }

  async getTokenFee(token: string): Promise<any> {
    const query = this.queriesController.createQuery({
      contract: this.networkConfigService.config.scAdress,
      function: 'getTokenFee',
      arguments: [token],
    });
    const result = await this.queriesController.runQuery(query);
    console.log(result);
    return result;
  }

  async claimFees(address: string): Promise<any> {
    const transaction = this.transactionsFactory.createTransactionForExecute({
      contract: Address.fromBech32(this.networkConfigService.config.scAdress),
      function: 'claimFees',
      arguments: [],
      sender: Address.fromBech32(address),
      gasLimit: BigInt(10_000_000),
    });

    const pemText = await promises.readFile(
      'libs/services/src/estdtransfer/walletNew.pem',
      { encoding: 'utf8' },
    );
    const networkProvider = new ApiNetworkProvider(
      this.commonConfigService.config.urls.api,
    );
    const aux = await networkProvider.getAccount(
      Address.fromBech32(transaction.sender),
    );
    transaction.nonce = BigInt(aux.nonce);
    const signer = UserSigner.fromPem(pemText);
    const computer = new TransactionComputer();
    const serializedTx = computer.computeBytesForSigning(transaction);
    transaction.signature = await signer.sign(serializedTx);

    console.log(transaction);

    const txHash = await networkProvider.sendTransaction(transaction);
    console.log('TX hash:', txHash);
  }
}
