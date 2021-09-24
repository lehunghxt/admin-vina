const {
  DataTypes
} = require('sequelize-v5');

module.exports = sequelize => {
  const attributes = {
    Code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "Code"
    },
    Description: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Description"
    },
    Status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "((1))",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Status"
    }
  };
  const options = {
    tableName: "Permissions",
    comment: "",
    indexes: []
  };
  const PermissionsModel = sequelize.define("PermissionsModel", attributes, options);
  return PermissionsModel;
};