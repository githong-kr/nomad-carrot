import { NextApiRequest, NextApiResponse } from 'next';
import { withApiSession } from '@libs/server/withSession';
import client from '@libs/server/client';
import withHandler, { RespnseType } from '@libs/server/withHandler';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<RespnseType>
) => {
  const { user } = req.session;
  if (req.method === 'GET') {
    const profile = await client.user.findUnique({
      where: { id: user?.id },
    });

    return res.status(200).json({ ok: true, profile });
  } else if (req.method === 'POST') {
    const { name, email, phone } = req.body;

    const currentUser = await client.user.findUnique({
      where: {
        id: user?.id,
      },
      select: {
        email: true,
        phone: true,
        name: true,
      },
    });

    if (email !== currentUser?.email || phone !== currentUser?.phone) {
      const alreadyExists = await client.user.findMany({
        where: {
          NOT: {
            id: user?.id,
          },
          OR: [{ email }, { phone }],
        },
      });

      if (alreadyExists.length !== 0) {
        if (email === alreadyExists[0].email) {
          return res
            .status(401)
            .json({ ok: false, error: 'The email is already taken.' });
        }
        if (phone === alreadyExists[0].phone) {
          return res
            .status(401)
            .json({ ok: false, error: 'The phone is already taken.' });
        }
      }
    }

    if (
      name !== currentUser?.name ||
      email !== currentUser?.email ||
      phone !== currentUser?.phone
    ) {
      await client.user.update({
        data: {
          name,
          email,
          phone,
        },
        where: {
          id: user?.id,
        },
      });
    }

    return res.status(200).json({ ok: true });
  }
};

export default withApiSession(
  withHandler({ methods: ['GET', 'POST'], handler })
);
