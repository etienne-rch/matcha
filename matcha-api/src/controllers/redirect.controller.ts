import { Request, Response } from 'express';

const HTML_STYLES = `
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      padding: 50px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .container {
      background: white;
      color: #333;
      padding: 40px;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      max-width: 500px;
    }
    h1 { color: #667eea; margin-bottom: 20px; }
    .spinner {
      border: 4px solid #f3f3f3;
      border-top: 4px solid #667eea;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
      margin: 20px auto;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .button {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 15px 30px;
      text-decoration: none;
      border-radius: 5px;
      margin: 10px;
      font-weight: bold;
    }
    .button:hover { opacity: 0.9; }
    .instructions {
      margin-top: 30px;
      padding-top: 30px;
      border-top: 1px solid #ddd;
      font-size: 14px;
      color: #666;
    }
  </style>
`;

const renderErrorPage = (): string => `
  <!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Token manquant</title>
    ${HTML_STYLES}
  </head>
  <body>
    <div class="container">
      <h1>❌ Token manquant</h1>
      <p>Le lien de réinitialisation est invalide.</p>
      <p>Veuillez demander un nouveau lien depuis l'application.</p>
    </div>
  </body>
  </html>
`;

const renderRedirectPage = (
  token: string,
  deepLink: string,
  expLink: string,
): string => `
  <!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redirection vers Matcha</title>
    ${HTML_STYLES}
    <script>
      function redirectToApp() {
        window.location.href = '${deepLink}';
        
        setTimeout(() => {
          document.getElementById('message').innerHTML = 
            'Tentative de redirection avec Expo Go...';
          window.location.href = '${expLink}';
        }, 2000);
        
        setTimeout(() => {
          document.getElementById('loading').style.display = 'none';
          document.getElementById('manual').style.display = 'block';
        }, 5000);
      }
      
      window.onload = redirectToApp;
    </script>
  </head>
  <body>
    <div class="container">
      <h1>🔄 Redirection en cours...</h1>
      
      <div id="loading">
        <div class="spinner"></div>
        <p id="message">Ouverture de l'application Matcha...</p>
      </div>
      
      <div id="manual" style="display: none;">
        <p><strong>L'application ne s'est pas ouverte automatiquement ?</strong></p>
        <p>Cliquez sur l'un des boutons ci-dessous :</p>
        
        <a href="${deepLink}" class="button">Ouvrir Matcha</a>
        <a href="${expLink}" class="button">Ouvrir avec Expo Go</a>
        
        <div class="instructions">
          <p><strong>Instructions :</strong></p>
          <ol style="text-align: left;">
            <li>Si vous avez installé l'application Matcha, utilisez le premier bouton</li>
            <li>Si vous utilisez Expo Go pour le développement, utilisez le second bouton</li>
            <li>Si aucun ne fonctionne, copiez le token et collez-le manuellement dans l'application</li>
          </ol>
          <p style="word-break: break-all; background: #f5f5f5; padding: 10px; border-radius: 5px;">
            <strong>Token:</strong> ${token}
          </p>
        </div>
      </div>
    </div>
  </body>
  </html>
`;

/**
 * Page HTML de redirection vers l'application mobile
 * Utilisée comme fallback si le deep link ne fonctionne pas directement depuis l'email
 */
export const redirectToApp = (req: Request, res: Response): void => {
  const { token } = req.query;

  if (!token || typeof token !== 'string') {
    res.status(400).send(renderErrorPage());
    return;
  }

  const deepLink = `matcha://reset-password?token=${token}`;
  const expLink = `exp://192.168.1.1:8081/--/reset-password?token=${token}`;

  res.send(renderRedirectPage(token, deepLink, expLink));
};
