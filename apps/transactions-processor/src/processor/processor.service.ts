
import { CacheService } from "@multiversx/sdk-nestjs-cache";
import { BinaryUtils, Locker } from "@multiversx/sdk-nestjs-common";
import { TransactionProcessor } from "@multiversx/sdk-transaction-processor";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { CacheInfo, CommonConfigService, NetworkConfigService } from "@libs/common";
import { AppConfigService } from "../config/app-config.service";
import { ApiService } from "@multiversx/sdk-nestjs-http";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class ProcessorService {
  private transactionProcessor: TransactionProcessor = new TransactionProcessor();
  private readonly logger: Logger;

  constructor(
    private readonly cacheService: CacheService,
    private readonly commonConfigService: CommonConfigService,
    private readonly appConfigService: AppConfigService,
    private readonly networkConfigService: NetworkConfigService,
    private readonly apiService: ApiService,
    @Inject('PUBSUB_SERVICE') private clientProxy: ClientProxy,
  ) {
    this.logger = new Logger(ProcessorService.name);
  }

  @Cron('*/1 * * * * *')
  async handleNewTransactions() {
    await Locker.lock('newTransactions', async () => {
      await this.transactionProcessor.start({
        gatewayUrl: this.commonConfigService.config.urls.api,
        maxLookBehind: this.appConfigService.config.maxLookBehind,
        // eslint-disable-next-line require-await
        onTransactionsReceived: async (shardId, nonce, transactions, statistics) => {
          this.logger.log(`Received ${transactions.length} transactions on shard ${shardId} and nonce ${nonce}. Time left: ${statistics.secondsLeft}`);
          const allInvalidedKeys = []

          for (const transaction of transactions) {
            const isEsdtTransferWithFeeTransaction = transaction.receiver === this.networkConfigService.config.estdtransferwithfeeContract;
            if (isEsdtTransferWithFeeTransaction && transaction.status == 'success') {
              console.log("Succesful transaction")
              const method = transaction.getDataFunctionName()
              switch (method) {
                case 'setExactValueFee':
                  console.log(" A setExactValueFee transaction was called")
                  const unvalidKeys = await this.handleSetExactValueFeeTransaction(transaction);
                  allInvalidedKeys.push(...unvalidKeys);
                  break;
                case 'setPercentageFee':
                  console.log(" A setPercentageFee transaction was called")
                  break;
                case 'claimFees':
                  console.log(" A claimFees transaction was called")
                  break;
                case 'transfer':
                  console.log(" A transfer transaction was called")
                  const unvalidKeys2 = await this.handleEventTransaction(transaction);
                  allInvalidedKeys.push(...unvalidKeys2);
                  break;
                default:
                  console.log(" Cant find your transaction")
                  break;
              }
            }
          }



          const uniqueInvalidatedKeys = allInvalidedKeys.distinct();
          console.log(uniqueInvalidatedKeys)
          //console.log(this.cacheService.get(uniqueInvalidatedKeys[0]))
          if (uniqueInvalidatedKeys.length > 0) {
            console.log("Deleting the keys")
            await this.cacheService.deleteMany(uniqueInvalidatedKeys);
            this.clientProxy.emit('deleteCacheKeys', uniqueInvalidatedKeys);

            //console.log(this.cacheService. )
          }

        },
        getLastProcessedNonce: async (shardId) => {
          return await this.cacheService.getRemote(CacheInfo.LastProcessedNonce(shardId).key);
        },
        setLastProcessedNonce: async (shardId, nonce) => {
          await this.cacheService.setRemote(CacheInfo.LastProcessedNonce(shardId).key, nonce, CacheInfo.LastProcessedNonce(shardId).ttl);
        },
      });
    });
  }


  async test() {
    console.log("nu am gasit in cache pentru ca tocmai a fost stearsa cheia")
    return
  }

  async handleSetExactValueFeeTransaction(transaction: any): Promise<string[]> {
    console.log(transaction);
    const transactionURL = `${this.commonConfigService.config.urls.api}/transactions/${transaction.originalTransactionHash ?? transaction.hash}`;

    console.log('///////////////')
    console.log(transactionURL);
    console.log('///////////////')

    const { data: onChainTransaction } = await this.apiService.get(transactionURL);

    const setExactValueEvent = onChainTransaction?.logs?.events?.find((e: any) => e.identifier === 'setExactValueFee');
    if (!setExactValueEvent) {
      return [];
    }

    const fee_token = BinaryUtils.base64Decode(setExactValueEvent.topics[1]);
    console.log(fee_token);

    const amount = BinaryUtils.base64ToHex(setExactValueEvent.topics[2]);
    console.log(amount);

    const token = BinaryUtils.base64Decode(setExactValueEvent.topics[3]);
    console.log(token);

    return [
      CacheInfo.TokenFees(token).key
    ]

  }


  async handleEventTransaction(transaction: any): Promise<string[]> {
    console.log(transaction);
    const transactionURL = `${this.commonConfigService.config.urls.api}/transactions/${transaction.originalTransactionHash ?? transaction.hash}`;

    console.log('///////////////')
    console.log(transactionURL);
    console.log('///////////////')

    const { data: onChainTransaction } = await this.apiService.get(transactionURL);

    const transferEvent = onChainTransaction?.logs?.events?.find((e: any) => e.identifier === 'transfer');
    if (!transferEvent) {
      return [];
    }

    const token_id = BinaryUtils.base64Decode(transferEvent.topics[1]);
    console.log(token_id);

    const token_amount = BinaryUtils.base64ToHex(transferEvent.topics[2]);
    console.log(token_amount);

    const fee_id = BinaryUtils.base64Decode(transferEvent.topics[3]);
    console.log(fee_id);


    const fee_amount = BinaryUtils.base64Decode(transferEvent.topics[4]);
    console.log(fee_amount);

    return [
      CacheInfo.PaidFees().key
    ]

  }
}
