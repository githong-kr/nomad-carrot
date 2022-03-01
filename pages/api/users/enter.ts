import twilio from 'twilio';
import sgMail from '@sendgrid/mail';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import withHandler, { RespnseType } from '@libs/server/withHandler';

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
sgMail.setApiKey(process.env.SG_API_KEY!);

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

  if (phone) {
    // const message = await twilioClient.messages.create({
    //   messagingServiceSid: process.env.TWILIO_SERVICE_SID,
    //   to: process.env.PHONE_NUMBER!,
    //   body: `Your login token is ${payload}`,
    // });
    // console.log(message);
  } else if (email) {
    // console.log(email);
    // const message = await sgMail.send({
    //   to: email,
    //   from: 'githong@kakao.com',
    //   subject: 'Your Carrot Market Verification Email',
    //   text: `Your token is ${payload}`,
    //   html: `<strong>Your token is ${payload}</strong>`,
    // });
    // console.log(message);
  }

  return res.status(200).json({ ok: true });
};

export default withHandler('POST', handler);

// phone # ---> User?
// Token---User
// Token --> SMS ---> phone
// Token ---> Token---User --> Login
