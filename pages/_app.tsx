import { GoogleOAuthProvider } from '@react-oauth/google';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

import '../styles/globals.css';
import { ScrollRestorer } from '../utils/ScrollRestorer';

function MyApp({ Component, pageProps }: AppProps) {
  const [isSSR, setIsSSR] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;

  return (
    <GoogleOAuthProvider
      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
    >
      <div className="xl:w-[1200px] m-auto">
        <Navbar />
        <div className="flex gap-6 md:gap-20 mt-[70px]">
          <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto scrollbar-hide sticky top-[70px]">
            <Sidebar />
          </div>
          <div className="mt-4 flex flex-col gap-10 videos flex-1 pr-3">
            <ScrollRestorer />
            <Component {...pageProps} key={router.asPath} />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default MyApp;
