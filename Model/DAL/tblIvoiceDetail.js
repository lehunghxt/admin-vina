const { DataTypes } = require('sequelize-v5');

module.exports = sequelize => {
  const attributes = {
    Id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "Id"
    },
    IvoiceId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "IvoiceId"
    },
    ProductName: {
      type: DataTypes.STRING(4000),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "ProductName"
    },
    Unit: {
      type: DataTypes.STRING(400),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Unit"
    },
    Number: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Number"
    },
    Price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Price"
    },
    TotalMoney: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: "((0))",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "TotalMoney"
    },
    Discount: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Discount"
    },
    Status: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    Tax: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Tax"
    },
    AmountTax: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: "((0))",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "AmountTax"
    },
    TotalMoneyAfterTax: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: "((0))",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "TotalMoneyAfterTax"
    },
    // NoIndex: {
    //   type: DataTypes.BOOLEAN,
    //   allowNull: false,
    //   defaultValue: 0,
    //   primaryKey: false,
    //   autoIncrement: false,
    //   comment: null,
    //   field: "NoIndex"
    // },
    // Type: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   defaultValue: "((1))",
    //   primaryKey: false,
    //   autoIncrement: false,
    //   comment: "1: bt\r\n2: km\r\n3. ck\r\n4. note",
    //   field: "Type"
    // },
    // AdjustedId: {
    //   type: DataTypes.BIGINT,
    //   allowNull: true,
    //   defaultValue: null,
    //   primaryKey: false,
    //   autoIncrement: false,
    //   comment: null,
    //   field: "AdjustedId"
    // },
    // DiscountRate: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   defaultValue: "((0))",
    //   primaryKey: false,
    //   autoIncrement: false,
    //   comment: null,
    //   field: "DiscountRate"
    // },
    // DiscountAmount: {
    //   type: DataTypes.DECIMAL,
    //   allowNull: false,
    //   defaultValue: "((0))",
    //   primaryKey: false,
    //   autoIncrement: false,
    //   comment: null,
    //   field: "DiscountAmount"
    // },
    // PriceAfterDiscount: {
    //   type: DataTypes.DECIMAL,
    //   allowNull: false,
    //   defaultValue: "((0))",
    //   primaryKey: false,
    //   autoIncrement: false,
    //   comment: null,
    //   field: "PriceAfterDiscount"
    // }
  };
  const options = {
    tableName: "tblIvoiceDetail",
    comment: "",
    indexes: []
  };
  const InvoiceDetailModel = sequelize.define("InvoiceDetailModel", attributes, options);
  return InvoiceDetailModel;
};