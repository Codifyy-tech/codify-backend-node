const auth = require('./routes/Auth/docs')
const user = require('./routes/User/docs')
const userSchema = require('./routes/User/docs/schema')

module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'Codify - API',
    description: 'API referente ao projeto Codify',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Servidor Local',
    },
    {
      url: 'https://codifyy.azurewebsites.net/api',
      description: 'Servidor Hospedado',
    },
  ],
  paths: {
    ...auth,
    ...user,
  },
  components: {
    schemas: {
      ...userSchema,
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
}
