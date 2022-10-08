module.exports = {
  Course: {
    type: 'object',
    properties: {
      title: {
        type: 'String',
        required: true,
      },
      Number: {
        type: 'Number',
        required: true,
      },
      course_id: {
        type: 'String',
        required: true,
      },
      description: {
        type: 'String',
      },
      duration: {
        type: 'String',
        required: true,
      },
      url: {
        type: 'String',
        required: true,
        unique: true,
      },
      watched: {
        type: 'Boolean',
        required: true,
        default: false,
      },
    },
  },
}
