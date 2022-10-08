module.exports = {
  '/checktoken': {
    get: {
      summary: 'Verificar a validade do token de acesso',
      description:
        'Essa rota é responsável por verificar a validade do token de acesso',
      tags: ['Account'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          description: 'Token válido',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
              examples: {
                'Exemplo 1': {
                  value: {
                    _id: '6317c37f55a3ac026a169c79',
                    name: 'David Augsuto',
                    email: 'david@gmail.com',
                    type: 'user',
                  },
                },
              },
            },
          },
        },
        401: {
          description: 'Token inválido',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                  },
                },
              },
              examples: {
                'Exemplo 1': {
                  value: {
                    message: 'Token inválido',
                  },
                },
              },
            },
          },
        },
        403: {
          description: 'Acesso restrito',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                  },
                },
              },
              examples: {
                'Exemplo 1': {
                  value: {
                    message: 'Acesso restrito',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
}
