import { Buffer } from 'buffer';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { MainStore } from "./store/main-store";
import { StoreProvider } from "./store/store-provider";

import './index.css';


import '@rainbow-me/rainbowkit/styles.css';
import Main2 from './main2.tsx';


globalThis.Buffer = Buffer;


const mainStore = new MainStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <StoreProvider value={mainStore}>
    <Main2/>
    </StoreProvider>
  </React.StrictMode>,
);
