const { connect, Request } = require('mssql');
const Sequelize = require('sequelize-v5')
const sequelize = require('./DAL/index').sequelize;
const _InvoiceModel = require('./DAL/tblIvoice');
const Op = Sequelize.Op;

var InvoiceModel = _InvoiceModel(sequelize);

const config = {
    encrypt: false,
    user: "sa",
    password: "SqlAsap@123",
    server: "10.0.0.51",
    database: "EISV2",
};

export const GetInvoicesByIds = async (Ids, CustomerId) => {
    const pool = await connect(config);
    var request = new Request(pool);
    const query = `SELECT * FROM tblivoice WHERE CustomerId = ${CustomerId} AND Id IN (${Ids.join(',')})`;
    return (await request.query(query)).recordset;
}

export const GetAccessedInvoices = async (CustomerId, FromDate, ToDate) => {
    // const pool = await connect(config);
    // var request = new Request(pool);
    // const query = `SELECT * FROM tblIvoice i
    //     WHERE i.CustomerId = ${CustomerId} AND ((i.CreateDate >= '${FromDate}' AND i.CreateDate <= '${ToDate}')
    //     OR (i.DateofInvoice >= '${FromDate}' AND i.DateofInvoice <= '${ToDate}')
    //     OR (i.DateofSign >= '${FromDate}' AND i.DateofSign <= '${ToDate}')
    //     OR (i.ConvertDate >= '${FromDate}' AND i.ConvertDate <= '${ToDate}')
    //     OR (i.ModifiedDate >= '${FromDate}' AND i.ModifiedDate <= '${ToDate}'))`
    // return (await request.query(query)).recordset;

    return await InvoiceModel.findAll({
        where: {
            CustomerId,
            [Op.or]: [
                {
                    [Op.and]: [{ CreateDate: { [Op.gte]: FromDate } }, {
                        CreateDate: { [Op.lte]: ToDate }
                    }]
                },
                {
                    [Op.and]: [{ ModifiedDate: { [Op.gte]: FromDate } }, {
                        ModifiedDate: { [Op.lte]: ToDate }
                    }]
                },
                {
                    [Op.and]: [{ DateofInvoice: { [Op.gte]: FromDate } }, {
                        DateofInvoice: { [Op.lte]: ToDate }
                    }]
                },
                {
                    [Op.and]: [{ DateofSign: { [Op.gte]: FromDate } }, {
                        DateofSign: { [Op.lte]: ToDate }
                    }]
                },
                {
                    [Op.and]: [{ ConvertDate: { [Op.gte]: FromDate } }, {
                        ConvertDate: { [Op.lte]: ToDate }
                    }]
                },
            ]
        }
    });

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

export const GetAdjustedLinks = async (Ids) => {
    const pool = await connect(config);
    const request = new Request(pool);
    const query = `SELECT * FROM tblAdjustedInvoice WHERE InvoiceId IN (${Ids.join(',')}) OR AdjustedInvoiceId IN (${Ids.join(',')})`;
    return (await request.query(query)).recordset;
}

export const GetReplacedLinks = async (Ids) => {
    const pool = await connect(config);
    const request = new Request(pool);
    const query = `SELECT * FROM tblInvoiceReplace WHERE InvoiceId IN (${Ids.join(',')}) OR ReplaceInvoiceId IN (${Ids.join(',')})`;
    return (await request.query(query)).recordset;
}

export const GetInvoiceDetailsByInvoiceIds = async (Ids) => {

}