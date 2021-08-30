const UserModal = require("../Model/UserModal");
const CryptoJS = require("crypto-js");

module.exports.CheckLogin = async function (username, password) {
  var passHash = CryptoJS.MD5(username + password).toString();
  var user = (await UserModal.LoginUser(username, password)).dataValues;
  if (!user || user.Password !== passHash || user.UserType !== 1) return null;
  return user;
};

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

module.exports.GetUserRoleById = async (id) => {
  return UserModal.GetUserRolesById(id);
}