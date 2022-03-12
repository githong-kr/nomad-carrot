import { NextApiRequest, NextApiResponse } from 'next';
import { withApiSession } from '@libs/server/withSession';
import client from '@libs/server/client';
import withHandler, { RespnseType } from '@libs/server/withHandler';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<RespnseType>
) => {
  const {
    body: { answer, postId },
    session: { user },
  } = req;

  const answerData = await client.answer.create({
    data: {
      answer,
      post: {
        connect: {
          id: postId,
        },
      },
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });

  return res.status(200).json({ ok: true, answerData });
};

export default withApiSession(withHandler({ methods: ['POST'], handler }));
