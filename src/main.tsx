/*
 * @Author: EvefyouFE
 * @Date: 2023-07-15 00:14:35
 * @FilePath: \react-evefyou-admin\src\main.tsx
 * @Description:
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved.
 */
import RecoilNexus from 'recoil-nexus';
import { QueryClientProvider } from '@tanstack/react-query';
import 'nprogress/nprogress.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import 'virtual:windi.css';
import App from './App';
import { queryClient } from '@/api/query';
import './index.less';
import { AxiosProvider } from './api/request/AxiosProvider';
import { DebugObserver, initializeState } from './stores';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AxiosProvider>
      <RecoilRoot initializeState={initializeState}>
        <RecoilNexus />
        <DebugObserver />
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </RecoilRoot>
    </AxiosProvider>
  </React.StrictMode>,
);
