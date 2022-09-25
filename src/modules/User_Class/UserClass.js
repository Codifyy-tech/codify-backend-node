const { Schema, model } = require('mongoose');

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true,
    },
    user_id: {
        type: String,
        required: true
    },
    course_id: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true
    },
    url: {
        type: String,
        required: true,
    },
    watched: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = model('User_Class', schema);