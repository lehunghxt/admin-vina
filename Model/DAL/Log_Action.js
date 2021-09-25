const {
  DataTypes
} = require('sequelize-v5');

module.exports = sequelize => {
  const attributes = {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "Id"
    },
    ActionCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "ActionCode"
    },
    Status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Status"
    },
    Description: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Description"
    },
    JSON: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "JSON"
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "UserId"
    },
    CreateDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "CreateDate"
    }
  };
  const options = {
    tableName: "Log_Action",
    comment: "",
    indexes: []
  };
  const LogActionModel = sequelize.define("LogActionModel", attributes, options);
  return LogActionModel;
};