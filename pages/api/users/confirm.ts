import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import client from '@libs/server/client';
import withHandler, { RespnseType } from '@libs/server/withHandler';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<RespnseType>
) => {
  const { token } = req.body;

  const exists = await client.token.findUnique({
    where: {
      payload: token + '',
    },
  });
  if (!exists) return res.status(404).end();

  req.session.user = { id: exists.userId };
  await req.session.save();
  return res.status(200).json({ ok: true });
};

export default withIronSessionApiRoute(withHandler('POST', handler), {
  cookieName: 'carrotsession',
  password: process.env.COOKIE_PWSD!,
});
