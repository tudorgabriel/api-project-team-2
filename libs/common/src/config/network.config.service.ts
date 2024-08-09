import { Injectable } from "@nestjs/common";
import { configuration } from "./configuration";

export interface NetworkConfig {
  chainID: 'D' | 'T' | '1';
  estdtransferwithfeeContract: string
}

@Injectable()
export class NetworkConfigService {
  private readonly devnetConfig: NetworkConfig = {
    chainID: 'D',
    estdtransferwithfeeContract: "erd1qqqqqqqqqqqqqpgqrhrzduqcwyx0vfex78qqht9pnh3chf2q3e8sspdx9m"
  };
  private readonly testnetConfig: NetworkConfig = {
    chainID: 'T',
    estdtransferwithfeeContract: ""
  };
  private readonly mainnetConfig: NetworkConfig = {
    chainID: '1',
    estdtransferwithfeeContract: ""
  };

  public readonly config: NetworkConfig;

  constructor() {
    const network = configuration().libs.common.network;

    const networkConfigs = {
      devnet: this.devnetConfig,
      testnet: this.testnetConfig,
      mainnet: this.mainnetConfig,
    };

    this.config = networkConfigs[network];
  }
}
