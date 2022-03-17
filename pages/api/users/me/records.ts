import { NextApiRequest, NextApiResponse } from 'next';
import { withApiSession } from '@libs/server/withSession';
import client from '@libs/server/client';
import withHandler, { RespnseType } from '@libs/server/withHandler';
import { Kind } from '@prisma/client';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<RespnseType>
) => {
  const {
    session: { user },
    query: { kind },
  } = req;

  const records = await client.record.findMany({
    where: {
      userId: user?.id,
      kind: kind.toString() as Kind,
    },
    include: {
      product: {
        select: {
          image: true,
          name: true,
          price: true,
          _count: {
            select: {
              records: true,
            },
          },
        },
      },
    },
  });

  return res.status(200).json({ ok: true, records });
};

export default withApiSession(withHandler({ methods: ['GET'], handler }));
