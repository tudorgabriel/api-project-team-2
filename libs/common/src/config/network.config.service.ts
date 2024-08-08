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
    estdtransferwithfeeContract: "erd1qqqqqqqqqqqqqpgqlhr2ygmratvx5usckzl5g4992eelwe6r3e8sl62pz0"
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
