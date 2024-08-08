import { Injectable } from '@nestjs/common';
import { configuration } from './configuration';

export interface NetworkConfig {
  chainID: 'D' | 'T' | '1';
  scAdress: string;
}

@Injectable()
export class NetworkConfigService {
  private readonly devnetConfig: NetworkConfig = {
    chainID: 'D',
    scAdress: 'erd1qqqqqqqqqqqqqpgqlhr2ygmratvx5usckzl5g4992eelwe6r3e8sl62pz0',
  };
  private readonly testnetConfig: NetworkConfig = {
    chainID: 'T',
    scAdress: '',
  };
  private readonly mainnetConfig: NetworkConfig = {
    chainID: '1',
    scAdress: '',
  };

  public readonly config: NetworkConfig;
  static config: any;

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
