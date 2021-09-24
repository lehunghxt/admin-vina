const sequelizeSVA = require('./DAL/index').sequelizeSVA;
const _UserModel = require('./DAL/AccountModel');
const UserModel = _UserModel(sequelizeSVA);
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

export const GetUser = async (username) => {
    return await UserModel.findOne({
        where: {
            UserName: username,
        }
    })
}

export const GetUserPerrmissions = async (userId) => {
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