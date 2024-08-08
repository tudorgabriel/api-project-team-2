import { CommonConfigService } from '@libs/common';
import { Injectable } from '@nestjs/common';
import abiRow from './esdt-transfer-with-fee.abi.json';
import { ApiNetworkProvider } from '@multiversx/sdk-network-providers';
import {
  AbiRegistry,
  QueryRunnerAdapter,
  SmartContractQueriesController,
} from '@multiversx/sdk-core/out';

@Injectable()
export class EstdService {
  readonly queriesController: SmartContractQueriesController;
  // constructor(private readonly cacheService: CacheService) {}
  constructor(readonly commonConfigureService: CommonConfigService) {
    const abi = AbiRegistry.create(abiRow);
    const queryRunner = new QueryRunnerAdapter({
      networkProvider: new ApiNetworkProvider(
        commonConfigureService.config.urls.api,
      ),
    });
    this.queriesController = new SmartContractQueriesController({
      abi,
      queryRunner,
    });
  }

  async getEstd() {
    const query = this.queriesController.createQuery({
      contract:
        'erd1qqqqqqqqqqqqqpgqn6skx92uyddka3mhx9fd3pryl9p0rcsz3e8sxdx6yl',
      function: 'getPaidFees',
      arguments: [],
    });

    const response = await this.queriesController.runQuery(query);
    return response;
  }
}
