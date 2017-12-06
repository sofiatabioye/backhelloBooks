export default (sequelize, DataTypes) => {
  const BorrowStatus = sequelize.define('BorrowStatus', {

    returned: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    borrowDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    expectedReturnDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dateReturned: {
      type: DataTypes.DATE,
      allowNull: true,
    }

  });

  BorrowStatus.associate = (models) => {
    BorrowStatus.belongsTo(models.Book, { foreignKey: 'book_id', targetKey: 'id' });
    BorrowStatus.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'id' });
  };
  return BorrowStatus;
};
