// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { initializeFirebase } from '../../firebase/FirebaseApp';
import { initializeFirestore } from '../../firebase/Firestorage';

export default function handler(req: NextApiRequest, res: NextApiResponse<string>) {
  const app = initializeFirebase();
  initializeFirestore(app);
  res.status(200).json('');
}
