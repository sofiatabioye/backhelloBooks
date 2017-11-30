export default (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        }
    });


    return Category;
};
