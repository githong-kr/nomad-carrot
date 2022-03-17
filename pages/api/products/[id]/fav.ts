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

  const alreadExists = await client.record.findFirst({
    where: { userId: user?.id, productId: +id.toString(), kind: 'Favorite' },
  });

  let isFav;
  if (!alreadExists) {
    isFav = true;
    await client.record.create({
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
        kind: 'Favorite',
      },
    });
  } else {
    isFav = false;
    await client.record.delete({
      where: {
        id: alreadExists.id,
      },
    });
  }

  return res.status(200).json({ ok: true, isFav });
};

export default withApiSession(withHandler({ methods: ['POST'], handler }));
