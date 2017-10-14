'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _book = require('./book');

var _book2 = _interopRequireDefault(_book);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (sequelize, DataTypes) {
    var Category = sequelize.define('Category', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    });

    Category.associate = function (models) {
        Category.hasMany(models.Book, { foreignKey: 'cat_id' });
    };
    return Category;
};