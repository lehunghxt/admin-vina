//const UserModal = require("../Model/UserModal");
const UserModel = require("../Model/UserModel");
const CryptoJS = require("crypto-js");

module.exports.CheckLogin = async function (username, password) {
  var passHash = CryptoJS.MD5(username + password).toString();
  var user = (await UserModel.GetUser(username));
  if (!user || user.Password !== passHash) return null;
  return user;
};

module.exports.GetIdLockUser = async function (taxcode) {
  return new Promise(async(resolve, reject) => {
    var data = await UserModel.GetIdLockUser(taxcode).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject({});
      });
  });
};

module.exports.GetUserRoleById = async (id) => {
  return (await UserModel.GetUserPerrmissions(id));
}