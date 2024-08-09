import { Injectable } from '@nestjs/common';
import { configuration } from './configuration';

export interface NetworkConfig {
  chainID: 'D' | 'T' | '1';
<<<<<<< HEAD
  scAdress: string;
=======
  estdtransferwithfeeContract: string
>>>>>>> main
}

@Injectable()
export class NetworkConfigService {
  private readonly devnetConfig: NetworkConfig = {
    chainID: 'D',
<<<<<<< HEAD
    scAdress: 'erd1qqqqqqqqqqqqqpgqlhr2ygmratvx5usckzl5g4992eelwe6r3e8sl62pz0',
  };
  private readonly testnetConfig: NetworkConfig = {
    chainID: 'T',
    scAdress: '',
  };
  private readonly mainnetConfig: NetworkConfig = {
    chainID: '1',
    scAdress: '',
=======
    estdtransferwithfeeContract: "erd1qqqqqqqqqqqqqpgqrhrzduqcwyx0vfex78qqht9pnh3chf2q3e8sspdx9m"
  };
  private readonly testnetConfig: NetworkConfig = {
    chainID: 'T',
    estdtransferwithfeeContract: ""
  };
  private readonly mainnetConfig: NetworkConfig = {
    chainID: '1',
    estdtransferwithfeeContract: ""
>>>>>>> main
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
