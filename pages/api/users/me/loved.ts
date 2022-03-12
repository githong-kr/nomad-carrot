import { NextApiRequest, NextApiResponse } from 'next';
import { withApiSession } from '@libs/server/withSession';
import client from '@libs/server/client';
import withHandler, { RespnseType } from '@libs/server/withHandler';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<RespnseType>
) => {
  const { user } = req.session;

  const loved = await client.favorite.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      product: {
        select: {
          image: true,
          name: true,
          price: true,
          _count: {
            select: {
              favorites: true,
            },
          },
        },
      },
    },
  });

  return res.status(200).json({ ok: true, loved });
};

export default withApiSession(withHandler({ methods: ['GET'], handler }));
