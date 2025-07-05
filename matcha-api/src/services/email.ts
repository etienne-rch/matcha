import nodemailer from 'nodemailer';

export const sendValidationEmail = async (to: string, token: string) => {
  let transporter;

  if (process.env.NODE_ENV === 'production') {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
    });
  } else {
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }

  const link = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  const info = await transporter.sendMail({
    from: '"Matcha" <no-reply@matcha.com>',
    to,
    subject: 'Verify your email address',
    html: `<p>Welcome to Matcha! Please verify your email by clicking the link below:</p>
           <a href="${link}">${link}</a>`,
  });

  // En dev : log le lien de prévisualisation Ethereal
  if (process.env.NODE_ENV !== 'production') {
    console.log('📨 Preview URL:', nodemailer.getTestMessageUrl(info));
  }
};
