import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@/styles/globals.css';
import { ThemeProvider } from "./components/theme-provider"
import { persistor, store } from './state/store.ts';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from "redux-persist/integration/react";




ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <PersistGate loading="null" persistor={persistor}>
        <App />
        <ToastContainer />
      </PersistGate>
    </ThemeProvider>
  </Provider>
);
