import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import HomeScreen from './view/pages/HomeScreen';

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <HomeScreen />
    </QueryClientProvider>
  );
}

export default App;
