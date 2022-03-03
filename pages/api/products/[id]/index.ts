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
  const product = await client.product.findUnique({
    where: {
      id: +id.toString(),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });

  const isFav = Boolean(
    await client.favorite.findFirst({
      where: { userId: user?.id, productId: product?.id },
      select: {
        id: true,
      },
    })
  );

  const terms = product?.name
    .toLowerCase()
    .split(' ')
    .map((word) => ({
      name: {
        contains: word,
      },
    }));

  const relatedProducts = await client.product.findMany({
    where: {
      OR: terms,
      AND: {
        id: {
          not: product?.id,
        },
      },
    },
  });
  return res.status(200).json({ ok: true, product, relatedProducts, isFav });
};

export default withApiSession(withHandler({ methods: ['GET'], handler }));
