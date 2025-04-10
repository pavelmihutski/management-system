import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { worker } from '@/api/mocks/browser';

import App from './app/App.tsx';

const start = async () => {
  await worker.start({
    serviceWorker: {
      url: '/management-system/mockServiceWorker.js',
    },
  });

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
};

start();
