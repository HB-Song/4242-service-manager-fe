import type { NextApiRequest, NextApiResponse } from 'next';
import { decode, JwtPayload } from 'jsonwebtoken';
import { Configure } from '../../constant/configure';
import { hashCode } from '@/util/global-utils';
import { writeData } from '@/firebase/Firestorage';

type kakaoAuthData = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  id_token: string;
  scope: string;
  expires_in: number;
  refresh_token_expires: number;
};

type kakaoIdTokenData = {
  aud: string;
  sub: string;
  auth_time: number;
  iss: string;
  nickname: string;
  exp: number;
  iat: number;
  email: string;
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
  const parsed = decode(resultData.id_token);
  if (!parsed || !(parsed instanceof Object)) {
    throw new Error('Token has wrong data');
  }
  parsed as kakaoIdTokenData;
  const emailHash = hashCode(parsed.email);
  writeData(resultData, `user/${emailHash}`, { merge: true });
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
