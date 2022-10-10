const { Schema, model } = require('mongoose')

const schema = new Schema({
  technology_id: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
})

module.exports = model('Theory_Test', schema)
