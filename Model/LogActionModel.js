const sequelizeSVA = require('./DAL/index').sequelizeSVA;
const _Log_Action = require('./DAL/Log_Action');
const LogActionModel = _Log_Action(sequelizeSVA);


export const StoreAction = async (data) => {
    return new Promise(async(res, rej) => {
        await LogActionModel.build({
            ActionCode : data.ActionCode,
            Status : data.Status,
            Description : data.Description,
            JSON : data.JSON,
            UserId : data.UserId,
            CreateDate : data.CreateDate,
        }).save().then(data => { res(data) }).catch(err => {
            console.log(err);
            rej(null);
        });
    })
}

