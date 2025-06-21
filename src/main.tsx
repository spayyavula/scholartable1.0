import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { AccessibilityProvider } from './components/A11y/AccessibilityProvider';
import App from './App.tsx';
import './polyfills.ts'; // Import polyfills first
import './index.css';

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AccessibilityProvider>
      <App />
    </AccessibilityProvider>
  </StrictMode>
);
