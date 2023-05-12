import 'bootstrap/dist/css/bootstrap.css';
import type { AppProps } from 'next/app';
import type { FC } from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import ToastProvider from '../components/providers/toast';
import RedoseApiInterceptors from '../components/redose-api-interceptors';
import PageLayout from '../components/page-layout';

const theme: DefaultTheme = {
  colors: {
    primary: '#111',
    secondary: 'cornsilk',
  },
};

const MyApp: FC<AppProps> = function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <RedoseApiInterceptors />
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default MyApp;
