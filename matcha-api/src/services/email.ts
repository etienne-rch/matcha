import nodemailer, { Transporter } from 'nodemailer';

const isProduction = process.env.NODE_ENV === 'production';
const APP_NAME = process.env.APP_NAME || 'Matcha';
const SMTP_USER = process.env.SMTP_USER || 'no-reply@matcha.com';
const API_URL = process.env.API_URL || 'http://localhost:3000';
const FRONTEND_URL = process.env.FRONTEND_URL;

const getTransporter = async (): Promise<Transporter> => {
  if (isProduction) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
    });
  }
  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: { user: testAccount.user, pass: testAccount.pass },
  });
};

const logPreviewUrl = (info: any): void => {
  if (!isProduction) {
    console.log('📨 Preview URL:', nodemailer.getTestMessageUrl(info));
  }
};

export const sendValidationEmail = async (
  to: string,
  token: string,
): Promise<void> => {
  const transporter = await getTransporter();
  const link = `${API_URL}/api/users/verify-email?token=${token}`;
  const info = await transporter.sendMail({
    from: `"${APP_NAME}" <${SMTP_USER}>`,
    to,
    subject: 'Verify your email address',
    html: `<p>Welcome to ${APP_NAME}! Please verify your email by clicking the link below:</p>
           <a href="${link}">${link}</a>`,
  });
  logPreviewUrl(info);
};

export const sendResetPasswordEmail = async (
  to: string,
  token: string,
): Promise<void> => {
  const transporter = await getTransporter();
  const resetLink = `${FRONTEND_URL}/reset-password?token=${token}`;

  const info = await transporter.sendMail({
    from: `"${APP_NAME}" <${SMTP_USER}>`,
    to,
    subject: 'Réinitialisation de votre mot de passe',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">Matcha</h1>
          </div>
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #667eea; margin-top: 0;">Réinitialisation de mot de passe</h2>
            <p>Bonjour,</p>
            <p>Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le bouton ci-dessous pour définir un nouveau mot de passe :</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        color: white; 
                        padding: 15px 30px; 
                        text-decoration: none; 
                        border-radius: 5px; 
                        display: inline-block;
                        font-weight: bold;">
                Réinitialiser mon mot de passe
              </a>
            </div>
            <p style="color: #666; font-size: 14px;">
              Ce lien est valide pendant 15 minutes.
            </p>
            <p style="color: #666; font-size: 14px;">
              Si vous n'avez pas demandé cette réinitialisation, vous pouvez ignorer cet email en toute sécurité.
            </p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            <p style="color: #999; font-size: 12px; text-align: center;">
              Si le bouton ne fonctionne pas, copiez et collez ce lien dans votre navigateur :<br>
              <a href="${resetLink}" style="color: #667eea;">${resetLink}</a>
            </p>
          </div>
        </body>
      </html>
    `,
    text: `
Réinitialisation de mot de passe

Vous avez demandé à réinitialiser votre mot de passe.

Cliquez sur ce lien pour définir un nouveau mot de passe (valide 15 minutes) :
${resetLink}

Si vous n'avez pas demandé cette réinitialisation, vous pouvez ignorer cet email en toute sécurité.
    `,
  });

  logPreviewUrl(info);
};

export const sendEmailChangeVerification = async (
  to: string,
  token: string,
): Promise<void> => {
  const transporter = await getTransporter();

  const link = `${API_URL}/api/users/verify-email?token=${token}`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">Matcha</h1>
        </div>
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #2575fc; margin-top: 0;">Confirme ton changement d'adresse email</h2>

          <p>Tu as demandé à modifier ton adresse email associée à ton compte Matcha.</p>

          <p>Clique sur le bouton ci-dessous pour confirmer cette modification :</p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${link}"
               style="background: #2575fc;
                      color: white;
                      padding: 14px 24px;
                      text-decoration: none;
                      border-radius: 5px;
                      display: inline-block;
                      font-weight: bold;">
              Confirmer mon nouvel email
            </a>
          </div>

          <p style="color: #666; font-size: 14px;">
            Ce lien est valable pendant 15 minutes pour des raisons de sécurité.
          </p>

          <p style="color: #666; font-size: 14px;">
            Si tu n'es pas à l'origine de cette demande, tu peux ignorer cet email en toute sécurité.
          </p>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;" />

          <p style="color: #999; font-size: 12px; text-align: center;">
            Si le bouton ne fonctionne pas, copie et colle ce lien dans ton navigateur :<br />
            <a href="${link}" style="color: #2575fc;">${link}</a>
          </p>
        </div>
      </body>
    </html>
  `;

  const info = await transporter.sendMail({
    from: `"${APP_NAME}" <${SMTP_USER}>`,
    to,
    subject: 'Confirme ton changement d’adresse email',
    html,
  });

  logPreviewUrl(info);
};
