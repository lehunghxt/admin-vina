const UserModal  = require('../Model/UserModal')

module.exports.CheckLogin = function(username, password){
    return new Promise((resolve, reject) => {
        var data = UserModal.LoginUser(username, password).then((data) => {
            if(data.length > 0){
                resolve(true);
            }else{
                reject(false);
            }
        });
    });
    
}