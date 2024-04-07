import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Buffer } from 'buffer';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { WagmiProvider } from 'wagmi';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App.tsx';
import { config } from './wagmi.ts';

import './index.css';

import {
  RainbowKitAuthenticationProvider,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { authenticationAdapter } from './authenticationAdapter.ts';

globalThis.Buffer = Buffer;

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitAuthenticationProvider
          adapter={authenticationAdapter}
          status={'authenticated'}
        >
          <RainbowKitProvider
            theme={darkTheme({
              accentColor: '#e20990',
              accentColorForeground: 'white',
              borderRadius: 'large',
              fontStack: 'system',
              overlayBlur: 'small',
            })}
            appInfo={{
              appName: '$LEMBU',
            }}
          >
            <ChakraProvider>
              <Router>
                <App />
              </Router>
            </ChakraProvider>
          </RainbowKitProvider>
        </RainbowKitAuthenticationProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
);
