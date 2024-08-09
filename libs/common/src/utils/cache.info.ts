import { Constants } from "@multiversx/sdk-nestjs-common";

export class CacheInfo {
  key: string = "";
  ttl: number = Constants.oneSecond() * 6;

  static LastProcessedNonce(shardId: number): CacheInfo {
    return {
      key: `lastProcessedNonce:${shardId}`,
      ttl: Constants.oneMonth(),
    };
  }

  static Examples: CacheInfo = {
    key: "examples",
    ttl: Constants.oneHour(),
  };

  static PaidFees(): CacheInfo {
    return {
      key: `paidfees:`,
      ttl: Constants.oneHour()
    }
  }


  static TokenFees(token: string): CacheInfo {
    return {
      key: `tokenfees:${token}`,
      ttl: Constants.oneHour()
    }
  }
}
