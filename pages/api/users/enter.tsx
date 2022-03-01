import { NextApiRequest, NextApiResponse } from 'next';

import client from '@libs/server/client';
import withHandler, { RespnseType } from '@libs/server/withHandler';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<RespnseType>
) => {
  const { email, phone } = req.body;
  const user = phone ? { phone } : email ? { email } : null;
  if (!user) {
    return res.status(400).json({ ok: false });
  }

  const payload = Math.floor(Math.random() * 1000000) + '';
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: 'Anonymous',
            ...user,
          },
        },
      },
    },
  });

  return res.status(200).json({ ok: true });
};

export default withHandler('POST', handler);

// phone # ---> User?
// Token---User
// Token --> SMS ---> phone
// Token ---> Token---User --> Login
