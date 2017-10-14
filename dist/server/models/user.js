'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _borrowstatus = require('./borrowstatus');

var _borrowstatus2 = _interopRequireDefault(_borrowstatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BorrowStatus = _borrowstatus2.default.BorrowStatus;

exports.default = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        },
        level: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        resetPasswordToken: {
            type: DataTypes.STRING,
            allowNull: true
        },
        resetPasswordExpires: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        classMethods: {
            associate: function associate(models) {
                // associations can be defined here
                User.hasMany(BorrowStatus, { foreignKey: 'userId' });
            }
        }
    });
    User.associate = function (models) {
        User.hasMany(models.BorrowStatus, { foreignKey: 'user_id' });
    };
    return User;
};