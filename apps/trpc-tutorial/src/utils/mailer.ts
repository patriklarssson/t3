import nodeMailer from 'nodemailer';

export async function sendLoginEmail({
  email,
  url,
  token,
}: {
  email: string;
  url: string;
  token: string;
}) {
  const testAccount = await nodeMailer.createTestAccount();

  const transporter = nodeMailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

 const info = await transporter.sendMail({
    from: '"Jane doe" <J.Doe@example.com>',
    to: email,
    subject: 'Login to your account',
    html: `Login by clicking here <a href="${url}/login#token=${token}>`,
  });

  console.log(`Preview URL: ${nodeMailer.getTestMessageUrl(info)}`);


}
