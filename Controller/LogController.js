const sequelizeSVA = require('../Model/DAL/index').sequelizeSVA;
const _LogActionModel = require('../Model/DAL/Log_Action');
const LogActionModel = _LogActionModel(sequelizeSVA);

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