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
        IvoiceTemptId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: null,
            field: "IvoiceTemptId"
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
        ContractNumberId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: null,
            field: "ContractNumberId"
        },
        Number: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: "((1))",
            primaryKey: false,
            autoIncrement: false,
            comment: null,
            field: "Number"
        },
        FromNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: "((1))",
            primaryKey: false,
            autoIncrement: false,
            comment: null,
            field: "FromNumber"
        },
        ToNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: "((1))",
            primaryKey: false,
            autoIncrement: false,
            comment: null,
            field: "ToNumber"
        },
        NoticeissuedDate: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: null,
            field: "NoticeissuedDate"
        },
        CustomerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: null,
            field: "CustomerId"
        },
        Status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: "((1))",
            primaryKey: false,
            autoIncrement: false,
            comment: null,
            field: "Status"
        },
        FileUrl: {
            type: DataTypes.STRING(400),
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: null,
            field: "FileUrl"
        },
        NumberDelete: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: null,
            field: "NumberDelete"
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
        NoticeissuedChangeId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: null,
            field: "NoticeissuedChangeId"
        },
        CancelReasons: {
            type: DataTypes.STRING(4000),
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: null,
            field: "CancelReasons"
        },
        CurrentNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: "((0))",
            primaryKey: false,
            autoIncrement: false,
            comment: null,
            field: "CurrentNumber"
        },
        BranchId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: null,
            field: "BranchId"
        }
    };
    const options = {
        tableName: "tblNoticeissued",
        comment: "",
        indexes: []
    };
    const NoticeissuedModel = sequelize.define("NoticeissuedModel", attributes, options);
    return NoticeissuedModel;
};