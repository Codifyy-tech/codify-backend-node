const auth = require('./routes/Auth/docs')
const user = require('./routes/User/docs')
const userSchema = require('./routes/User/docs/schema')
const course = require('./routes/Course/docs')
const courseSchema = require('./routes/Course/docs/schema')
const classes = require('./routes/Class/docs')
const classesSchema = require('./routes/Class/docs/schema')

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
    ...course,
    ...classes,
  },
  components: {
    schemas: {
      ...userSchema,
      ...courseSchema,
      ...classesSchema,
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
