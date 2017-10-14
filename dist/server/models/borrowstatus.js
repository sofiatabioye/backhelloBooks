'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (sequelize, DataTypes) {
    var BorrowStatus = sequelize.define('BorrowStatus', {

        returned: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        borrowDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        expectedReturnDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        dateReturned: {
            type: DataTypes.DATE,
            allowNull: true
        }

    });

    BorrowStatus.associate = function (models) {
        BorrowStatus.belongsTo(models.Book, { foreignKey: 'book_id', targetKey: 'id' });
        BorrowStatus.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'id' });
    };
    return BorrowStatus;
};