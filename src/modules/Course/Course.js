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
    },
    category:{
        type: String,
        required: true
    },
    technology: {
        type: String,
        required: true
    },
    topics: {
        type: Array,
        required: true
    },
    url: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = model('Course', schema);