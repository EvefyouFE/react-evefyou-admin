import { AxiosContext, defHttp } from '@/api';
import { QueryClientProvider } from '@tanstack/react-query';
import 'nprogress/nprogress.css';
import React, { useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { MutableSnapshot, RecoilRoot, useRecoilSnapshot } from 'recoil';
import 'virtual:windi.css';
import App from './App';
import { queryClient } from './api';
import './index.less';
import { DEFAULT_APP_STATE, appAtom } from './stores';

const AxiosProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const axiosValue = useMemo(() => {
    return defHttp.getAxios();
  }, []);

  return (
    <AxiosContext.Provider value={axiosValue}>{children}</AxiosContext.Provider>
  );
};

function initializeState({ set }: MutableSnapshot) {
  set(appAtom, DEFAULT_APP_STATE);
}

function DebugObserver(): JSX.Element | null {
  const snapshot = useRecoilSnapshot();
  useEffect(() => {
    console.debug('The following atoms were modified:');
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.info(node.key, snapshot.getLoadable(node));
    }
  }, [snapshot]);

  return null;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AxiosProvider>
      <RecoilRoot initializeState={initializeState} >
          <DebugObserver />
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
      </RecoilRoot>
    </AxiosProvider>
  </React.StrictMode>,
)
