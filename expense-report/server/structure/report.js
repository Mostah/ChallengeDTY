var mongoose = require('mongoose');

var reportSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: true
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    document:{
        type: mongoose.Schema.Types.Buffer,
        required: false
    },

});

var Report = mongoose.model('report', reportSchema);

module.exports = Report; 