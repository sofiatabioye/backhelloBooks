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
    
  }, {
    classMethods: {
      associate: (models) => {
        Book.belongsTo(models.Library, {
          through: models.Libraries,
          foreignKey: 'librariesId',
          as: 'books',
          onDelete: 'CASCADE',
        });
      },
    },
  });
  return Book;
};