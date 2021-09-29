const sequelizeSVA = require('../Model/DAL/index').sequelizeSVA;
const _LogActionModel = require('../Model/DAL/Log_Action');
const LogActionModel = _LogActionModel(sequelizeSVA);

const _AccountModel = require('../Model/DAL/AccountModel');
const AccountModel = _LogActionModel(sequelizeSVA);

AccountModel.hasMany(LogActionModel, { foreignKey: 'UserId' })
LogActionModel.belongsTo(AccountModel, { foreignKey: 'UserId' })

const limitPerPage = 50;

module.exports.GetLog = async (fromdate, todate, type, page) => {
    page = page ? (page - 1) : 0;
    const offset = page * limitPerPage;
    return await LogActionModel.findAll({
        where: {
            $and: [{ CreateDate: { $gte: fromdate } }, {
                CreateDate: { $lte: todate },
                ActionCode: type
            }]
        },
        offset,
        limit: limitPerPage,
    });
}