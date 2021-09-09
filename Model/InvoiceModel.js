const { connect, Request } = require('mssql');
const Sequelize = require('sequelize-v5')
const sequelize = require('./DAL/index').sequelize;
const _InvoiceModel = require('./DAL/tblIvoice');
const _AdjustedInvoiceModel = require('./DAL/tblAdjustedInvoice');
const _InvoiceReplaceModel = require('./DAL/tblInvoiceReplace');

const InvoiceModel = _InvoiceModel(sequelize);
const AdjustedInvoiceModel = _AdjustedInvoiceModel(sequelize);
const ReplaceInvoiceModel = _InvoiceReplaceModel(sequelize);

const config = {
    encrypt: false,
    user: "sa",
    password: "SqlAsap@123",
    server: "10.0.0.51",
    database: "EISV2",
};

export const GetInvoicesByIds = async (Ids, customerId) => {
    return await InvoiceModel.findAll({
        $and: [{
            CustomerId: customerId,
            Id: Ids
        }]
    })
}

export const GetInvoiceCode = async () => {
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

export const VoidNotSignedInvoices = async (invoices, customerId) => {
    var transaction;
    console.log(invoices)
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
}

export const GetAdjustedLinks = async (Ids, customerId) => {
    return await AdjustedInvoiceModel.findAll({
        $and: [{
            CustomerId: customerId,
            $not: [{ Status: 3 }],
            $or: [{ InvoiceId: Ids }, { AdjustedInvoiceId: Ids }]
        }]
    })
}

export const GetReplacedLinks = async (Ids, customerId) => {
    // const pool = await connect(config);
    // const request = new Request(pool);
    // const query = `SELECT * FROM tblInvoiceReplace WHERE InvoiceId IN (${Ids.join(',')}) OR ReplaceInvoiceId IN (${Ids.join(',')})`;
    // return (await request.query(query)).recordset;
    return await ReplaceInvoiceModel.findAll({
        $and: [{
            CustomerId: customerId,
            $not: [{ Status: 3 }],
            $or: [{ InvoiceId: Ids }, { ReplaceInvoiceId: Ids }]
        }]
    })
}