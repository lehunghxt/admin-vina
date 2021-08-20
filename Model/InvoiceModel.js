import { connect, Request } from "mssql";
const config = {
    encrypt: false,
    user: "sa",
    password: "SqlAsap@123",
    server: "10.0.0.51",
    database: "EISV2",
};


const GetInvoiceCode = async () => {
    await connect(config);
    var request = new Request();
    var date = Object.values((await (request.query(`SELECT GETDATE()`))).recordset[0])[0];
    var months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P'];
    var days = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'Z'];
    var chars = [
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S",
        "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var codebydate = (year % 1000).toString() + months[(month - 1) + 12] + days[day - 1];
    var sequence = Object.values((await (request.query(`SELECT next value for InvoiceCode`))).recordset[0])[0];
    sequence = sequence.toString().padStart(6, '0');
    var code = `${codebydate}${sequence}${chars[Math.floor(Math.random() * 33)]}${chars[Math.floor(Math.random() * 33)]}`
    return code;
}
