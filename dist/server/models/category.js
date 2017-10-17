'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (sequelize, DataTypes) {
    var Category = sequelize.define('Category', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    });

    return Category;
};