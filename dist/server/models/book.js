'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _category = require('./category');

var _category2 = _interopRequireDefault(_category);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (sequelize, DataTypes) {
    var Book = sequelize.define('Book', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ISBN: {
            type: DataTypes.CHAR,
            allowNull: false,
            unique: true
        },
        bookEdition: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        publisher: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bookSize: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    }, {
        classMethods: {
            associate: function associate(models) {}
        }
    });
    Book.associate = function (models) {
        Book.belongsTo(models.Category, { foreignKey: 'cat_id', targetKey: 'id' });
    };
    return Book;
};