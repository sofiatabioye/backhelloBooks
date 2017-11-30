import models from './category';

export default (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ISBN: {
            type: DataTypes.CHAR,
            allowNull: false,
            unique: true
        },
        bookEdition: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        publisher: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bookSize: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },


    }, {
        classMethods: {
            associate: (models) => {

            },
        },
    });

    return Book;
};
