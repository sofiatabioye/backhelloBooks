'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Books', [{
        title: "Romeo and Juliet",
        description: "This play is about romance ",
        category: "Romance",
        quantity: 10,
        image: "",
        author: "Sofiat Abioye",
        ISBN: 2338484 - 374743,
        bookEdition: 2008,
        publisher: "THE TIMES",
        bookSize: 206,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: "Economics",
        description: "Studying economics isa bout needs and wants ",
        category: "Education",
        quantity: 10,
        image: "",
        author: "Sofiat Abioye",
        ISBN: 384 - 23384 - 374743,
        bookEdition: 2008,
        publisher: "Warner Berry",
        bookSize: 300,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: "The great Sire",
        description: "Adventures in oakland woods from sir benjamin ",
        category: "Fiction",
        quantity: 10,
        image: "",
        author: "Sofiat Abioye",
        ISBN: 2333884 - 3747433,
        bookEdition: 2010,
        publisher: "Darehll Somweto",
        bookSize: 236,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: "Romeo and Juliet",
        description: "This play is about romance ",
        category: "Romance",
        quantity: 10,
        image: "",
        author: "Warner bERRY",
        ISBN: 348484 - 374743,
        bookEdition: 2018,
        publisher: "THE TIMESXJD",
        bookSize: 456,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: "Mothers house",
        description: "The role of the mother in the home is ",
        category: "Business",
        quantity: 10,
        image: "",
        author: "Sofiat Abioye",
        ISBN: 2348 - 374743,
        bookEdition: 2008,
        publisher: "TESS JAMES",
        bookSize: 706,
        createdAt: new Date(),
        updatedAt: new Date()
    },

    {
        title: "Orio and Jade",
        description: "Meteors js new package is in town",
        category: "IT",
        quantity: 10,
        image: "",
        author: "dARA Ladara",
        ISBN: 4588584 - 37447443,
        bookEdition: 1997,
        publisher: "LEARY WAY",
        bookSize: 406,
        createdAt: new Date(),
        updatedAt: new Date(),
    }], {})
        .then(() => {
            process.stdout.write('Books created \n');
        }),

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Books', null, {})
};
