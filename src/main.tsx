import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { worker } from '@/api/mocks/browser';

import App from './App.tsx';

import './index.css';

const start = async () => {
  await worker.start();

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
};

start();
