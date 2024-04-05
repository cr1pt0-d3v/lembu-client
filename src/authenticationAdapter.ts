import { createAuthenticationAdapter } from '@rainbow-me/rainbowkit';
import { SiweMessage } from 'siwe';

export const authenticationAdapter = createAuthenticationAdapter({
  getNonce: async () => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/nonce`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chainId: 1,
        address: '0xEc5Ac2E77B5FEAe03fFC100F1209341B35054505',
      }),
    });
    // const parsedResponse = await JSON.parse(await response.text());
    return await JSON.parse(await response.text());
  },
  createMessage: ({ nonce, address, chainId }) => {
    return new SiweMessage({
      domain: window.location.host,
      address,
      statement: 'Sign in with Ethereum to the app.',
      uri: window.location.origin,
      version: '1',
      chainId,
      nonce,
    });
  },
  getMessageBody: ({ message }) => {
    return message.prepareMessage();
  },
  verify: async ({ message, signature }) => {
    const verifyRes = await fetch(
      `https://lembu-app-malup.ondigitalocean.app/api/verify`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, signature }),
      },
    );
    return Boolean(verifyRes.ok);
  },
  signOut: async () => {
    await fetch('/api/logout');
  },
});
