var bcrypt = require('bcrypt');

const password = bcrypt.hashSync("hello", 10);

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
        username: "Olu",
        email: "olu@gmail.com",
        password: password,
        role: "user",
        level: 'Gold',
        image: "httpajjd",
        resetPasswordToken: null,
        resetPasswordExpires: null,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        username: "sophy",
        email: "sophy@gmail.com",
        password: password,
        role: "user",
        level: 'Silver',
        image: "httkl//djjd",
        resetPasswordToken: null,
        resetPasswordExpires: null,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        username: "admin",
        email: "admin@gmail.com",
        password: password,
        role: "admin",
        level: 'Gold',
        image: "http//ppdjjd",
        resetPasswordToken: null,
        resetPasswordExpires: null,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        username: "mohini",
        email: "mohini@gmail.com",
        password: password,
        role: "user",
        level: 'Bronze',
        image: "httpljjd",
        resetPasswordToken: null,
        resetPasswordExpires: null,
        createdAt: new Date(),
        updatedAt: new Date(),
    }], {})
        .then(() => {
            process.stdout.write('User types created \n');
        }),

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
