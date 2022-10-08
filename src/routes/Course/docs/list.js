const listCourse = {
  '/list/course': {
    get: {
      summary: 'Listar Cursos',
      description:
        'Essa rota é responsável por listar todos os cursos cadastrados.',
      tags: ['Course'],
      responses: {
        201: {
          description: 'Cursos Disponíveis',
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
                    data: [
                      {
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
                      {
                        technology: {
                          color: 'rgba(171,255,154,0.57)',
                          name: 'Nodejs',
                          icon: 'https://codifyy.azurewebsites.net/assets/Nodejs.svg',
                        },
                        _id: '631b8593d68f21bf2734a5a1',
                        title: 'Curso de Nodejs',
                        author: 'Victor Lima - Guia do Programador',
                        description: 'Curso de Node Completo',
                        category: 'backend',
                        topics: [
                          'Variáveis',
                          'Objetos',
                          'Condicionais',
                          'Eventos',
                          'Funções',
                        ],
                        url: 'https://www.youtube.com/watch?v=LLqq6FemMNQ&list=PLJ_KhUnlXUPtbtLwaxxUxHqvcNQndmI4B',
                        __v: 0,
                      },
                      {
                        technology: {
                          color: 'rgba(255,219,77,0.43)',
                          name: 'Python',
                          icon: 'https://codifyy.azurewebsites.net/assets/Python.svg',
                        },
                        _id: '631b8606d68f21bf2734a5a2',
                        title: 'Curso Completo de Python 2022',
                        author: 'Curso em Vídeo',
                        description: 'Curso de Python Completo',
                        category: 'backend',
                        topics: [
                          'Variáveis',
                          'Objetos',
                          'Condicionais',
                          'Eventos',
                          'Funções',
                        ],
                        url: 'https://www.youtube.com/watch?v=S9uPNppGsGo&list=PLvE-ZAFRgX8hnECDn1v9HNTI71veL3oW0',
                        __v: 0,
                      },
                    ],
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

module.exports = { ...listCourse }
