import React from 'react';
import { QueryClient } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import HomeScreen from './view/pages/HomeScreen';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24 // 24 hours
    }
  }
});

const persister = createSyncStoragePersister({
  storage: window.localStorage
});

function App() {
  return (
    <RecoilRoot>
      <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
        <HomeScreen />
      </PersistQueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
