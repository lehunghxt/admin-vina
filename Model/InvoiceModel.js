const { connect, Request } = require('mssql');
const sequelize = require('./DAL/index').sequelize;
const sequelizeEHD = require('./DAL/index').sequelizeEHD;
const _InvoiceModel = require('./DAL/tblIvoice');
const _AdjustedInvoiceModel = require('./DAL/tblAdjustedInvoice');
const _InvoiceReplaceModel = require('./DAL/tblInvoiceReplace');

const InvoiceModel = _InvoiceModel(sequelize);
const AdjustedInvoiceModel = _AdjustedInvoiceModel(sequelize);
const ReplaceInvoiceModel = _InvoiceReplaceModel(sequelize);
const InvoiceModelEHD = _InvoiceModel(sequelizeEHD);
const AdjustedInvoiceModelEHD = _AdjustedInvoiceModel(sequelizeEHD);
const ReplaceInvoiceModelEHD = _InvoiceReplaceModel(sequelizeEHD);

const config = {
    encrypt: false,
    user: "sa",
    password: "SqlAsap@123",
    server: "10.0.0.51",
    database: "EISV2",
};

const configEHD = {
    encrypt: false,
    user: "sa",
    password: "SqlAsap@123",
    server: "10.0.0.51",
    database: "Einvoince",
};

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