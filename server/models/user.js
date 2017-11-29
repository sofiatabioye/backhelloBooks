import models from './borrowstatus';

const BorrowStatus = models.BorrowStatus;
export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
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
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        level: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        resetPasswordToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        resetPasswordExpires: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    }, {
        classMethods: {
            associate(models) {
                // associations can be defined here
                User.hasMany(BorrowStatus, { foreignKey: 'userId' });
            }
        }
    });
    User.associate = (models) => {
        User.hasMany(models.BorrowStatus, { foreignKey: 'user_id' });
    };
    return User;
};
