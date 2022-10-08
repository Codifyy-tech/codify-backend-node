const infoUser = {
  '/info': {
    get: {
      summary: 'Consultar informações de Usuário',
      description:
        'Essa rota é responsável por exibir as informações cadastras de um determinado usuário cadastrado',
      tags: ['Account'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          description: 'Informações do usuário',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
              examples: {
                'Informações de usuário': {
                  value: {
                    userInfo: {
                      _id: '6319239c5cd3efe59c8ee8dd',
                      name: 'David Augusto de Andrade Ribeiro',
                      firstLetter: 'DR',
                      email: 'davidribeiro086@gmail.com',
                    },
                    courses_registered: [
                      {
                        course_info: {
                          technology: {
                            color: 'rgba(255,255,255,0.52)',
                            name: 'Java',
                            icon: 'https://codifyy.azurewebsites.net/assets/Java.svg',
                          },
                          _id: '631b84e8d68f21bf2734a5a0',
                          title: 'Curso de Java Completo',
                          author: 'Felipe Rocha',
                          description: 'Curso de Java para iniciantes',
                          category: 'backend',
                          topics: [
                            'Variáveis',
                            'Objetos',
                            'Condicionais',
                            'Eventos',
                            'Funções',
                          ],
                          url: 'https://www.youtube.com/watch?v=sTX0UEplF54&list=PLHz_AreHm4dkI2ZdjTwZA4mPMxWTfNSpR',
                          __v: 0,
                        },
                        progress: 3,
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        400: {
          description: 'Usuário não encontrado',
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

module.exports = { ...infoUser }
