const createClass = {
  '/class/register': {
    post: {
      summary: 'Cadastrar Aulas',
      description:
        'Essa rota é responsável por cadastrar um aulas de um determinado curso.',
      tags: ['Class'],
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
                message: {
                  type: 'string',
                },
              },
            },
            examples: {
              'Exemplo 1': {
                value: {
                  course_id: '631b8593d68f21bf2734a5a1',
                  items: [
                    {
                      kind: 'youtube#playlistItem',
                      etag: '0cpf-rNjQ7h5lbQqLPAdI3iqmPw',
                      id: 'UExKX0toVW5sWFVQdGJ0THdheHhVeEhxdmNOUW5kbUk0Qi43NDhFRTgwOTRERTU4Rjg3',
                      snippet: {
                        publishedAt: '2018-11-27T19:49:45Z',
                        channelId: 'UC_issB-37g9lwfAA37fy2Tg',
                        title:
                          'Curso de Node.js - Iniciando projeto Express.js #31',
                        description:
                          'Curso de Node.js - Iniciando projeto Express.js, nesta aula vamos dar ponta pé inicial no nosso principal projeto do curso que é a criação de um CRUD com MongoDB, Mongoose, Express.js, Node.js e Javascript.\n\n[GRÁTIS] Aprenda a desenvolver sites e sistemas para web com esse E-book 100% gratuito: https://guiadoprogramador.com/aprendadevwebgratis | Grátis por tempo LIMITADO, BAIXE AGORA! \n\n[GRÁTIS] Aprenda a desenvolver sites web com HTML, CSS, Javascript e Bootstrap neste curso 100% gratuito sobre front-end: https://guiadoprogramador.com/aulasgratisfrontend \n\n[GRÁTIS] Aprenda a criar 12 projetos com JAVA WEB neste treinamento gratuito, e ganhe 4 E-books gratis: https://guiadoprogramador.com/ebookseprojetosgratisjavaweb -- Aproveite enquanto está gratis\n\nEntre no nosso grupo no Facebook: https://www.facebook.com/groups/946315605573929/\nAcesse nosso site: https://guiadoprogramador.com/\n\n#javascript #nodejs #programador #desenvovimentoweb',
                        thumbnails: {
                          default: {
                            url: 'https://i.ytimg.com/vi/x2FZQsQiHl0/default.jpg',
                            width: 120,
                            height: 90,
                          },
                          medium: {
                            url: 'https://i.ytimg.com/vi/x2FZQsQiHl0/mqdefault.jpg',
                            width: 320,
                            height: 180,
                          },
                          high: {
                            url: 'https://i.ytimg.com/vi/x2FZQsQiHl0/hqdefault.jpg',
                            width: 480,
                            height: 360,
                          },
                          standard: {
                            url: 'https://i.ytimg.com/vi/x2FZQsQiHl0/sddefault.jpg',
                            width: 640,
                            height: 480,
                          },
                          maxres: {
                            url: 'https://i.ytimg.com/vi/x2FZQsQiHl0/maxresdefault.jpg',
                            width: 1280,
                            height: 720,
                          },
                        },
                        channelTitle: 'Victor Lima - Guia do Programador',
                        playlistId: 'PLJ_KhUnlXUPtbtLwaxxUxHqvcNQndmI4B',
                        position: 30,
                        resourceId: {
                          kind: 'youtube#video',
                          videoId: 'x2FZQsQiHl0',
                        },
                        videoOwnerChannelTitle:
                          'Victor Lima - Guia do Programador',
                        videoOwnerChannelId: 'UC_issB-37g9lwfAA37fy2Tg',
                      },
                    },
                    {
                      kind: 'youtube#playlistItem',
                      etag: 'rnER0A_tUKHMymRU2_KjBmN3WDQ',
                      id: 'UExKX0toVW5sWFVQdGJ0THdheHhVeEhxdmNOUW5kbUk0Qi41QUZGQTY5OTE4QTREQUU4',
                      snippet: {
                        publishedAt: '2018-11-27T19:50:14Z',
                        channelId: 'UC_issB-37g9lwfAA37fy2Tg',
                        title:
                          'Curso de Node.js - Grupo de rotas no Express.js #32',
                        description:
                          'Curso de Node.js - Grupo de rotas no Express.js, nesta aula vamos ver como agrupar rotas no Express.js, para economizar linhas de código quando estivermos desenvolvedo aplicações web com Node.js e Javascript.\n\n[GRÁTIS] Aprenda a desenvolver sites e sistemas para web com esse E-book 100% gratuito: https://guiadoprogramador.com/aprendadevwebgratis | Grátis por tempo LIMITADO, BAIXE AGORA! \n\n[GRÁTIS] Aprenda a desenvolver sites web com HTML, CSS, Javascript e Bootstrap neste curso 100% gratuito sobre front-end: https://guiadoprogramador.com/aulasgratisfrontend \n\n[GRÁTIS] Aprenda a criar 12 projetos com JAVA WEB neste treinamento gratuito, e ganhe 4 E-books gratis: https://guiadoprogramador.com/ebookseprojetosgratisjavaweb -- Aproveite enquanto está gratis\n\nEntre no nosso grupo no Facebook: https://www.facebook.com/groups/946315605573929/\nAcesse nosso site: https://guiadoprogramador.com/\n\n#nodejs #javascript #programador #desenvolvimentoweb',
                        thumbnails: {
                          default: {
                            url: 'https://i.ytimg.com/vi/ROL4ylHN47g/default.jpg',
                            width: 120,
                            height: 90,
                          },
                          medium: {
                            url: 'https://i.ytimg.com/vi/ROL4ylHN47g/mqdefault.jpg',
                            width: 320,
                            height: 180,
                          },
                          high: {
                            url: 'https://i.ytimg.com/vi/ROL4ylHN47g/hqdefault.jpg',
                            width: 480,
                            height: 360,
                          },
                          standard: {
                            url: 'https://i.ytimg.com/vi/ROL4ylHN47g/sddefault.jpg',
                            width: 640,
                            height: 480,
                          },
                          maxres: {
                            url: 'https://i.ytimg.com/vi/ROL4ylHN47g/maxresdefault.jpg',
                            width: 1280,
                            height: 720,
                          },
                        },
                        channelTitle: 'Victor Lima - Guia do Programador',
                        playlistId: 'PLJ_KhUnlXUPtbtLwaxxUxHqvcNQndmI4B',
                        position: 31,
                        resourceId: {
                          kind: 'youtube#video',
                          videoId: 'ROL4ylHN47g',
                        },
                        videoOwnerChannelTitle:
                          'Victor Lima - Guia do Programador',
                        videoOwnerChannelId: 'UC_issB-37g9lwfAA37fy2Tg',
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Aula cadastrada com sucesso',
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
                'Aula cadastrada com sucesso': {
                  value: {
                    message: 'Aula cadastrada com sucesso',
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
                      message: 'Aula já cadastrada',
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

module.exports = { ...createClass }
