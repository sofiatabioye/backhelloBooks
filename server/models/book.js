'use strict';
import models from './category';
const Category = models.Category;

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
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
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
        
      },
    },
  });
   Book.associate = (models) => {
    Book.belongsTo(models.Category, {foreignKey: 'cat_id', targetKey: 'id'});
  }
  return Book;
};