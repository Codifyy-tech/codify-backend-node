const { Schema, model } = require('mongoose')

const schema = new Schema({
  cnpj: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
})

module.exports = model('Company', schema)
