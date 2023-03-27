import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import Script from 'next/script';
import { Configure } from '../constant/configure';

import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const { kakaoIntegryValue, applicationKey } = Configure;

  const initKakao = () => {
    window.Kakao.init(applicationKey);
    console.log('Check Kakao Initialized : ', window.Kakao.isInitialized());
  };

  useEffect(() => {
    fetch(`/api/init-firebase`, { method: 'GET' });
  }, []);

  return (
    <>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js"
        integrity={kakaoIntegryValue}
        onLoad={initKakao}
        crossOrigin="anonymous"
      ></Script>
    </>
  );
}
