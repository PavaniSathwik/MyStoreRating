const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User");

const Store = sequelize.define("Store", {
  name: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING(400), allowNull: false },
  photo: { type: DataTypes.STRING, allowNull: true },
  usersRated: { type: DataTypes.INTEGER, defaultValue: 0 },
  avgRating: { type: DataTypes.FLOAT, defaultValue: 0 },
  ownerId: { type: DataTypes.INTEGER, allowNull: false },
});

// Associations
Store.belongsTo(User, { foreignKey: "ownerId" });
User.hasMany(Store, { foreignKey: "ownerId" });

module.exports = Store;
