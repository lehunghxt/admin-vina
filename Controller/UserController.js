const UserModal = require("../Model/UserModal");

module.exports.CheckLogin = function (username, password) {
  return new Promise((resolve, reject) => {
    var data = UserModal.LoginUser(username, password).then((data) => {
      if (data.length > 0) {
        resolve(data);
      } else {
        reject({});
      }
    });
  });
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