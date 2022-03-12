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
  } = req;

  console.log(user?.id);

  const receivedReviews = await client.review.findMany({
    where: {
      createdForId: user?.id,
    },
    include: {
      createdBy: {
        select: { id: true, name: true, avatar: true },
      },
    },
  });

  return res.status(200).json({ ok: true, receivedReviews });
};

export default withApiSession(withHandler({ methods: ['GET'], handler }));
