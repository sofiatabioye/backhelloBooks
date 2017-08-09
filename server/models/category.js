'use strict';
const Book = require('./book').Book;
module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define('Category', {
    title: {
      type : DataTypes.STRING,
      allowNull: false,
      unique: true,
    } 
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Category.hasMany(Book, { foreignKey: 'bookId' });
  
      }
    }
  });
  Category.associate = (models) => {
  Category.hasMany(models.Book, {foreignKey: 'cat_id'});
  }
  return Category;

};