// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

interface accessTokenResult extends NextApiRequest {
  body: {
    token_type: string;
    access_token: string;
    id_token: string;
    expires_in: number;
    refresh_token: string;
    refresh_token_expires_in: number;
    scope: string;
  };
}

export default function handler(req: accessTokenResult, res: NextApiResponse<accessTokenResult['body']>) {
  const { token_type, access_token, id_token, expires_in, refresh_token, refresh_token_expires_in, scope } = req.body;

  res.status(200).json(req.body);
}
