module.exports = {
  'user/{id}': {
    put: {
      summary: 'Editar dados',
      description:
        'Essa rota é responsável por editar informações de uma conta: OBS: Apenas a senha poderá ser alterada',
      tags: ['Account'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/User',
            },
            examples: {
              'Exemplo 1': {
                value: {
                  current_password: 'frajola1010',
                  new_password: 'david1010',
                  confirm_new_password: 'david1010',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Dados alterados com sucesso',
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
                    message: 'Dados alterados com sucesso',
                  },
                },
              },
            },
          },
        },
        400: {
          description: 'Falha ao tentar editar informações.',
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
                'Caso 1 - Usuário não encontrado': {
                  value: {
                    message: 'Usuário não encontrado',
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
