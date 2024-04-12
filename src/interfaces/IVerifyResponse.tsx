import { IBaseResponse } from "./IBaseResponse";

export interface IVerifyResponse extends IBaseResponse{
    token:string;
    address:string;
    twitterHandler:string;
}