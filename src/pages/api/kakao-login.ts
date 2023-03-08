import type { NextApiRequest, NextApiResponse } from 'next';
import { Configure } from '../../constant/configure';

type Data = {
  resultCode: string;
};

const getToken = async (code: string) => {
  const { serverAddress, kakaoApiKey } = Configure;
  const requestUrl =
    `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${kakaoApiKey}&` +
    `redirect_uri=${encodeURI(serverAddress + '/api/resist-token')}&code=${code}`;
  console.log(requestUrl);
  const result = await fetch(requestUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  console.log(result);
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
