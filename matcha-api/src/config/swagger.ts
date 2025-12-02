import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Matcha API',
      version: '1.0.0',
      description: 'API documentation for Matcha application',
      contact: {
        name: 'API Support',
        email: 'etiennerch@gmail.com',
      },
    },
    servers: [
      {
        url: process.env.API_URL || 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // Utilise le fichier de documentation centralisé
  apis: ['./src/config/swagger.docs.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
