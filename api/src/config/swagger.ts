import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Gestor de Igrejas',
      version: '1.0.0',
      description: 'Documentação da API RESTful para o aplicativo Gestor de Igrejas',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}/api`,
        description: 'Servidor de Desenvolvimento',
      },
      // Adicionar outros servidores (produção, staging) se necessário
    ],
    components: {
        securitySchemes: {
            bearerAuth: { // Nome do esquema de segurança
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT', // Formato do token
            }
        }
    },
    security: [
        {
            bearerAuth: [] // Aplica segurança globalmente (requer token JWT)
        }
    ]
  },
  // Caminho para os arquivos que contêm as anotações OpenAPI (definições de rotas)
  apis: ['./src/routes/*.ts', './src/models/*.ts', './src/validators/*.ts'], // Ajuste os caminhos conforme necessário
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  // Rota para servir a UI do Swagger
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Documentação Swagger disponível em /api-docs`);
};

