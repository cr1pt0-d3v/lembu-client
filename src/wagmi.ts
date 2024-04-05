import { mainnet, base, sepolia } from 'wagmi/chains';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'viem';

export const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: import.meta.env.VITE_WC_PROJECT_ID,
  chains: [mainnet, base, sepolia],
  transports: {
    [base.id]: http(
      `https://base-mainnet.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API_KEY}`,
    ),
    [mainnet.id]: http(
      `https://eth-mainnet.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API_KEY}`,
    ),
    [sepolia.id]: http(
      `https://eth-sepholia.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API_KEY}`,
    ),
  },
  ssr: false, // If your dApp uses server side rendering (SSR)
});

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}
