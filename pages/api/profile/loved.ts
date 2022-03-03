import { NextApiRequest, NextApiResponse } from 'next';
import { withApiSession } from '@libs/server/withSession';
import client from '@libs/server/client';
import withHandler, { RespnseType } from '@libs/server/withHandler';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<RespnseType>
) => {
  const { user } = req.session;

  const favProducts = await client.favorite.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      product: {
        select: {
          image: true,
          name: true,
          price: true,
        },
      },
    },
  });

  return res.status(200).json({ ok: true, favProducts });
};

export default withApiSession(withHandler({ methods: ['GET'], handler }));
