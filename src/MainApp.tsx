import { useStore } from './store/use-store.ts';
import { observer } from 'mobx-react-lite';
import App from './App.tsx';

import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  RainbowKitAuthenticationProvider,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';

const MainApp = observer(() => {
  const store = useStore();
  return (
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
  );
});
export default MainApp;
