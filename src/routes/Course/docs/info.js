const infoCourse = {
  '/course/{id}': {
    get: {
      summary: 'Consultar informações de Courso',
      description:
        'Essa rota é responsável por exibir as informações cadastras de um determinado curso cadastrado',
      tags: ['Course'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          description: 'Informações de um curso',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Course',
              },
              examples: {
                'Informações de curso': {
                  value: {
                    data: {
                      technology: {
                        color: 'rgba(239,101,42,0.6)',
                        name: 'HTML',
                        icon: 'https://codifyy.azurewebsites.net/assets/HTML.svg',
                      },
                      _id: '631b7b27d68f21bf2734a59b',
                      title: 'Curso de HTML5 Completo',
                      author: 'Curso em Vídeo',
                      description: 'Curso completo e atual de HTML5',
                      category: 'frontend',
                      topics: [
                        'Tags',
                        'Semantica',
                        'Estrutura',
                        'Projetos',
                        'Prototipo',
                      ],
                      url: 'https://www.youtube.com/watch?v=Ejkb_YpuHWs&list=PLHz_AreHm4dkZ9-atkcmcBaMZdmLHft8n',
                      __v: 0,
                    },
                  },
                },
              },
            },
          },
        },
        400: {
          description: 'Curso não encontrado',
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
                    message: 'Curso não encontrado',
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

module.exports = { ...infoCourse }
