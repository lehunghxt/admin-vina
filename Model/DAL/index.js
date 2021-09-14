const Sequelize = require('sequelize-v5');
Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
    return this._applyTimezone(new Date(date), options).format('YYYY-MM-DD HH:mm:ss.SSS');
};
import { WriteFile } from '@Helper/FileHelper';
const Op = Sequelize.Op
const sequelize = new Sequelize({
    // database: "HDDT",
    // username: "sa",
    // password: "VinaCA@123!@#",
    // host: '192.168.10.2',
    database: "EISV2",
    username: "sa",
    password: "SqlAsap@123",
    host: '10.0.0.51',
    dialect: 'mssql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        timestamps: false
    },
    dialectOptions: {
        supportBigNumbers: true,
        bigNumberStrings: true,
        options: {
            encrypt: false
        },
    },
    query: { raw: true },
    operatorsAliases: {
        $and: Op.and,
        $or: Op.or,
        $eq: Op.eq,
        $gt: Op.gt,
        $lt: Op.lt,
        $lte: Op.lte,
        $gte: Op.gte,
        $like: Op.like,
        $in: Op.in,
        $not: Op.not
    },
    logging: console.log,
    logging: function (str) {
        WriteFile('text.txt', str);
    }
});

const sequelizeEHD = new Sequelize({
    database: "Einvoince",
    username: "sa",
    // password: "VinaCA@123!@#",
    // host: '192.168.10.2',
    password: "SqlAsap@123",
    host: '10.0.0.51',
    dialect: 'mssql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        timestamps: false
    },
    dialectOptions: {
        supportBigNumbers: true,
        bigNumberStrings: true,
        options: {
            encrypt: false
        },
    },
    query: { raw: true },
    operatorsAliases: {
        $and: Op.and,
        $or: Op.or,
        $eq: Op.eq,
        $gt: Op.gt,
        $lt: Op.lt,
        $lte: Op.lte,
        $gte: Op.gte,
        $like: Op.like,
        $in: Op.in,
        $not: Op.not
    },
    logging: console.log,
    logging: function (str) {
        WriteFile('text.txt', str);
    }
});

export {
    sequelizeEHD,
    sequelize
}