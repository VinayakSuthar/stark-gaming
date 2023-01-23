import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SkeletonTheme } from 'react-loading-skeleton';
import { QueryClientProvider, QueryClient } from 'react-query';

import App from './App';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <SkeletonTheme baseColor="#171a21" highlightColor="#040f14">
          <App />
        </SkeletonTheme>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
