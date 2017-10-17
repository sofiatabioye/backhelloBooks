'use strict';

var bcrypt = require('bcrypt');

var password = bcrypt.hashSync("hello", 10);

module.exports = {
    up: function up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Users', [{
            username: "Olu",
            email: "olu@gmail.com",
            password: password,
            role: "user",
            level: 'Gold',
            image: "httpajjd",
            // resetPasswordToken: null,
            // resetPasswordExpires: null,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            username: "sophy",
            email: "sophy@gmail.com",
            password: password,
            role: "user",
            level: 'Silver',
            image: "httkl//djjd",
            // resetPasswordToken: null,
            // resetPasswordExpires: null,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            username: "admin",
            email: "admin@gmail.com",
            password: password,
            role: "admin",
            level: 'Gold',
            image: "http//ppdjjd",

            // resetPasswordExpires: null,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            username: "mohini",
            email: "mohini@gmail.com",
            password: password,
            role: "user",
            level: 'Bronze',
            image: "httpljjd",
            // resetPasswordToken: null,
            // resetPasswordExpires: null,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {}).then(function () {
            process.stdout.write('User types created \n');
        });
    },

    down: function down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Users', null, {});
    }
};