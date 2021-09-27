import { SplitArray } from '@Helper/ArrayHelper'
const { connect, Request } = require('mssql');
const SystemConfig = require('../config');
const sequelize = require('./DAL/index').sequelize;
const sequelizeEHD = require('./DAL/index').sequelizeEHD;
const _InvoiceModel = require('./DAL/tblIvoice');
const _AdjustedInvoiceModel = require('./DAL/tblAdjustedInvoice');
const _InvoiceReplaceModel = require('./DAL/tblInvoiceReplace');
const _InvoiceDetailModel = require("../Model/DAL/tblIvoiceDetail");
const _NoticeissuedModel = require("../Model/DAL/tblNoticeissued");
const _IvoiceTemptModel = require("../Model/DAL/tblIvoiceTempt");

const InvoiceModel = _InvoiceModel(sequelize);
const AdjustedInvoiceModel = _AdjustedInvoiceModel(sequelize);
const ReplaceInvoiceModel = _InvoiceReplaceModel(sequelize);
const InvoiceDetailModel = _InvoiceDetailModel(sequelize);

const InvoiceModelEHD = _InvoiceModel(sequelizeEHD);
const AdjustedInvoiceModelEHD = _AdjustedInvoiceModel(sequelizeEHD);
const ReplaceInvoiceModelEHD = _InvoiceReplaceModel(sequelizeEHD);
const InvoiceDetailModelEHD = _InvoiceDetailModel(sequelizeEHD);
const NoticeissuedModelEHD = _NoticeissuedModel(sequelizeEHD);
const IvoiceTemptModelEHD = _IvoiceTemptModel(sequelizeEHD)

const config = {
    encrypt: SystemConfig.HD_SQL_CONFIG.encrypt,
    user: SystemConfig.HD_SQL_CONFIG.username,
    password: SystemConfig.HD_SQL_CONFIG.password,
    server: SystemConfig.HD_SQL_CONFIG.host,
    database: SystemConfig.HD_SQL_CONFIG.database
};

const configEHD = {
    encrypt: SystemConfig.EHD_SQL_CONFIG.encrypt,
    user: SystemConfig.EHD_SQL_CONFIG.username,
    password: SystemConfig.EHD_SQL_CONFIG.password,
    server: SystemConfig.EHD_SQL_CONFIG.host,
    database: SystemConfig.EHD_SQL_CONFIG.database
};

export const GetAccessedInvoices = async (CustomerId, FromDate, ToDate, Type) => {
    var query = {
        where: {
            CustomerId,
            $or: [
                {
                    $and: [{ CreateDate: { $gte: FromDate } }, {
                        CreateDate: { $lte: ToDate }
                    }]
                },
                {
                    $and: [{ ModifiedDate: { $gte: FromDate } }, {
                        ModifiedDate: { $lte: ToDate }
                    }]
                },
                {
                    $and: [{ DateofInvoice: { $gte: FromDate } }, {
                        DateofInvoice: { $lte: ToDate }
                    }]
                },
                {
                    $and: [{ DateofSign: { $gte: FromDate } }, {
                        DateofSign: { $lte: ToDate }
                    }]
                },
                {
                    $and: [{ ConvertDate: { $gte: FromDate } }, {
                        ConvertDate: { $lte: ToDate }
                    }]
                },
            ]
        },
        order: [
            ['NoticeissuedId', 'ASC'],
            ['InvoiceNumber', 'DESC'],
        ],
    }
    if (Type === 2 || Type === 3)
        return await InvoiceModel.findAll(query);
    else {
        var data = await InvoiceModelEHD.findAll(query);
        const NoticeIds = [...new Set(data.map(i => parseInt(i.NoticeissuedId)))];
        const Notices = await NoticeissuedModelEHD.findAll({
            where: {
                Id: NoticeIds
            }
        })
        const IvoiceTemptIds = [...new Set(Notices.map(i => parseInt(i.IvoiceTemptId)))];
        const Tempts = await IvoiceTemptModelEHD.findAll({
            where: {
                Id: IvoiceTemptIds
            }
        });
        data = data.map(e => {
            var notice = Notices.find(n => n.Id === e.NoticeissuedId);
            var tempt = Tempts.find(t => t.Id === notice.IvoiceTemptId);
            e.TemptCode = tempt.TemptCode;
            e.Symbol = notice.Symbol;
            e.SellerCompanyName = tempt.Name;
            e.SellerTaxCode = tempt.Taxcode;
            e.SellerCompanyAddress = tempt.Address;
            return e;
        })
        return data;
    }
}

export const GetInvoicesByIds = async (Ids, customerId, Type) => {
    const query = {
        $and: [{
            CustomerId: customerId,
            Id: Ids
        }]
    }
    if (Type === 2 || Type === 3)
        return await InvoiceModel.findAll(query)
    return await InvoiceModelEHD.findAll(query)
}

