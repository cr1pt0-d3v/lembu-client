import { Buffer } from 'buffer';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { MainStore } from './store/main-store';
import { StoreProvider } from './store/store-provider';

import './index.css';

import '@rainbow-me/rainbowkit/styles.css';
import MainApp from './MainApp.tsx';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from './wagmi.ts';
globalThis.Buffer = Buffer;

const mainStore = new MainStore();
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <StoreProvider value={mainStore}>
          <MainApp />
        </StoreProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
);
