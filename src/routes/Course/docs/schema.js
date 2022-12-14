module.exports = {
  Course: {
    type: 'object',
    properties: {
      title: {
        type: 'String',
        required: true,
      },
      author: {
        type: 'String',
        required: true,
      },
      description: {
        type: 'String',
        required: true,
      },
      category: {
        type: 'String',
        required: true,
      },
      technology: {
        name: {
          type: 'String',
          required: true,
        },
        color: {
          type: 'String',
          required: true,
        },
        icon: {
          type: 'String',
          required: true,
        },
      },
      topics: {
        type: 'Array',
        required: true,
      },
      url: {
        type: 'String',
        required: true,
        unique: true,
      },
    },
  },
}
