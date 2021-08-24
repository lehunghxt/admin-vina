const { DataTypes } = require('sequelize-v5');
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
    Name: {
      type: DataTypes.STRING(400),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Name"
    },
    Taxcode: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Taxcode"
    },
    Address: {
      type: DataTypes.STRING(400),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Address"
    },
    PhoneNumber: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "PhoneNumber"
    },
    Email: {
      type: DataTypes.STRING(400),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Email"
    },
    Fax: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Fax"
    },
    website: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "website"
    },
    RepName: {
      type: DataTypes.STRING(400),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "RepName"
    },
    RepPosition: {
      type: DataTypes.STRING(400),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "RepPosition"
    },
    AccBank: {
      type: DataTypes.STRING(400),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "AccBank"
    },
    Bank: {
      type: DataTypes.STRING(400),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Bank"
    },
    BankNumber: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "BankNumber"
    },
    ContactName: {
      type: DataTypes.STRING(400),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "ContactName"
    },
    ContactPhone: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "ContactPhone"
    },
    ContactEmail: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "ContactEmail"
    },
    AgencyId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "AgencyId"
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
    CreateBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "CreateBy"
    },
    CreateDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "CreateDate"
    },
    ModifiedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "ModifiedBy"
    },
    ModifiedDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "ModifiedDate"
    },
    IsKeepInvocie: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "IsKeepInvocie"
    },
    IsReport: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "IsReport"
    },
    IsDateOfInvoice: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "IsDateOfInvoice"
    },
    IsSMS: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "IsSMS"
    },
    IsServiceCheck: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "IsServiceCheck"
    },
    ProvinceId: {
      type: DataTypes.STRING(2),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "ProvinceId"
    },
    BackInvocie: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "((0))",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "BackInvocie"
    },
    CQThue: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "CQThue"
    }
  };
  const options = {
    tableName: "tblCustomer",
    comment: "",
    indexes: []
  };
  const CustomerModel = sequelize.define("CustomerModel", attributes, options);
  return CustomerModel
}