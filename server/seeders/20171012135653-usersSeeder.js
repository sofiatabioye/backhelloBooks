var bcrypt = require('bcrypt');

const password = bcrypt.hashSync("hello", 10);

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
        username: "Olu",
        email: "abisoph16@gmail.com",
        password: password,
        role: "user",
        level: 'Gold',
        image: "http://res.cloudinary.com/ddvm5tzhm/image/upload/v1506429673/HelloBooks/qjmh4arzaa7n7dqrbz5b.jpg",
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
        image: "http://res.cloudinary.com/ddvm5tzhm/image/upload/v1506429673/HelloBooks/qjmh4arzaa7n7dqrbz5b.jpg",
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
        image: "http://res.cloudinary.com/ddvm5tzhm/image/upload/v1506429673/HelloBooks/qjmh4arzaa7n7dqrbz5b.jpg",
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
        image: "http://res.cloudinary.com/ddvm5tzhm/image/upload/v1506429673/HelloBooks/qjmh4arzaa7n7dqrbz5b.jpg",
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
