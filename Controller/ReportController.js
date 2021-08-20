import { connect, Request } from "mssql";
const config = {
    encrypt: false,
    user: "sa",
    password: "SqlAsap@123",
    server: "10.0.0.51",
    database: "EISV2",
};

export async function PrepareTaxCode(ProvinceId, FromDate, ToDate) {
    await connect(config);
    var request = new Request();
    const query =
        `SELECT DISTINCT (c.Id), c.taxcode FROM tblcustomer c
        JOIN tblIvoice i ON i.CustomerId = c.Id
        WHERE c.ProvinceId = '${ProvinceId}' AND ((i.CreateDate >= '${FromDate}' AND i.CreateDate <= '${ToDate}')
        OR (i.DateofInvoice >= '${FromDate}' AND i.DateofInvoice <= '${ToDate}')
        OR (i.DateofSign >= '${FromDate}' AND i.DateofSign <= '${ToDate}')
        OR (i.ConvertDate >= '${FromDate}' AND i.ConvertDate <= '${ToDate}')
        OR (i.ModifiedDate >= '${FromDate}' AND i.ModifiedDate <= '${ToDate}'))`
    var data = (await request.query(query)).recordset;
    return data;
}

export async function ExportHaNoiData(CustomerId, FromDate, ToDate) {

}
