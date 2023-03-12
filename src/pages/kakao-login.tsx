import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Configure } from '@/constant/configure';

export default function Home() {
  const router = useRouter();
  const { code, error, error_description } = router.query;
  const { serverAddress, kakaoApiKey } = Configure;

  useEffect(() => {
    const getToken = async () => {
      await fetch(`/api/kakao-login?code=${code}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
    };

    if (code) {
      getToken();
    }
  }, [code, kakaoApiKey, serverAddress]);

  return (
    <>
      <Head>
        <title>Login with Kakao</title>
        <meta name="description" content="Login with Kakao" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        {error ? (
          <>
            <div>{error}</div> <div>{error_description}</div>
          </>
        ) : (
          <div>kakao login process</div>
        )}
      </main>
    </>
  );
}
