import { NextApiRequest, NextApiResponse } from 'next';

export interface RespnseType {
  ok: boolean;
  [key: string]: any;
}

const withHandler = (
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  handler: (req: NextApiRequest, res: NextApiResponse) => void
) => {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== method) {
      return res.status(405).end();
    }
    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
};
export default withHandler;
