const sequelizeSVA = require('./DAL/index').sequelizeSVA;

const _PermissionsModel = require('./DAL/Permissions');
const PermissionsModel = _PermissionsModel(sequelizeSVA);

module.exports.getAllPermissions = async function (isActive) {
    const query = {};
    if (isActive) query = { ...query, Status: 1 };
    return await PermissionsModel.findAll({
        where: query
    })
}