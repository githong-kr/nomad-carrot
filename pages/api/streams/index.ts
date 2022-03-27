import { NextApiRequest, NextApiResponse } from 'next';
import { withApiSession } from '@libs/server/withSession';
import client from '@libs/server/client';
import withHandler, { RespnseType } from '@libs/server/withHandler';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<RespnseType>
) => {
  if (req.method === 'POST') {
    const {
      session: { user },
      body: { name, price, description },
    } = req;

    const stream = await client.stream.create({
      data: {
        name,
        price,
        description,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    return res.status(200).json({ ok: true, stream });
  } else if (req.method === 'GET') {
    const {
      query: { page },
    } = req;

    const streams = await client.stream.findMany({
      take: 10,
      skip: 0
    });

    return res.status(200).json({ ok: true, streams });
  }
};

export default withApiSession(
  withHandler({ methods: ['GET', 'POST'], handler })
);
