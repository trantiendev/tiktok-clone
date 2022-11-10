// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../utils/client';
import { firstFeedPosts } from '../../../utils/queries'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const query = firstFeedPosts();
    const data = await client.fetch(query);

    res.status(200).json(data);
  }
}
