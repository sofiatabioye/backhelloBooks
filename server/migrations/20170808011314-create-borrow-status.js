module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('BorrowStatuses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      returned: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      borrowDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      expectedReturnDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      dateReturned: {
        type: Sequelize.DATE,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('BorrowStatuses');
  }
};
