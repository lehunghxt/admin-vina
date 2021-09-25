const LogModel = require('../Model/LogActionModel');
const ACTION_CANCEL_INVOICE = 1;
const ACTION_KICK_USER = 2;
const ACTION_BLOCK_USER = 3;
module.exports.LogActionKickUser = async (TaxCode, CurrentUser) => {
    const preJson = {
        user : CurrentUser.Id,
        customer : TaxCode,
    }
    const data = {
        ActionCode : ACTION_KICK_USER,
        Status : 1,
        Description : 'Đăng xuất tài khoản khách hàng',
        JSON : preJson,
        UserId : CurrentUser.Id,
        CreateDate : new Date(),
    }
    await LogModel.StoreAction(data);
}
module.exports.LogActionBlockUser = async (CurrentUser) => {
    const preJson = {
        user : CurrentUser.Id,
        customer : TaxCode,
    }
    const data = {
        ActionCode : ACTION_BLOCK_USER,
        Status : 1,
        Description : 'Khóa tài khoản người dùng',
        JSON : preJson,
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
        JSON : preJson,
        UserId : CurrentUser.Id,
        CreateDate : new Date(),
    }
    await LogModel.StoreAction(data);
}