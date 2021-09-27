import { getAllPermissions } from '../Model/PermissionModel'

module.exports.GetAllPermissions = async function () {
    return await getAllPermissions(false);
}
