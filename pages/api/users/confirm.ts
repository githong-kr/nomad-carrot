import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import withHandler, { RespnseType } from '@libs/server/withHandler';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<RespnseType>
) => {
  const { token } = req.body;
  console.log(token);
  return res.status(200).json({ ok: true });
};

export default withHandler('POST', handler);
