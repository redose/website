import 'bootstrap/dist/css/bootstrap.css';
import type { AppProps } from 'next/app';
import type { FC } from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';
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
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </ThemeProvider>
  );
};

export default MyApp;
