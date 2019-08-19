var User = require('../structure/user');
var mongoose = require('mongoose');

module.exports = {
    authenticate,
    getCategory,
    getUserId,
    getUserPseudo,
};

async function authenticate({ username, password }) {
    const user = await User.findOne({ pseudo: username });
    if (user && password === user.password) {
        return user
    }
}

async function getCategory({ category }) {
    const list_category = await User.find({category: category});
    return list_category
}

async function getUserId({ _id }) {
    const user = await User.find({_id: mongoose.Types.ObjectId(_id)});
    return user
}

async function getUserPseudo({ pseudo }) {
    const user = await User.find({ pseudo: pseudo});
    return user
}