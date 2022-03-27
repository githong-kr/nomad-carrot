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
  } = req;

  const stream = await client.stream.findUnique({
    where: {
      id: +id.toString(),
    },
    include: {
      user: {
        select: {
          avatar: true,
        },
      },
      messages: {
        select: {
          message: true,
          id: true,
          userId: true,
          user: {
            select: { avatar: true },
          },
        },
      },
    },
  });

  return res.status(200).json({ ok: true, stream });
};

export default withApiSession(withHandler({ methods: ['GET'], handler }));
