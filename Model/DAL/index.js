const Sequelize = require('sequelize-v5');
const _InvoiceModel = require('./tblIvoice');
const _CustomerModel = require('./tblCustomer');
const _UserModel = require('./tblUser');
Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
    return this._applyTimezone(new Date(date), options).format('YYYY-MM-DD HH:mm:ss.SSS');
};
const Op = Sequelize.Op
const sequelize = new Sequelize({
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
        options: {
            encrypt: false
        },
    }, operatorsAliases: {
        $gt: [Op.gt],
        $gte: [Op.gte],
        $lt: [Op.lt],
        $lte: [Op.lte],
        $and: [Op.and],
        $eq: [Op.eq],
        $between: [Op.between]
    },
    logging: console.log,
    logging: function (str) {
        console.log(str)
    }
});

const Init = () => {
    try {
        sequelize.authenticate().then(() => {
            console.log("connectedServer")
        });
        var InvoiceModel = _InvoiceModel(sequelize);
        var CustomerModel = _CustomerModel(sequelize);
        var UserModel = _UserModel(sequelize);
        return {
            sequelize,
            InvoiceModel,
            CustomerModel,
            UserModel
        }
    } catch (error) {
        console.log(error)
    }
};

sequelize.Init = Init;

module.exports.sequelize = sequelize