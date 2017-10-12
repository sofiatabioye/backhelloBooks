'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Categories', [{
        title: "Fiction",
        createdAt: new Date(),
        updatedAt: new Date(),
    },

    {
        title: "Romance",
        createdAt: new Date(),
        updatedAt: new Date(),
    },

    {
        title: "Career",
        createdAt: new Date(),
        updatedAt: new Date(),
    },

    {
        title: "Business",
        createdAt: new Date(),
        updatedAt: new Date(),
    },

    {
        title: "IT",
        createdAt: new Date(),
        updatedAt: new Date(),
    },

    {
        title: "Education",
        createdAt: new Date(),
        updatedAt: new Date(),
    },

    {
        title: "Autobiographies",
        createdAt: new Date(),
        updatedAt: new Date(),
    },

    {
        title: "Folkore",
        createdAt: new Date(),
        updatedAt: new Date(),
    }], {})
        .then(() => {
            process.stdout.write('Categories created \n');
        }),

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Categories', null, {})
};

