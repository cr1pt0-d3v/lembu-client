import { observable, action, runInAction, makeObservable } from "mobx";
import { createAuthenticationAdapter,AuthenticationStatus } from '@rainbow-me/rainbowkit';
import Cookies from "universal-cookie";

export class MainStore {
  lembuToken: string = "";
  authStatus: AuthenticationStatus;
  isLoggedIn: boolean = false;
  accountNotLinked:boolean = false;
  modalContinueCallback: () => void = () => {};
  cookie: Cookies;
  constructor() {
    makeObservable(this, {
     
      isLoggedIn: observable,
      authStatus:observable,
      getAuthenticationAdapter: action,
      verifyAuthentication: action,
      setAuthenticatedStatus: action,
      setAccountNotLinked:action
      
    });
   this.authStatus = 'unauthenticated';
   this.cookie = new Cookies(null, { path: '/' });
    this.initData();
  }
  
  initData = async () => {
   var token = this.cookie.get("wen-lembu-token");
   var address = this.cookie.get("wen-lembu-address");
   if(token != null && token != ''){
        const tokenResponse = await fetch(`${import.meta.env.VITE_SERVER_URL}/vaidateToken`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token,address }),
          });
          const response = JSON.parse(await tokenResponse.text());
          if(response["succes"]){
            this.setAuthenticatedStatus('authenticated');
            this.lembuToken = token;
        this.setIsLoggedIn(true);
          } else {
            this.setAuthenticatedStatus('unauthenticated')
        this.setIsLoggedIn(false);
        this.cookie.remove("wen-lembu-token");
          }
   }
  }; 

  getAuthenticationAdapter =()=>{ 
    return createAuthenticationAdapter({
    getNonce: async () => {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/nonce`);
      const parsedResponse = JSON.parse(await response.text())['nonce'];
      return parsedResponse;
    },
    createMessage: ({ nonce, address, chainId }) => {
      return `${window.location.origin} wants you to sign in with your account: ${address}, Sign in with Ethereum to the app, Chain ID: ${chainId}, Nonce: ${nonce}`;
    },
    getMessageBody: ({ message }) => {
      return message;
    },
    verify: async (a) => this.verifyAuthentication(a),
    signOut: async () => {
      await fetch('/api/logout');
      this.setAuthenticatedStatus('unauthenticated')
      this.setIsLoggedIn(false);
      this.cookie.remove("wen-lembu-token");
    },
  })


};

  async verifyAuthentication({ message, signature }){
    //regex for eth wallet address
    const regex = /(0x[a-fA-F0-9]{40})/;
  
    // Extract wallet address using match() method
    const matches = message.match(regex);

    // If matches are found, extract the first match (wallet address)
    const address = matches ? matches[0] : null;

    const verifyRes = await fetch(`${import.meta.env.VITE_SERVER_URL}/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, signature, address }),
    });
    const response = JSON.parse(await verifyRes.text());
    if(response['succes'] && response['token'] != null){
        const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours()+1);
        this.lembuToken = response['token'];
        this.setAccountNotLinked(response["twitterHandler"]==null);
        this.cookie.set("wen-lembu-token", this.lembuToken, { expires: expirationDate });
        this.cookie.set("wen-lembu-address", response["address"], { expires: expirationDate });
        this.setAuthenticatedStatus('authenticated')
        this.setIsLoggedIn(true);
    }
    return response['succes'] && response['token'] != null;
  }
setAuthenticatedStatus(status:AuthenticationStatus){
    this.authStatus = status 
 }

 setAccountNotLinked(value:boolean){
this.accountNotLinked = value;
 }
  setIsLoggedIn(value: boolean) {
    this.isLoggedIn = value;
   
    if (!value) {
        this.setAuthenticatedStatus('unauthenticated');
    } else {
      //this.loggOut(false);
    }
  }

  handleLogin = async () => {
    
    // Redirect to the backend endpoint that initiates the Twitter OAuth process
    //window.location.href = 'https://localhost:5050/auth/twitter';
    try {
      const response = await fetch('https://localhost:5050/auth/twitter', {
        method: 'GET',
        headers: {
          'x-lembu-token': this.lembuToken,
          // Add any other headers needed for your request
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Assuming the response contains the URL to redirect to
      const responseData = await response.json();
      const redirectUrl = responseData.redirectUrl;

      // Redirect the user
      window.location.href = redirectUrl;
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error, maybe show an error message to the user
    }
  };
}
