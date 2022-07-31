import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import HomeScreen from './view/pages/HomeScreen';

function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={new QueryClient()}>
        <HomeScreen />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
