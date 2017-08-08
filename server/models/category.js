'use strict';
const Book = require('./book').Book;
module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define('Category', {
    title: {
      type : DataTypes.STRING,
      allowNull: false,
    } 
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Category.hasMany(Book, { foreignKey: 'bookId' });
  
      }
    }
  });

  return Category;
};