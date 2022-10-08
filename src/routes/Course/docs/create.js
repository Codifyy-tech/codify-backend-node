const createCourse = {
  '/course/register': {
    post: {
      summary: 'Cadastrar Curso',
      description:
        'Essa rota é responsável por cadastrar um curso na plataforma.',
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
              $ref: '#/components/schemas/Course',
            },
            examples: {
              'Exemplo 1': {
                value: {
                  title: 'Curso de Java para Iniciantes',
                  author: 'Curso em Vídeo',
                  description: 'Curso completo de Java',
                  category: 'frontend',
                  technology: 'Angular',
                  topics: [
                    'POO',
                    'ArrayList',
                    'Variaveis',
                    'Banco',
                    'Projetos',
                  ],
                  url: 'https://www.youtube.com/watch?v=sTX0UEplF54&list=PLHz_AreHm4dkI2ZdjTwZA4mPMxWTfNSpR',
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Curso cadastrado com sucesso',
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
                    message: 'Curso cadastrado com sucesso',
                  },
                },
              },
            },
          },
        },
        400: {
          description: 'Falha ao autenticar usuário',
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
                      message: 'O campo título não pode ser vazio',
                    },
                    {
                      message: 'O campo autor não pode ser vazio',
                    },
                    {
                      message: 'O campo descrição não pode ser vazio',
                    },
                    {
                      message: 'O campo categoria não pode ser vazio',
                    },
                    {
                      message: 'O campo tecnologia não pode ser vazio',
                    },
                    {
                      message: 'O campo tópicos não pode ser vazio',
                    },
                    {
                      message: 'O campo url não pode ser vazio',
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

module.exports = { ...createCourse }
