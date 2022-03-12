import { NextApiRequest, NextApiResponse } from 'next';
import { withApiSession } from '@libs/server/withSession';
import client from '@libs/server/client';
import withHandler, { RespnseType } from '@libs/server/withHandler';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<RespnseType>
) => {
  if (req.method === 'GET') {
    const {
      query: { latitude, longitude },
    } = req;

    const parsedLatitudeNumber = parseFloat(latitude.toString());
    const parsedLongitudeNumber = parseFloat(longitude.toString());

    const posts = await client.post.findMany({
      include: {
        user: { select: { name: true } },
        _count: { select: { wonderings: true, answers: true } },
      },
      where: {
        latitude: {
          gte: parsedLatitudeNumber - 0.01,
          lte: parsedLatitudeNumber + 0.01,
        },
        longitude: {
          gte: parsedLongitudeNumber - 0.01,
          lte: parsedLongitudeNumber + 0.01,
        },
      },
    });
    return res.status(200).json({ ok: true, posts });
  } else if (req.method === 'POST') {
    const {
      body: { question, latitude, longitude },
      session: { user },
    } = req;

    const post = await client.post.create({
      data: {
        question,
        latitude,
        longitude,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    return res.status(200).json({ ok: true, post });
  }
};

export default withApiSession(
  withHandler({ methods: ['POST', 'GET'], handler })
);
