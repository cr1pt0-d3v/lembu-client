import { observable, action, runInAction, makeObservable } from "mobx";
import { createAuthenticationAdapter, AuthenticationStatus } from '@rainbow-me/rainbowkit';
import Cookies from "universal-cookie";
import { axiosClient } from "../services/AxiosClient";
import { IValidateTokenResponse } from "../interfaces/IValidateTokenResponse";
import { INonceResponse } from "../interfaces/INonceResponse";
import { IVerifyAuthentication } from "../interfaces/IVerifyAuthentication";
import { IVerifyResponse } from "../interfaces/IVerifyResponse";
import { ITwitterAuthResponse } from "../interfaces/ITwitterAuthResponse";

export class MainStore {
    lembuToken: string = "";
    authStatus: AuthenticationStatus;
    isLoggedIn: boolean = false;
    successTwitterLogin:boolean = false;
    accountIsLinkedToTwitter: boolean = false;
    twitterUserNameLinkedToAccount:string = "";
    modalContinueCallback: () => void = () => { };
    cookie: Cookies;
    constructor() {
        makeObservable(this, {

            isLoggedIn: observable,
            authStatus: observable,
            getAuthenticationAdapter: action,
            verifyAuthentication: action,
            setAuthenticatedStatus: action,
            setAccountIsLinkedToTwitter: action,
            setSuccessTwitterLogin: action,
            setTwitterUserNameLinkedToAccount: action

        });
        this.authStatus = 'unauthenticated';
        this.cookie = new Cookies(null, { path: '/' });
        this.initData();
    }

    initData = async () => {
        const queryString = window.location.search;
        
        if(queryString != ""){
            const params = new URLSearchParams(queryString);
            if(params.get("successTwitterLogin") != null && params.get("successTwitterLogin") === "true")    {
                this.setSuccessTwitterLogin(true);
                if(params.get("twitterName") != null && params.get("twitterName") != ""){
                this.setTwitterUserNameLinkedToAccount(params.get("twitterName")as string);
                }
            }
        }
        var token = this.cookie.get("wen-lembu-token");
        var address = this.cookie.get("wen-lembu-address");
        if (token != null && token != '') {

            var validateTokenResponse = await axiosClient.getWithTokenAsParam("/validateToken", token) as any

            if (validateTokenResponse.status == 200 && validateTokenResponse.data != null) {
                var response = validateTokenResponse.data as IValidateTokenResponse;
                if (validateTokenResponse.data) {
                    this.lembuToken = token;
                    this.setIsLoggedIn(true);
                    this.setAccountIsLinkedToTwitter(response.isTwitterAccountLinked);
                    axiosClient.setToken(token);
                }
            } else if (validateTokenResponse.status == 401) {
                this.setIsLoggedIn(false);
            }
            if (validateTokenResponse.status != 200) {
                this.cleanCookies();
                this.setIsLoggedIn(false);
            }

        }
    };

    getAuthenticationAdapter = () => {
        return createAuthenticationAdapter({
            getNonce: async () => {
                const response = await axiosClient.get("/nonce") as any;
                if (response.status == 200) {
                    const parsedResponse = response.data as INonceResponse;
                    if (parsedResponse.succes) {
                        return parsedResponse.nonce
                    }
                }
                return "";
            },
            createMessage: ({ nonce, address, chainId }) => {
                return `${window.location.origin} wants you to sign in with your account: ${address}, Sign in with Ethereum to the app, Chain ID: ${chainId}, Nonce: ${nonce}`;
            },
            getMessageBody: ({ message }) => {
                return message;
            },
            verify: async (a) => this.verifyAuthentication(a),
            signOut: async () => {
                this.setIsLoggedIn(false);
                this.cleanCookies()
            },
        })


    };

    async verifyAuthentication({ message, signature }: IVerifyAuthentication) {
        //regex for eth wallet address
        const regex = /(0x[a-fA-F0-9]{40})/;

        // Extract wallet address using match() method
        const matches = message.match(regex);

        // If matches are found, extract the first match (wallet address)
        const address = matches ? matches[0] : null;

        const verifyResponse = await axiosClient.post("/verify", { message, signature, address }) as any;
        if (verifyResponse.status == 200) {
            const parsedResponse = verifyResponse.data as IVerifyResponse;
            if (parsedResponse.succes && parsedResponse.token != "") {
                const expirationDate = new Date();
                expirationDate.setHours(expirationDate.getHours() + 1);
                this.lembuToken = parsedResponse.token;
                this.setAccountIsLinkedToTwitter(parsedResponse.twitterHandler != null && parsedResponse.twitterHandler != "");
                this.cookie.set("wen-lembu-token", this.lembuToken, { expires: expirationDate });
                this.cookie.set("wen-lembu-address", parsedResponse.address, { expires: expirationDate });
                this.setTwitterUserNameLinkedToAccount(parsedResponse.twitterHandler)
                this.setIsLoggedIn(true);
                axiosClient.setToken(this.lembuToken);
                return parsedResponse.succes && parsedResponse.token != null && parsedResponse.token != ""
            }
        }
        return false;
    }
    setAuthenticatedStatus(status: AuthenticationStatus) {
        this.authStatus = status
    }

    setAccountIsLinkedToTwitter(value: boolean) {
        this.accountIsLinkedToTwitter = value;
    }
    setIsLoggedIn(value: boolean) {
        if (value) {
            this.setAuthenticatedStatus('authenticated')
        } else {
            this.setAuthenticatedStatus('unauthenticated')
        }
        this.isLoggedIn = value;

    }

    handleTwitterLogin = async () => {

        // Redirect to the backend endpoint that initiates the Twitter OAuth process
        //window.location.href = 'https://localhost:5050/auth/twitter';
        try {
            var twitterAuthResponse = await axiosClient.get("/auth/twitter") as any;

            if(twitterAuthResponse.status != 200){
                throw new Error('Network response was not ok');
            }

            var parsedResponse = twitterAuthResponse.data as ITwitterAuthResponse;

            if(parsedResponse.succes && parsedResponse.redirectUrl!=null && parsedResponse.redirectUrl != ""){
                window.location.href = parsedResponse.redirectUrl
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error, maybe show an error message to the user
        }
    };
    cleanCookies = () => {
        this.cookie.remove("wen-lembu-token");
        this.cookie.remove("wen-lembu-address");
    }
    setSuccessTwitterLogin = (value:boolean)=>{
        this.successTwitterLogin = value;
    }
    
    setTwitterUserNameLinkedToAccount = (value:string)=>{
        this.twitterUserNameLinkedToAccount = value;
    }
}