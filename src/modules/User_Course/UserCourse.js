const { Schema, model } = require('mongoose')

const schema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  course_id: {
    type: String,
    required: true,
  },
})

module.exports = model('User_Course', schema)
