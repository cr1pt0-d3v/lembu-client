import { IBaseResponse } from './IBaseResponse';

export interface ITwitterAuthResponse extends IBaseResponse {
  redirectUrl: string;
}
