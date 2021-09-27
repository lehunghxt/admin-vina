const LogModel = require('../Model/LogActionModel');
const ACTION_CANCEL_INVOICE = 1;
const ACTION_KICK_USER = 2;
const ACTION_BLOCK_USER = 3;
module.exports.LogActionKickUser = async (CurrentUser, Ids) => {
    const preJson = {
        userId : CurrentUser.Id,
        customerIds : Ids,
    }
    const data = {
        ActionCode : ACTION_KICK_USER,
        Status : 1,
        Description : 'Đăng xuất tài khoản khách hàng',
        JSON : JSON.stringify(preJson),
        UserId : CurrentUser.Id,
        CreateDate : new Date(),
    }
    await LogModel.StoreAction(data);
}
module.exports.LogActionBlockUser = async (CurrentUser, TaxCode) => {
    const preJson = {
        userId : CurrentUser.Id,
        TaxCode : TaxCode,
    }
    const data = {
        ActionCode : ACTION_BLOCK_USER,
        Status : 1,
        Description : 'Khóa tài khoản người dùng',
        JSON : JSON.stringify(preJson),
        UserId : CurrentUser.Id,
        CreateDate : new Date(),
    }
    await LogModel.StoreAction(data);
}
module.exports.LogActionCancleInvoice = async (Invoices, CurrentUser) => {
    const preJson = [];
    Invoices.forEach(async inv => {
        preJson.push({
            Customer : inv.TaxCode,
            InvoiceNumber : inv.InvoiceNumber,
            IvoiceCode : inv.IvoiceCode,
        });
    });
    const data = {
        ActionCode : ACTION_CANCEL_INVOICE,
        Status : 1,
        Description : 'Hủy hóa đơn báo cáo thuế',
        JSON : JSON.stringify(preJson),
        UserId : CurrentUser.Id,
        CreateDate : new Date(),
    }
    await LogModel.StoreAction(data);
}