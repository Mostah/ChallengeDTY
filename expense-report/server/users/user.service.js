// users hardcoded for simplicity, store in a db for production applications
const users = [
    { id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' },
    { id: 2, username: 'Mostah', password:'mdp', firstName:'Thomas', lastName: 'Vindard'}
];

module.exports = {
    authenticate,
};

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}