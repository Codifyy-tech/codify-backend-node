const { Schema, model } = require('mongoose')

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
})

module.exports = model('Technology', schema)
