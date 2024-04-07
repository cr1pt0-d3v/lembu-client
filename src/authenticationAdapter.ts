import { createAuthenticationAdapter } from '@rainbow-me/rainbowkit';

export const authenticationAdapter = createAuthenticationAdapter({
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
  verify: async ({ message, signature }) => {
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
    return response['succes'] && response['token'] != null;
  },
  signOut: async () => {
    await fetch('/api/logout');
  },
});
