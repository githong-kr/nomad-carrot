import { NextApiRequest, NextApiResponse } from 'next';
import { withApiSession } from '@libs/server/withSession';
import client from '@libs/server/client';
import withHandler, { RespnseType } from '@libs/server/withHandler';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<RespnseType>
) => {
  const {
    session: { user },
    query: { id },
    body: { message },
  } = req;

  const createdMessage = await client.message.create({
    data: {
      message,
      user: {
        connect: {
          id: user?.id,
        },
      },
      stream: {
        connect: {
          id: +id.toString(),
        },
      },
    },
  });

  return res.status(200).json({ ok: true, createdMessage });
};

export default withApiSession(withHandler({ methods: ['POST'], handler }));