export const GetInvoiceCode = async (Type) => {
    if (Type === 2 || Type === 3) {
        await connect(config);
        var request = new Request();
        var date = Object.values((await (request.query(`SELECT GETDATE()`))).recordset[0])[0];
        var months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P'];
        var days = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'Z'];
        var chars = [
            "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S",
            "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        var codebydate = (year % 1000).toString() + months[(month - 1) + 12] + days[day - 1];
        var sequence = Object.values((await (request.query(`SELECT next value for InvoiceCode`))).recordset[0])[0];
        sequence = sequence.toString().padStart(6, '0');
        var code = `${codebydate}${sequence}${chars[Math.floor(Math.random() * 33)]}${chars[Math.floor(Math.random() * 33)]}`
        return code;
    }
    else {
        await connect(configEHD);
        var request = new Request();
        var date = Object.values((await (request.query(`SELECT GETDATE()`))).recordset[0])[0];
        var months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P'];
        var days = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'Z'];
        var chars = [
            "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S",
            "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        var codebydate = (year % 1000).toString() + months[(month - 1)] + days[day - 1];
        var sequence = Object.values((await (request.query(`SELECT next value for InvoiceCode`))).recordset[0])[0];
        sequence = sequence.toString().padStart(6, '0');
        var code = `${codebydate}${sequence}${chars[Math.floor(Math.random() * 33)]}${chars[Math.floor(Math.random() * 33)]}`
        return code;
    }
}

export const VoidNotSignedInvoices = async (invoices, customerId, Type) => {
    var transaction;
    if (Type === 2 || Type === 3)
        try {
            await sequelize.transaction({ autocommit: false }).then(async t => {
                transaction = t;
                for (var i = 0; i < invoices.length; i++) {
                    InvoiceModel.update({
                        IvoiceCode: i.IvoiceCode, DateofSign: i.DateofInvoice, Status: 5
                    }, {
                        where:
                            { CustomerID: customerId, Id: invoices[i].Id },
                        transaction: transaction
                    })
                };
            });
            await transaction.commit();
        } catch (error) {
            if (transaction) await transaction.rollback();
            throw error;
        }
    else
        try {
            await sequelizeEHD.transaction({ autocommit: false }).then(async t => {
                transaction = t;
                for (var i = 0; i < invoices.length; i++) {
                    InvoiceModelEHD.update({
                        IvoiceCode: i.IvoiceCode, DateofSign: i.DateofInvoice, Status: 5
                    }, {
                        where:
                            { CustomerID: customerId, Id: invoices[i].Id },
                        transaction: transaction
                    })
                };
            });
            await transaction.commit();
        } catch (error) {
            if (transaction) await transaction.rollback();
            throw error;
        }
}

export const GetAdjustedLinks = async (Ids, customerId, Type) => {
    const query = {
        $and: [{
            CustomerId: customerId,
            $not: [{ Status: 3 }],
            $or: [{ InvoiceId: Ids }, { AdjustedInvoiceId: Ids }]
        }]
    }
    if (Type === 2 || Type === 3)
        return await AdjustedInvoiceModel.findAll(query)
    return await AdjustedInvoiceModelEHD.findAll(query)
}

export const GetReplacedLinks = async (Ids, customerId, Type) => {
    const query = {
        $and: [{
            CustomerId: customerId,
            $not: [{ Status: 3 }],
            $or: [{ InvoiceId: Ids }, { AdjustedInvoiceId: Ids }]
        }]
    }
    if (Type === 2 || Type === 3)
        return await ReplaceInvoiceModel.findAll(query)
    return await ReplaceInvoiceModelEHD.findAll(query)
}

export const GetInvoiceDetailByInvoiceIds = async (invoiceIds, Type) => {
    invoiceIds = SplitArray(invoiceIds, 1000);
    var details = [];
    if (Type === 2 || Type === 3)
        for (let i = 0; i < invoiceIds.length; i++) {
            var detailpart = await InvoiceDetailModel.findAll({
                where: {
                    IvoiceId: invoiceIds[i]
                }
            });
            details = [...details, ...detailpart];
        }
    else for (let i = 0; i < invoiceIds.length; i++) {
        var detailpart = await InvoiceDetailModelEHD.findAll({
            where: {
                IvoiceId: invoiceIds[i]
            }
        });
        details = [...details, ...detailpart];
    }
    details = details.sort((a, b) => {
        a.IvoiceId > b.IvoiceId ? 1 :
            a.IvoiceId < b.IvoiceId ? -1 :
                a.Id > b.Id ? 1 :
                    a.Id < b.Id ? -1 :
                        0
    });
    return details;
}