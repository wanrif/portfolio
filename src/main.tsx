import i18n from '@i18n/index';
import store, { persistor } from '@stores/configureStore';
import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from '@containers/app';

import '@assets/css/main.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <I18nextProvider i18n={i18n}>
          <Suspense fallback='loading...'>
            <App />
          </Suspense>
        </I18nextProvider>
      </PersistGate>
    </Provider>
  );
} else {
  console.error('Root element not found');
}
