import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { useStore } from './store/use-store.ts';
import { observer } from 'mobx-react-lite';
import App from './App.tsx';
import { config } from './wagmi.ts';

import { ChakraProvider } from '@chakra-ui/react';
import { WagmiProvider } from 'wagmi';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  RainbowKitAuthenticationProvider,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';
const queryClient = new QueryClient();

const MainApp = observer(() => {
  const store = useStore();
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitAuthenticationProvider
          adapter={store.getAuthenticationAdapter()}
          status={store.authStatus}
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
  );
});
export default MainApp;
