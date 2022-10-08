const listCourse = {
  '/class/{id}': {
    get: {
      summary: 'Listar Aulas',
      description:
        'Essa rota é responsável por listar todas as aulas de um determinado curso.',
      tags: ['Class'],
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'ID da aula',
          required: true,
        },
      ],
      responses: {
        201: {
          description: 'Aulas Disponíveis',
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
                'Lista de aulas': {
                  value: {
                    data: [
                      {
                        _id: '6334b859a7fd994af382b605',
                        title:
                          'Curso de Java #01 - História do Java - Gustavo Guanabara',
                        number: 0,
                        user_id: '6319239c5cd3efe59c8ee8dd',
                        course_id: '631b84e8d68f21bf2734a5a0',
                        description:
                          'Aula Completa em http://www.cursoemvideo.com/lesson/historia-java/\n\nA História da Linguagem Java se inicia em 1990, quando a Sun Microsystems criou uma equipe chamada Green Team, liderada por James Gosling.\n\nAté o momento, as Linguagens de Programação como Pascal e C, precisavam de compiladores específicos para cada plataforma. Sem isso, os programas só seriam executáveis para um único sistema.\n\nFoi aí que o grupo criou o projeto GreenTalk, que virou a Linguagem Oak, capaz de ligar dispositivos diferentes e fazer com que eles pudessem se comunicar. \n\nO Star Seven (*7) surgiu em 1991 e era um aparelho multimídia capaz de controlar vários dispositivos da sua casa. Infelizmente o projeto não foi aceito na época e tudo foi engavetado em 1992.\n\nEm 1994, com o advento da World Wide Web (www) e da Linguagem HTML, o projeto da Sun foi reestabelecido com o objetivo de criar um Navegador Web capaz de rodar aplicativos em Oak.\n\nO nome "Oak" não poderia ser utilizado por questões de direitos relacionados. A linguagem foi rebatizada em homenagem a uma gíria relativa a "Café Quente": Java Coffee.\n\nSurgem então o navegador HotJava e a linguagem Java, que ficou famosa por conta de matérias veiculadas pela imprensa da época.\n\nA partir daí, vários projetos surgiram para usar Java em todo lugar. O Java Ring e Sondas Espaciais da NASA são exemplos disso.\n\nEm 2006 a Linguagem Java se tornou Open Source, que tem seu código livre para consultas, pesquisas e personalizações. Java usa a licença GPL (General Public Licence)\n\nEm 2009 a Sun Microsystems foi vendida para a Oracle por US$7,4 bilhões.\n\nAtualmente, a Linguagem Java pode ser encontrada em chips de cartão de crédito, discos de blu-ray, vídeo games (PS4 roda Java), leitores de e-books (Kindle roda Java), smartphones (Android roda Java), TV digital (o padrão Ginga é feito em Java), relógios inteligentes (Moto 360 roda Java) e até mesmo no programa para a Declaração de Imposto de Renda.\n\nCurso em Vídeo\nSite: http://www.cursoemvideo.com\nYouTube: http://www.youtube.com/cursosemvideo\nFacebook: http://www.facebook.com/cursosemvideo\nTwitter: http://twitter.com/cursosemvideo\nGoogle+: http://plus.google.com/112666558837414979080\n\nPatrocínio\nHOSTNET: http://www.hostnet.com.br\nSISTEMA EDUCANDUS: http://www.sistemaeducandus.com.br\nEDUCANDUS ONLINE: http://www.educandusonline.com.br',
                        duration: 'PT36M8S',
                        url: 'https://youtu.be/sTX0UEplF54',
                        watched: false,
                        __v: 0,
                      },
                      {
                        _id: '6334b859a7fd994af382b606',
                        title:
                          'Exercícios de Java #01 - Curso de Java para Iniciantes',
                        number: 1,
                        user_id: '6319239c5cd3efe59c8ee8dd',
                        course_id: '631b84e8d68f21bf2734a5a0',
                        description:
                          'Exercícios disponíveis em http://www.cursoemvideo.com/lesson/historia-java/exercicios-01-java/\n\nExercícios de Java, bastante úteis para os concursos da Marinha (CAP-PD) e Aeronáutica (EAGS-SIN). \n\nEssa aula faz parte de um Curso de Java para Iniciantes, disponibilizado gratuitamente na Playlist \n\nhttp://www.youtube.com/playlist?list=PLHz_AreHm4dkI2ZdjTwZA4mPMxWTfNSpR\n\nSistema Educandus de Ensino\n\nO Educandus é especializado em concursos para as Forças Armadas e está trazendo uma série semanal de exercícios para quem está estudando Algoritmos e Java.\n\nPara maiores informações sobre os cursos, datas ou métodos de ensino, entre em contato com o Educandus:\n\nE-mail de contato: fale@sistemaeducandus.com.br\nCurso: http://www.sistemaeducandus.com.br',
                        duration: 'PT18M42S',
                        url: 'https://youtu.be/ZBKxhnqX-Q0',
                        watched: true,
                        __v: 0,
                      },
                    ],
                    progress: 50,
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
