const { Model, DataTypes } = require("sequelize");
const sequelize = require("../middleware/conn");

class User extends Model {
  getInterests(){
    return this.interests.split(",");
  }
}
User.init({
  userId: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  email: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING(64), allowNull: false },
  interests: { type: DataTypes.TEXT, allowNull: false },
  
  dateCreated: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
  lastLogin: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
}, {
  sequelize,
  modelName: 'user'
});

