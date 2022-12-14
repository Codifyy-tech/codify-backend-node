const { Schema, model } = require('mongoose')

const schema = new Schema({
  theory_test_id: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
})

module.exports = model('Question', schema)
