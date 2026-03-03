import { Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';

import App from '@containers/app';
import i18n from '@i18n/index';

import ReactDOM from 'react-dom/client';
import '@assets/css/main.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <I18nextProvider i18n={i18n}>
      <Suspense fallback='loading...'>
        <App />
      </Suspense>
    </I18nextProvider>,
  );
} else {
  console.error('Root element not found');
}
