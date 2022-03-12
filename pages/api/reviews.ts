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

  const userData = await client.user.findUnique({
    where: {
      id: user?.id,
    },
    select: {
      id: true,
      name: true,
      avatar: true,
    },
  });

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

  return res.status(200).json({ ok: true, userData, receivedReviews });
};

export default withApiSession(withHandler({ methods: ['GET'], handler }));
