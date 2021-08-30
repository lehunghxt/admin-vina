const UserModal = require("../Model/UserModal");
const CryptoJS = require("crypto-js");

module.exports.CheckLogin = async function (username, password) {
  // return new Promise((resolve, reject) => {
  //   UserModal.LoginUser(username, password).then((data) => {
  //     if (data) {
  //       resolve(data.dataValues);
  //     } else {
  //       reject({});
  //     }
  //   });
  // });
  var passHash = CryptoJS.MD5(username + password).toString();

  var user = (await UserModal.LoginUser(username, password)).dataValues;
  if (!user) return null;
  if (user.Password === passHash) return user;
  return 'Wrong Pass'
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