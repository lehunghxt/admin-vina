const sequelizeSVA = require('./DAL/index').sequelizeSVA;
const sequelize = require('./DAL/index').sequelize;

const _UserModel = require('./DAL/AccountModel');
const UserModel = _UserModel(sequelizeSVA);

const _CustomerModel = require('./DAL/tblCustomer');
const CustomerModel = _CustomerModel(sequelize);

const _PerrmissionsModel = require('./DAL/Permissions');
const PerrmissionsModel = _PerrmissionsModel(sequelizeSVA);
const CryptoJS = require("crypto-js");

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
            $and: [
                { Code: Permissions.split(',') },
                { Status: 1 }
            ]
        }
    })).map(e => e.Code);
}

module.exports.GetIdLockUser = async function (taxcode) {
    return await CustomerModel.findAll({
        where: {
            Taxcode: taxcode,
        }
    })
};

module.exports.GetUserById = async (id) => {
    return await UserModel.findOne({
        where: {
            Id: id,
        }
    })
}

module.exports.GetListUser = async (UserId) => {
    return await UserModel.findAll({
        where: {
            $not: [{ Id: UserId }]
        },
        order: [
            ["id", "DESC"]
        ],
    })
}

module.exports.CreateAccount = async (user, UserId) => {
    var check = await UserModel.findOne({
        where: {
            UserName: user.UserName
        }
    });
    if (check) throw new global.BussinessError("Tài khoản đã tồn tại");
    try {
        var passHash = CryptoJS.MD5(user.UserName + user.Password).toString();
        return await (UserModel.build({
            UserName: user.UserName,
            FullName: user.FullName,
            Email: user.Email,
            Password: passHash,
            CreateDate: new Date(),
            Permissions: user.Permissions,
            CreateBy: UserId,
            Status: 1
        })).save();
    }
    catch (e) {
        throw e;
    }
}

module.exports.UpdateAccount = async (user) => {
    var transaction;
    var check = await UserModel.findOne({
        where: {
            Id: user.Id
        }
    });
    if (!check) throw new BussinessError("Tài khoản không tồn tại");
    try {
        await sequelizeSVA.transaction({ autocommit: false }).then(async t => {
            transaction = t;
            UserModel.update({
                FullName: user.FullName,
                Email: user.Email,
                Status: user.Status,
                Permissions: user.Permissions
            }, {
                where:
                    { Id: user.Id },
                transaction: transaction
            })
        });
        await transaction.commit();
        return user;
    }
    catch (e) {
        transaction && transaction.rollback();
        throw e;
    }
}

module.exports.UpdateAccountStatus = async (id, status) => {
    var transaction;
    var check = await UserModel.findOne({
        where: {
            Id: user.Id
        }
    });
    if (!check) throw new BussinessError("Tài khoản không tồn tại");
    try {
        await sequelizeSVA.transaction({ autocommit: false }).then(async t => {
            transaction = t;
            UserModel.update({
                Status: status,
            }, {
                where:
                    { Id: id },
                transaction: transaction
            })
        });
        await transaction.commit();
        return user;
    }
    catch (e) {
        transaction && transaction.rollback();
        throw e;
    }
}

module.exports.DeleteAccount = async (id) => {
    var transaction;
    var user = await UserModel.findOne({
        where: {
            Id: id
        }
    });
    if (!user) throw new BussinessError("Tài khoản không tồn tại");
    try {
        await sequelizeSVA.transaction({ autocommit: false }).then(async t => {
            transaction = t;
            UserModel.destroy({
                where: { Id: id },
                transaction: transaction
            })
        });
        await transaction.commit();
        return;
    }
    catch (e) {
        transaction && transaction.rollback();
        throw e;
    }
}