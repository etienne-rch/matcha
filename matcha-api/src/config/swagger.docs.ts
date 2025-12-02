/**
 * Documentation Swagger centralisée pour l'API Matcha
 *
 * Ce fichier contient toutes les définitions Swagger/OpenAPI pour l'API.
 * Format: JSDoc avec annotations @swagger
 */

export const swaggerDocs = {
  // ==================== HEALTH ====================
  health: `
/**
 * @swagger
 * /health:
 *   get:
 *     summary: Vérifier l'état de santé de l'API
 *     tags: [Health]
 *     security: []
 *     responses:
 *       200:
 *         description: L'API fonctionne correctement
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 uptime:
 *                   type: number
 *                   example: 12345.67
 */
`,

  // ==================== AUTH ====================
  authLogin: `
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Authentification utilisateur
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *       401:
 *         description: Identifiants invalides
 *       400:
 *         description: Données de requête invalides
 */
`,

  authRequestReset: `
/**
 * @swagger
 * /api/auth/request-reset:
 *   post:
 *     summary: Demande de réinitialisation du mot de passe
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Email de réinitialisation envoyé
 *       400:
 *         description: Données invalides
 */
`,

  authResetPassword: `
/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Réinitialiser le mot de passe
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - password
 *             properties:
 *               token:
 *                 type: string
 *                 example: reset-token-here
 *               password:
 *                 type: string
 *                 format: password
 *                 example: newPassword123
 *     responses:
 *       200:
 *         description: Mot de passe réinitialisé avec succès
 *       400:
 *         description: Token invalide ou expiré
 */
`,

  // ==================== USERS ====================
  usersCreate: `
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Créer un nouveau utilisateur
 *     tags: [Users]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - firstName
 *               - lastName
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: newuser@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: SecurePass123!
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Données invalides
 *       409:
 *         description: L'utilisateur existe déjà
 */
`,

  usersVerifyEmail: `
/**
 * @swagger
 * /api/users/verify-email:
 *   get:
 *     summary: Vérifier l'email de l'utilisateur
 *     tags: [Users]
 *     security: []
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de vérification d'email
 *     responses:
 *       200:
 *         description: Email vérifié avec succès
 *       400:
 *         description: Token invalide ou expiré
 */
`,

  usersGetById: `
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Récupérer un utilisateur par son ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 email:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *       404:
 *         description: Utilisateur non trouvé
 *       401:
 *         description: Non authentifié
 */
`,

  // ==================== PROFILE ====================
  profileGet: `
/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Récupérer le profil de l'utilisateur connecté
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profil récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 email:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 bio:
 *                   type: string
 *                 location:
 *                   type: string
 *                 skills:
 *                   type: array
 *                   items:
 *                     type: string
 *       401:
 *         description: Non authentifié
 */
`,

  profileUpdate: `
/**
 * @swagger
 * /api/profile:
 *   patch:
 *     summary: Mettre à jour le profil de l'utilisateur
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               bio:
 *                 type: string
 *                 example: Développeur passionné
 *               location:
 *                 type: string
 *                 example: Paris, France
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["JavaScript", "TypeScript", "React"]
 *     responses:
 *       200:
 *         description: Profil mis à jour avec succès
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non authentifié
 */
`,

  profileChangePassword: `
/**
 * @swagger
 * /api/profile/change-password:
 *   post:
 *     summary: Changer le mot de passe de l'utilisateur
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 format: password
 *                 example: oldPassword123
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 example: newPassword456
 *     responses:
 *       200:
 *         description: Mot de passe changé avec succès
 *       400:
 *         description: Mot de passe actuel incorrect
 *       401:
 *         description: Non authentifié
 */
`,

  profileDeleteAccount: `
/**
 * @swagger
 * /api/profile/account:
 *   delete:
 *     summary: Supprimer le compte utilisateur
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Compte supprimé avec succès
 *       401:
 *         description: Non authentifié
 */
`,

  // ==================== PERSONALITY ====================
  personalityGetActive: `
/**
 * @swagger
 * /api/personality/active:
 *   get:
 *     summary: Récupérer le test de personnalité actif
 *     tags: [Personality]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Test de personnalité récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                   example: Test de personnalité MBTI
 *                 description:
 *                   type: string
 *                 questions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       question:
 *                         type: string
 *                       options:
 *                         type: array
 *                         items:
 *                           type: string
 *                 isActive:
 *                   type: boolean
 *       404:
 *         description: Aucun test actif trouvé
 *       401:
 *         description: Non authentifié
 */
`,

  personalitySubmit: `
/**
 * @swagger
 * /api/personality/submit:
 *   post:
 *     summary: Soumettre les réponses au test de personnalité
 *     tags: [Personality]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - testId
 *               - answers
 *             properties:
 *               testId:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *               answers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionId:
 *                       type: string
 *                     answer:
 *                       type: string
 *                 example:
 *                   - questionId: "q1"
 *                     answer: "option1"
 *                   - questionId: "q2"
 *                     answer: "option2"
 *     responses:
 *       200:
 *         description: Réponses soumises avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *                   properties:
 *                     personalityType:
 *                       type: string
 *                       example: INTJ
 *                     traits:
 *                       type: object
 *                     recommendations:
 *                       type: array
 *                       items:
 *                         type: string
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non authentifié
 */
`,

  // ==================== REDIRECT ====================
  redirectResetPassword: `
/**
 * @swagger
 * /api/redirect-reset-password:
 *   get:
 *     summary: Rediriger vers l'application pour la réinitialisation du mot de passe
 *     tags: [Redirect]
 *     security: []
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de réinitialisation du mot de passe
 *     responses:
 *       302:
 *         description: Redirection vers l'application
 *       400:
 *         description: Token manquant
 */
`,
};
