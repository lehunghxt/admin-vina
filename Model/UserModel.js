const sequelizeSVA = require('./DAL/index').sequelizeSVA;
const sequelize = require('./DAL/index').sequelize;

const _UserModel = require('./DAL/AccountModel');
const UserModel = _UserModel(sequelizeSVA);

const _CustomerModel = require('./DAL/tblCustomer');
const CustomerModel = _CustomerModel(sequelize);

const _PerrmissionsModel = require('./DAL/Permissions');
const PerrmissionsModel = _PerrmissionsModel(sequelizeSVA);
const sql = require("mssql");
const config = {
    encrypt: false,
    user: 'sa',
    password: 'SqlAsap@123',
    server: '10.0.0.51',
    database: 'SVA',
};

module.exports.GetUser = async (username) => {
    return await UserModel.findOne({
        where: {
            UserName: username,
        }
    })
}

module.exports.GetUserPerrmissions = async (userId) => {
    var Permissions = (await UserModel.findOne({
        attributes: ['Permissions'],
        where: {
            Id: userId,
        }
    })).Permissions;
    return (await PerrmissionsModel.findAll({
        attributes: ['Code'],
        where: {
            Code: Permissions.split(',')
        }
    })).map(e => e.Code);
}

module.exports.GetIdLockUser = async function (taxcode) {
    return await CustomerModel.findAll({
        where: {
            Taxcode : taxcode,
        }
    })
};