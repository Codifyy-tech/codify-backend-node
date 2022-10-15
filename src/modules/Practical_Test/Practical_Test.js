const { Schema, model } = require('mongoose')

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  company_id: {
    type: String,
    required: true,
  },
  technology_id: {
    type: String,
    required: true,
  },
  repository_url: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  issue: {
    type: Number,
    required: true,
    unique: true,
  },
})

module.exports = model('Practical_Test', schema)
