'use strict';
module.exports = (sequelize, DataTypes) => {
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
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ISBN: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bookEdition: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publisher: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bookSize: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    
  }, {
    classMethods: {
      associate: (models) => {
        Book.belongsTo(models.Library, {
          through: Library,
          foreignKey: 'librariesId',
          as: 'books',
          onDelete: 'CASCADE',
        });
      },
    },
  });
  return Book;
};