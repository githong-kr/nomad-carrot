import { NextApiRequest, NextApiResponse } from 'next';
import { withApiSession } from '@libs/server/withSession';
import client from '@libs/server/client';
import withHandler, { RespnseType } from '@libs/server/withHandler';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<RespnseType>
) => {
  const profile = await client.user.findUnique({
    where: { id: req.session.user?.id },
  });
  return res.status(200).json({ ok: true, profile });
};

export default withApiSession(withHandler({ methods: ['GET'], handler }));
