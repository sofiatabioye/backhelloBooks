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
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      book_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    });
  },
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('BorrowStatuses');
  }
};
