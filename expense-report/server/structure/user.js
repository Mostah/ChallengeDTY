var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    pseudo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        },
        birth_date: {
            type: Date,
            required: false,
        },
        phone_number: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: true,
        },
        adress: {
            number: {
                type: Number,
                required: false,
            },
            street: {
                type: String,
                required: false,
            },
            zip_code: {
                type: Number,
                required: false,
            },
            country: {
                type: String,
                required: false,
            },
        },
        profile_picture: {
            type: Buffer,
            required: false
        },
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: false
    },
    team: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',
            required: false
        },
    ],
    reports: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Report',
            required: false
        }
    ],
    date: {
        type: Date,
        required: true
    }
});

var User = mongoose.model('user', userSchema);

module.exports = User;