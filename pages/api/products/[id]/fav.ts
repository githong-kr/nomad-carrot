import { NextApiRequest, NextApiResponse } from 'next';
import { withApiSession } from '@libs/server/withSession';
import client from '@libs/server/client';
import withHandler, { RespnseType } from '@libs/server/withHandler';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<RespnseType>
) => {
  const {
    query: { id },
    session: { user },
  } = req;

  const alreadExists = await client.favorite.findFirst({
    where: { userId: user?.id, productId: +id.toString() },
  });

  let isFav;
  if (!alreadExists) {
    isFav = true;
    await client.favorite.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        product: {
          connect: {
            id: +id.toString(),
          },
        },
      },
    });
  } else {
    isFav = false;
    await client.favorite.delete({
      where: {
        id: alreadExists.id,
      },
    });
  }

  return res.status(200).json({ ok: true, isFav });
};

export default withApiSession(withHandler({ methods: ['POST'], handler }));
