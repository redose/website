import 'bootstrap/dist/css/bootstrap.css';
import type { AppProps } from 'next/app';
import type { FC } from 'react';
import ToastProvider from '../components/providers/toast';
import RedoseApiInterceptors from '../components/redose-api-interceptors';
import PageLayout from '../components/page-layout';

const MyApp: FC<AppProps> = function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <ToastProvider>
      <RedoseApiInterceptors />
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </ToastProvider>
  );
};

export default MyApp;
