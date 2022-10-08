const createUser = {
  '/user/register': {
    post: {
      summary: 'Cadastrar Usuário',
      description:
        'Essa rota é responsável por cadastrar um usuário na plataforma.',
      tags: ['Account'],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/User',
            },
            examples: {
              'Exemplo 1': {
                value: {
                  name: 'David Augusto',
                  email: 'david@gmail.com',
                  phone: '11996531071',
                  password: 'david1010',
                  confirm_password: 'david1010',
                  birth_date:
                    'Mon Aug 08 2022 00:00:00 GMT-0300 (Hora padrão de Brasília)',
                  genre: 'H',
                  cep: '02435001',
                  address: 'Avenida do Guacá',
                  city: 'São Paulo',
                  district: 'Lauzane Paulista',
                  state: 'SP',
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Usuário cadastrado com sucesso',
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
                    message: 'Usuário cadastrado com sucesso',
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
                      message: 'O campo nome não pode ser vazio',
                    },
                    {
                      message: 'E-mail Inválido',
                    },
                    {
                      message: 'Gênero Inválido',
                    },
                    {
                      message: 'O campo data de nascimento não pode ser vazio',
                    },
                    {
                      message: 'O campo endereço não pode ser vazio',
                    },
                    {
                      message: 'O campo cep não pode ser vazio',
                    },
                    {
                      message: 'O campo senha não pode ser vazio',
                    },
                    {
                      message:
                        'O campo confirmação de senha não pode ser vazio',
                    },
                    {
                      message: 'As senhas não correspondem',
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
  },
}

module.exports = { ...createUser }
