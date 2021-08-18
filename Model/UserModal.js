const sql = require("mssql");
const CryptoJS = require("crypto-js");
const config = {
  encrypt: false,
  user: "sa",
  password: "SqlAsap@123",
  server: "10.0.0.51",
  database: "EISV2",
};

module.exports.LoginUser =  function(username, password){
    var passHash = CryptoJS.MD5(username + password).toString();
    return new Promise((resolve, reject) => {
        sql.connect(config).then(function () {
            var request = new sql.Request();
            request.query(`select * from tblUser where UserName = '${username}' and password = '${passHash}'`,  function (err, recordset) {
                if (err) {
                    return reject(err);
                }
                resolve(recordset.recordset);
            });
        });
    })
}