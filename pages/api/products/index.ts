import { NextApiRequest, NextApiResponse } from 'next';
import { withApiSession } from '@libs/server/withSession';
import client from '@libs/server/client';
import withHandler, { RespnseType } from '@libs/server/withHandler';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<RespnseType>
) => {
  if (req.method === 'GET') {
    const products = await client.product.findMany({
      include: {
        _count: {
          select: {
            records: true,
          },
        },
      },
    });
    return res.status(200).json({ ok: true, products });
  }

  if (req.method === 'POST') {
    const {
      body: { image, name, price, description },
      session: { user },
    } = req;
    const product = await client.product.create({
      data: {
        image: 'xx',
        name,
        price: +price,
        description,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    return res.status(200).json({ ok: true, product });
  }
};

export default withApiSession(
  withHandler({ methods: ['POST', 'GET'], handler })
);
