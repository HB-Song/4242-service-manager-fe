import Head from 'next/head';
import dynamic from 'next/dynamic';
import styles from '@/styles/Home.module.css';
import { Configure } from '@/constant/configure';

const KakaoLoginButtonNoSsr = dynamic(() => import('@/components/button/KakaoLoginButton'), { ssr: false });

export default function Home() {
  const { serverAddress } = Configure;
  const onClickLogin = () => {
    window.Kakao.Auth.authorize({
      redirectUri: serverAddress + '/kakao-login',
    });
  };
  return (
    <>
      <Head>
        <title>Login with Kakao</title>
        <meta name="description" content="Login with Kakao" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <div>
          <KakaoLoginButtonNoSsr buttonSize={'full'} language="ko" onClick={onClickLogin} />
        </div>
      </main>
    </>
  );
}
