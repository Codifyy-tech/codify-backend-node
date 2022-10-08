const registerCourseIntoCourse = {
  '/course/user/register': {
    post: {
      summary: 'Inscrever usuário em um curso',
      description:
        'Essa rota é responsável por inscrever um usuário em um curso.',
      tags: ['Course'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                course_id: {
                  type: 'string',
                },
              },
            },
            examples: {
              'Exemplo 1': {
                value: {
                  course_id: '631b84e8d68f21bf2734a5a0',
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Inscrição feita com sucesso',
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
                'Cadastro com sucesso': {
                  value: {
                    message: 'Inscrito com sucesso',
                  },
                },
              },
            },
          },
        },
        400: {
          description: 'Falha ao inscrever usuário',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                    },
                  },
                },
              },
              examples: {
                'Possíveis respostas de erro': {
                  value: [
                    {
                      message: 'Usuário já inscrito nesse curso',
                    },
                    {
                      message: 'Aulas não encontradas',
                    },
                  ],
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

module.exports = { ...registerCourseIntoCourse }
