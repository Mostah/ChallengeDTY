var User = require('../structure/user');

module.exports = {
    authenticate,
};

async function authenticate({ username, password }) {
    const user = await User.findOne({ pseudo: username });
    if (user && password === user.password) {
        const { password, ...userWithoutPassword } = user.toObject();
        return userWithoutPassword
    }
}