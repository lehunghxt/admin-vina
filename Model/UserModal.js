const sql = require("mssql");
const { sequelize } = require('./DAL/');
const _UserModel = require('./DAL/tblUser');
const config = {
    encrypt: false,
    user: 'sa',
    password: 'SqlAsap@123',
    server: '10.0.0.51',
    database: 'EISV2',
};

const UserModel = _UserModel(sequelize);

module.exports.LoginUser = async function (username, password) {
    // return new Promise((resolve, reject) => {
    //     sql.connect(config).then(function () {
    //         var request = new sql.Request();
    //         request.query(`select * from tblUser where UserName = '${username}' and password = '${passHash}'`, function (err, recordset) {
    //             if (err) {
    //                 return reject(err);
    //             }
    //             resolve(recordset.recordset);
    //         });
    //     });
    // })
    return await UserModel.findOne({
        where: {
            UserName: username,
        }
    })
}

module.exports.GetIdLockUser = function (taxcode) {
    return new Promise((resolve, reject) => {
        var data = UserModal.GetIdLockUser(taxcode)
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                reject({});
            });
    });
};

module.exports.GetUserRolesById = async function (Id) {
    await sql.connect(config);
    var request = new sql.Request();
    const query =
        `SELECT CONCAT(T1.Roles,'',T2.Roles) as data  FROM
    (
        (SELECT Id,Roles FROM tblUser) as T1
        FULL OUTER JOIN
        (SELECT Roles, RoleGroupUser.UserId FROM  RoleGroup INNER JOIN RoleGroupUser ON RoleGroupUser.GroupID = RoleGroup.Id) as T2
        on T1.Id = T2.UserId
    )
	WHERE T1.Id = ${Id}`
    var rolesData = (await request.query(query)).recordset[0].data;
    var roles = rolesData.split(',').filter(e => e != "" && e != undefined);
    roles = Array.from(new Set(roles));
    const query2 = `SELECT RoleId FROM Role WHERE RoleId IN('${roles.join("','")}')`
    var data = (await request.query(query2)).recordset;
    var result = data.map(e => e.RoleId);
    return result;
}