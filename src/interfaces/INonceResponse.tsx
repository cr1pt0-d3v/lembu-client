import { IBaseResponse } from "./IBaseResponse";

export interface INonceResponse extends IBaseResponse{
    nonce:string;
}