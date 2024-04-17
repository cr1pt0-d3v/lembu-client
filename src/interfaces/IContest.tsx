import { IBaseResponse } from './IBaseResponse';

export enum ContestType {
  Reply = 1,
  Hashtag = 2,
  Cashtag = 3, // this one is not working !!! DON'T USE IT
  Tag = 4,
  TagAndHashTag = 5,
}

export interface IContest extends IBaseResponse {
  tweetId: string | null;
  id: string;
  contestEndDate: Date;
  contestStartDate: Date;
  isActive: boolean;
  contestSettings: IContestSettings;
  contestType: ContestType;
  hastagText: string | null;
  cashText: string | null;
  tag: string | null;
}

export interface IContestSettings {
  maxNumberOfWinnersPerRound: number;
  maxNumberOfPrizeTokensPerRound: number;
  quotesWeight: number;
  likesWeight: number;
  repliesWeight: number;
  retweetsWeight: number;
  minBalanceValueForValidUser: number;
}
