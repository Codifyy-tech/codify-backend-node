const { Schema, model } = require('mongoose')

const schema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  theory_test_id: {
    type: String,
    required: true,
  },
  approved: {
    type: Boolean,
    required: true,
  },
})

module.exports = model('User_Theory_Test', schema)
