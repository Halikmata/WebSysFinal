import { AppProps } from 'next/app';
import { UserProvider } from '../src/context/UserContext';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
};

export default MyApp;