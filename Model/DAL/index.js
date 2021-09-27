const Sequelize = require('sequelize-v5');
const SystemConfig = require('../../config');
Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
    return this._applyTimezone(new Date(date), options).format('YYYY-MM-DD HH:mm:ss.SSS');
};
const Op = Sequelize.Op
module.exports.sequelizeSVA = new Sequelize({
    database: SystemConfig.SVA_SQL_CONFIG.database,
    password: SystemConfig.SVA_SQL_CONFIG.password,
    host: SystemConfig.SVA_SQL_CONFIG.host,
    username: SystemConfig.SVA_SQL_CONFIG.username,
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
        console.log(str)
    }
});

module.exports.sequelize = new Sequelize({
    database: SystemConfig.HD_SQL_CONFIG.database,
    password: SystemConfig.HD_SQL_CONFIG.password,
    host: SystemConfig.HD_SQL_CONFIG.host,
    username: SystemConfig.HD_SQL_CONFIG.username,
    username: "sa",
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
        console.log(str)
    }
});

module.exports.sequelizeEHD = new Sequelize({
    database: SystemConfig.EHD_SQL_CONFIG.database,
    password: SystemConfig.EHD_SQL_CONFIG.password,
    host: SystemConfig.EHD_SQL_CONFIG.host,
    username: SystemConfig.EHD_SQL_CONFIG.username,
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
        console.log(str)
    }
});

// export  {
//     sequelizeEHD,
//     sequelize,
//     sequelizeSVA,
// };