const { Model, DataTypes } = require("sequelize");
const sequelize = require("../middleware/conn");

class Article extends Model {
  getCategories(){
    return this.categories.split(",");
  }
}
Article.init({
  articleId: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING(64), allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  categories: { type: DataTypes.TEXT, allowNull: false },
  link: { type: DataTypes.TEXT, allowNull: false },
  dateCreated: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
}, {
  sequelize,
  modelName: 'article',
  timestamps: false
});

module.exports = Article;