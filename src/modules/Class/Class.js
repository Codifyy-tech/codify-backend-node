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
    course_id: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    duration: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
        unique: true
    },
    watched: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = model('Class', schema);