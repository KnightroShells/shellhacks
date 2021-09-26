const { Model, DataTypes } = require("sequelize");
const sequelize = require("../middleware/conn");

class Category extends Model {}
Category.init({
  categoryId: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(32), allowNull: false }
}, {
  sequelize,
  modelName: 'category',
  timestamps: false
});

module.exports = Category;

