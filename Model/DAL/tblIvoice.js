const { DataTypes } = require('sequelize-v5')
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
    NoticeissuedId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "NoticeissuedId"
    },
    InvoiceNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "InvoiceNumber"
    },
    DateofInvoice: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: "(getdate())",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "DateofInvoice"
    },
    MoneyCode: {
      type: DataTypes.STRING(400),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "MoneyCode"
    },
    ExchangeRate: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: "((1))",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "ExchangeRate"
    },
    CompanyName: {
      type: DataTypes.STRING(400),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "CompanyName"
    },
    CompanyTaxcode: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "CompanyTaxcode"
    },
    CompanyAdd: {
      type: DataTypes.STRING(400),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "CompanyAdd"
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
    ContractName: {
      type: DataTypes.STRING(400),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "ContractName"
    },
    Phone: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Phone"
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
    PaymentTerm: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "PaymentTerm"
    },
    TotalMoneyNoTax: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: "((0))",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "TotalMoneyNoTax"
    },
    Tax: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Tax"
    },
    MoneyTax: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: "((0))",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "MoneyTax"
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
    TextTotalMoney: {
      type: DataTypes.STRING(4000),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "TextTotalMoney"
    },
    DateofSign: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "DateofSign"
    },
    IvoiceCode: {
      type: DataTypes.STRING(26),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "IvoiceCode"
    },
    IvoiceAdjustedId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "IvoiceAdjustedId"
    },
    IsAdjusted: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: "((0))",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "IsAdjusted"
    },
    AdjustedDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "AdjustedDate"
    },
    IsConvert: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "IsConvert"
    },
    ConvertDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "ConvertDate"
    },
    UrlInvoiceDelete: {
      type: DataTypes.STRING(400),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "UrlInvoiceDelete"
    },
    ContentInvoiceDelete: {
      type: DataTypes.STRING(2000),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "ContentInvoiceDelete"
    },
    IvoiceUrl: {
      type: DataTypes.STRING(400),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "IvoiceUrl"
    },
    CustomerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "CustomerID"
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
    SignXmlFile: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "SignXmlFile"
    },
    AmountNoTax: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: "((0))",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "AmountNoTax"
    },
    AmountNoTax0: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: "((0))",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "AmountNoTax0"
    },
    AmountNoTax5: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: "((0))",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "AmountNoTax5"
    },
    AmountNoTax10: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: "((0))",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "AmountNoTax10"
    },
    AmountTax5: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: "((0))",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "AmountTax5"
    },
    AmountTax10: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: "((0))",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "AmountTax10"
    },
    AmountNo: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: "((0))",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "AmountNo"
    },
    Amount0: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: "((0))",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Amount0"
    },
    Amount5: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: "((0))",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Amount5"
    },
    Amount10: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: "((0))",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Amount10"
    },
    OtherTax: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: "((0))",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "OtherTax"
    },
    OtherCharges: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: "((0))",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "OtherCharges"
    },
    BranchId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "BranchId"
    },
    GuideId: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "GuideId"
    },
    GuideCode: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "GuideCode"
    },
    Notes: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Notes"
    },
    UrlAdjustedInvoice: {
      type: DataTypes.STRING(400),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "UrlAdjustedInvoice"
    },
    SignXmlFileBuy: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "SignXmlFileBuy"
    },
    SignBuyDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "SignBuyDate"
    },
    SignBuyBy: {
      type: DataTypes.STRING(400),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "SignBuyBy"
    },
    IvoiceChangeId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "IvoiceChangeId"
    },
    IsChange: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "IsChange"
    },
    ChangeDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "ChangeDate"
    },
    ServiceCharge: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: "((0))",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "ServiceCharge"
    },
    ServiceTax: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "((0))",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "ServiceTax"
    },
    ServiceAmountTax: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: "((0))",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "ServiceAmountTax"
    },
    TotalServiceAmount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "TotalServiceAmount"
    },
    TotalAmount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "TotalAmount"
    },
    AuthorisedCollection: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "AuthorisedCollection"
    },
    CompanyId: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "CompanyId"
    },
    Warehouse: {
      type: DataTypes.STRING(400),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Warehouse"
    },
    ReferenceNumber: {
      type: DataTypes.STRING(400),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "ReferenceNumber"
    },
    Duration: {
      type: DataTypes.STRING(400),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Duration"
    },
    TextTotalMoneyEn: {
      type: DataTypes.STRING(400),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "TextTotalMoneyEn"
    },
    Discount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: "((0))",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Discount"
    },
    TotalMoneyAfterDiscount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: "((0))",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "TotalMoneyAfterDiscount"
    },
    SentMailDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "SentMailDate"
    },
    TemptCode: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "TemptCode"
    },
    Symbol: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Symbol"
    },
    SellerTaxCode: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "SellerTaxCode"
    },
    SellerName: {
      type: DataTypes.STRING(400),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "SellerName"
    },
    SellerCompanyName: {
      type: DataTypes.STRING(400),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "SellerCompanyName"
    },
    SellerCompanyAddress: {
      type: DataTypes.STRING(400),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "SellerCompanyAddress"
    },
    SellerFax: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "SellerFax"
    },
    SellerPhoneNumber: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "SellerPhoneNumber"
    },
    SellerEmail: {
      type: DataTypes.STRING(400),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "SellerEmail"
    },
    SellerWebsite: {
      type: DataTypes.STRING(400),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "SellerWebsite"
    },
    SellerBank: {
      type: DataTypes.STRING(400),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "SellerBank"
    },
    SellerAccBank: {
      type: DataTypes.STRING(400),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "SellerAccBank"
    },
    Img: {
      type: DataTypes.STRING(400),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Img"
    },
    Img2: {
      type: DataTypes.STRING(400),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Img2"
    },
    Img3: {
      type: DataTypes.STRING(400),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Img3"
    },
    SellerBranchName: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "SellerBranchName"
    },
    SellerBranchAdd: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "SellerBranchAdd"
    },
    SellerBranchTaxcode: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "SellerBranchTaxcode"
    },
    InvoiceType: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "InvoiceType"
    },
    InvoiceTypeType: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "InvoiceTypeType"
    },
    InvoiceCode: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "InvoiceCode"
    },
    RowInPage: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "RowInPage"
    },
    CreateByName: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "CreateByName"
    },
    ModifiedByName: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "ModifiedByName"
    },
    CancleDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "CancleDate"
    },
    Type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "((1))",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Type"
    },
    DiscountAmountNoTax: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "DiscountAmountNoTax"
    },
    DiscountAmountNoTaxAfter: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "DiscountAmountNoTaxAfter"
    },
    DiscountAmountTax0: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "DiscountAmountTax0"
    },
    DiscountAmountTax0After: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "DiscountAmountTax0After"
    },
    DiscountAmountTax5: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "DiscountAmountTax5"
    },
    DiscountAmountTax5After: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "DiscountAmountTax5After"
    },
    DiscountAmountTax10: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "DiscountAmountTax10"
    },
    DiscountAmountTax10After: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "DiscountAmountTax10After"
    }
  };
  const options = {
    sequelize,
    modelName: 'InvoiceModel',
    tableName: "tblIvoice",
    comment: "",
    indexes: [{
      name: "CustomerId",
      unique: false,
      fields: ["CompanyId"]
    }, {
      name: "InvoiceNumber",
      unique: true,
      fields: ["NoticeissuedId", "InvoiceNumber", "CustomerID"]
    }, {
      name: "IvoiceCode",
      unique: false,
      fields: ["IvoiceCode"]
    }]
  };
  const InvoiceModel = sequelize.define("InvoiceModel", attributes, options);
  return InvoiceModel;
}