const { Schema, model } = require('mongoose')

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  firstLetter: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone_number: {
    type: Number,
  },
  password: {
    type: String,
    required: true,
  },
  birth_date: {
    type: Date,
    required: true,
  },
  genre: {
    type: String,
    enum: ['H', 'M', 'NB', 'NI'],
  },
  cep: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
    enum: [
      'AC',
      'AL',
      'AP',
      'AM',
      'BA',
      'CE',
      'DF',
      'ES',
      'GO',
      'MA',
      'MT',
      'MS',
      'MG',
      'PA',
      'PB',
      'PR',
      'PE',
      'PI',
      'RJ',
      'RN',
      'RS',
      'RO',
      'RR',
      'SC',
      'SP',
      'SE',
      'TO',
    ],
  },
  type: {
    type: String,
    required: true,
    enum: ['user', 'admin', 'company'],
    default: 'user',
  },
})

module.exports = model('User', schema)
