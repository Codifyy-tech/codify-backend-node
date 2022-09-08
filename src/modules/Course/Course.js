const { Schema, model } = require('mongoose');

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        unique: true,
    },
    category:{
        type: Number,
    },
    technology: {
        type: String,
        required: true
    },
    topic: {
        type: Array
    }
});

module.exports = model('Course', schema);