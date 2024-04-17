import { IBaseResponse } from './IBaseResponse';

export interface IValidateTokenResponse extends IBaseResponse {
  isTwitterAccountLinked: boolean;
  twitterAccount: string;
}
