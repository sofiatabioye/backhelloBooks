'use strict';
module.exports = function(sequelize, DataTypes) {
  var BorrowStatus = sequelize.define('BorrowStatus', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull : false,
    },
    bookId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bookTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    returned: {
      type: DataTypes.BOOLEAN,
      allowNull : false,
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        BorrowStatus.belongsTo(Book, { foreignKey: 'bookId' });
      }
    }
  });
  
  return BorrowStatus;
};