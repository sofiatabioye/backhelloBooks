'use strict';
module.exports = function(sequelize, DataTypes) {
  const History = sequelize.define('History', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  },
    {
    classMethods: {
      associate: function(models) {
        //
          Category.hasMany(Book, { foreignKey: 'bookId' });
      }
    }
  });
  return History;
};