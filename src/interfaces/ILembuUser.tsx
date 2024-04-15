export interface ILembuUser {
  id: string;
  joinDate: Date;
  twitterHandler: string;
  twitterAuthorId: string;
  walletAddress: string;
  comments: string;
  balanceOnLatestWinDate: number;
  gainsOverTime: number;
  latestWinPercentage: number;
  latestWinDate: Date;
  nonce: string;
  profileId: string;
  hasActiveSession: boolean;
  sessionExpirationDate: Date;
}
