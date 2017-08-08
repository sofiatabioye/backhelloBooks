'use strict';
module.exports = (sequelize, DataTypes) => {
  const Library = sequelize.define('Library', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Library.hasMany(Book, { foreignKey: 'bookId' });
      },
    },
  });
 
  return Library;
};
