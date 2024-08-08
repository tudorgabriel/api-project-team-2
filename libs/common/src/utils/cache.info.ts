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

  static PaidFees(user: string): CacheInfo {
    return {
      key: `paidfees:${user}`,
      ttl: Constants.oneHour()
    }
  }


  static TokenFees(): CacheInfo {
    return {
      key: `tokenfees`,
      ttl: Constants.oneHour()
    }
  }
}
