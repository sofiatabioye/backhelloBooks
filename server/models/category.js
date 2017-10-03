import models from './book';

export default (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        }
    });

    Category.associate = (models) => {
        Category.hasMany(models.Book, { foreignKey: 'cat_id' });
    };
    return Category;
};
