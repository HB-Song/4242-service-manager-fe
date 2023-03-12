import type { NextApiRequest, NextApiResponse } from 'next';
import { Configure } from '../../constant/configure';

type kakaoAuthData = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  id_token: string;
  scope: string;
  expires_in: number;
  refresh_token_expires: number;
};

const getToken = async (code: string) => {
  const { serverAddress, kakaoApiKey } = Configure;
  const requestUrl =
    `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${kakaoApiKey}` +
    `&code=${code}&redirect_uri=${encodeURI(
      serverAddress + '/kakao-login'
    )}&client_secret=MX0yb9eHslUX2P89IuXDhaGR3FkKz4U5`;
  const result = await fetch(requestUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const resultData: kakaoAuthData = await result.json();
};

export default function handler(req: NextApiRequest, res: NextApiResponse<string>) {
  const { code } = req.query;
  if (code) {
    getToken(code as string);
    res.status(200).json('');
  } else {
    throw `Can't found Authcode`;
  }
}
