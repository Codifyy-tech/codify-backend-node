const { Schema, model } = require('mongoose')

const schema = new Schema({
  question_id: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
})

module.exports = model('Answer', schema)
