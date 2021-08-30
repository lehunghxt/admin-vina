const { connect, Request } = require("mssql");
import { GetAccessedInvoices, GetInvoiceCode, VoidNotSignedInvoices, GetInvoicesByIds, GetAdjustedLinks, GetReplacedLinks } from "../Model/InvoiceModel";

const sequelize = require("../Model/DAL/").sequelize;
const _CustomerModel = require("../Model/DAL/tblCustomer");
const _InvoiceModel = require("../Model/DAL/tblIvoice");

const CustomerModel = _CustomerModel(sequelize);
const InvoiceModel = _InvoiceModel(sequelize);

import ReportTaxMaster from '../class/ReportTaxMasterModel';
const { DOMParser } = require('xmldom')
const config = {
    encrypt: false,
    user: "sa",
    password: "SqlAsap@123",
    server: "10.0.0.51",
    database: "EISV2",
};

export const PrepareTaxCode = async (ProvinceId, FromDate, ToDate, Taxcode) => {
    // await connect(config);
    // var request = new Request();
    // const query =
    //     `SELECT DISTINCT (c.Id), c.taxcode, c.IsKeepInvocie FROM tblcustomer c
    //     JOIN tblIvoice i ON i.CustomerId = c.Id
    //     WHERE c.ProvinceId = '${ProvinceId}' AND ((i.CreateDate >= '${FromDate}' AND i.CreateDate <= '${ToDate}')
    //     OR (i.DateofInvoice >= '${FromDate}' AND i.DateofInvoice <= '${ToDate}')
    //     OR (i.DateofSign >= '${FromDate}' AND i.DateofSign <= '${ToDate}')
    //     OR (i.ConvertDate >= '${FromDate}' AND i.ConvertDate <= '${ToDate}')
    //     OR (i.ModifiedDate >= '${FromDate}' AND i.ModifiedDate <= '${ToDate}'))`
    // var data = (await request.query(query)).recordset;
    // return data;

    var queryWhere = {
        ProvinceId
    }

    if (Taxcode) queryWhere = { ...queryWhere, Taxcode }

    CustomerModel.hasMany(InvoiceModel, { foreignKey: 'CustomerId' })
    InvoiceModel.belongsTo(CustomerModel, { foreignKey: 'CustomerId' })
    var data = await CustomerModel.findAll({
        attributes: [sequelize.fn('DISTINCT', sequelize.col('CustomerModel.Id')), "Taxcode", "IsKeepInvocie"],
        include: [{
            model: InvoiceModel,
            required: true,
            attributes: [],
            raw: true,
            where: {
                $or: [
                    {
                        $and: [{ CreateDate: { $gte: FromDate } }, {
                            CreateDate: { $lte: ToDate }
                        }]
                    },
                    {
                        $and: [{ ModifiedDate: { $gte: FromDate } }, {
                            ModifiedDate: { $lte: ToDate }
                        }]
                    },
                    {
                        $and: [{ DateofInvoice: { $gte: FromDate } }, {
                            DateofInvoice: { $lte: ToDate }
                        }]
                    },
                    {
                        $and: [{ DateofSign: { $gte: FromDate } }, {
                            DateofSign: { $lte: ToDate }
                        }]
                    },
                    {
                        $and: [{ ConvertDate: { $gte: FromDate } }, {
                            ConvertDate: { $lte: ToDate }
                        }]
                    },
                ]
            },
        }],
        raw: true,
        where: queryWhere
    })
    return data;
}

export const ExportHaNoiData = async (Customers, FromDate, ToDate) => {
    Customers.forEach(async customer => {
        var invoices = await GetAccessedInvoices(customer.Id, FromDate, ToDate);
        const invoiceIds = invoices.map(e => parseInt(e.Id));
        const NoticeIds = [...new Set(invoices.map(i => parseInt(i.NoticeIssuedId)))];
        for (var i = 0; i < NoticeIds.length; i++) {
            var InvoicesByNotice = invoices.filter(e => e.NoticeissuedId == NoticeIds[i]);
            if (InvoicesByNotice.length < 1) continue;
            InvoicesByNotice.sort((a, b) => (a.InvoiceNumber > b.InvoiceNumber) ? -1 : (a.InvoiceNumber < b.InvoiceNumber) ? 1 : 0);

            if (customer.IsKeepInvocie && parseInt(customer.IsKeepInvocie) == 1) {
                const lastSignedInvoiceInList = InvoicesByNotice.filter(e => e.Status !== 1).reduce((prev, current) => (prev.InvoiceNumber > current.InvoiceNumber) ? prev : current)
                if (!lastSignedInvoiceInList) continue;
                const ListNotSigned = InvoicesByNotice.filter(e => e.InvoiceNumber < lastSignedInvoiceInList.InvoiceNumber && e.Status === 1);
                if (ListNotSigned && ListNotSigned.length > 0) {
                    //UpdateInvoiceNotSigned
                    var ListNeedUpdate = [];
                    ListNotSigned.forEach(async e => {
                        var invoice = invoices.find(i => i.Id == e.Id);
                        if (!({ IvoiceCode } = invoice))
                            invoice.IvoiceCode = await GetInvoiceCode();
                        invoice.Status = 5;
                        invoice.DateofSign = invoice.DateofInvoice;

                        ListNeedUpdate.push(invoice);
                        //Update result
                        InvoicesByNotice[InvoicesByNotice.findIndex(e => e.Id == invoice.Id)] = invoice;
                    });
                    await VoidNotSignedInvoices(ListNeedUpdate, customer.Id);
                }
            }

            InvoicesByNotice.forEach(invoice => {
                InvoicesByNotice[InvoicesByNotice.findIndex(e => e.Id == invoice.Id)] = new ReportTaxMaster(invoice);
                invoices[invoices.findIndex(e => e.Id == invoice.Id)] = new ReportTaxMaster(invoice);
            });
            //List Adjusted & Replaced Invoices
            var listProcess = InvoicesByNotice.filter(e => e.Status === 3 || e.Status === 6);
            if (listProcess.length > 0) {
                var processedIds = InvoicesByNotice.map(e => parseInt(e.Id));
                processedIds.push(InvoicesByNotice.map(e => parseInt(e.IvoiceAdjustedId)));
                processedIds.push(InvoicesByNotice.map(e => parseInt(e.IvoiceChangeId)));

                var MissingInvoiceIds = processedIds.filter(x => !invoiceIds.includes(x));
                var MissingInvoices = await GetInvoicesByIds(MissingInvoiceIds, customer.Id);
                var listAdjusted = listProcess.filter(e => e.Status === 3);
                if (listAdjusted.length > 0) {
                    var listAdjustedLinks = await GetAdjustedLinks(processedIds);
                    listAdjustedLinks.forEach(adj => {
                        var processed = invoices.find(e => e.Id == adj.InvoiceId);
                        var process = invoices.find(e => e.Id == adj.AdjustedInvoiceId);
                        if (!process) {
                            var newprocess = MissingInvoices.find(e => e.Id == adj.AdjustedInvoiceId);
                            processed.ProcessedInvoiceCode = newprocess.IvoiceCode;
                            processed.ProcessedDate = newprocess.DateofSign;
                        }
                        else {
                            processed.ProcessedInvoiceCode = process.InvoiceCode;
                            processed.ProcessedDate = process.DateofSign;
                        }
                        invoices[invoices.findIndex(i => i.Id == processed.Id)] = processed;
                    })
                }

                var listReplaced = listProcess.filter(e => e.Status === 6);
                if (listReplaced.length > 0) {
                    var listReplacedLinks = await GetReplacedLinks(processedIds);
                    listReplacedLinks.forEach(rep => {
                        var process = invoices.find(e => e.Id == rep.ReplaceInvoiceId);
                        var processed = invoices.find(e => e.Id == rep.InvoiceId);
                        if (!process) {
                            var newprocess = MissingInvoices.find(e => e.Id == rep.ReplaceInvoiceId);
                            processed.ProcessedInvoiceCode = newprocess.IvoiceCode;
                            processed.ProcessedDate = newprocess.DateofSign;
                        }
                        else {
                            processed.ProcessedInvoiceCode = process.InvoiceCode;
                            processed.ProcessedDate = process.DateofSign;
                        }
                        invoices[invoices.findIndex(i => i.Id == processed.Id)] = processed;
                    })
                }
            }
            MapToTaxHaNoiData(invoices);
        }
    });
}

const MapToTaxHaNoiData = (invoices) => {
    var result = [ReportTaxMaster];
    invoices.forEach(invoice => {
        if (invoice.Status == 5) invoice.Status = 1;
        else if (invoice.Status == 6 && invoice.IsChange != null && invoice.IsChange == 1) invoice.Status = 2;
        else if (invoice.Status == 3 && invoice.IsAdjusted != null && invoice.IsAdjusted == 1) invoice.Status = 3;
        else if (invoice.Status == 7) invoice.Status = 4;
        else invoice.Status = 0;

        if (invoice.IsConvert != null && invoice.IsConvert == 1) invoice.IsConvert = 1;
        else invoice.IsConvert = 0;
        if (invoice.MoneyCode.trim().toUpperCase() == "VND") invoice.ExchangeRate = null;
        if (invoice.SignXMLBuy && invoice.SignXMLBuy.toString().trim() != "") {
            var parser = new DOMParser();
            var doc = parser.parseFromString(invoice.SignXMLBuy, "text/xml");
            var nodes = doc.getElementsByTagName("X509Certificate");
            if (nodes.length == 2) {
                invoice.SellerCertificate = nodes[0].childNodes[0].nodeValue;
                invoice.BuyerCertificate = nodes[1].childNodes[0].nodeValue;
            }
            else if (nodes.length == 1) {
                invoice.SellerCertificate = invoice.SignXML.substring(invoice.SignXML.lastIndexOf("<X509Certificate>") + 1, str.lastIndexOf("</X509Certificate>"));
                invoice.BuyerCertificate = "";
            }
        }
        else if (!string.IsNullOrWhiteSpace(invoice.SignXML)) {
            invoice.SellerCertificate = invoice.SignXML.substring(invoice.SignXML.lastIndexOf("<X509Certificate>") + 1, str.lastIndexOf("</X509Certificate>"));
            invoice.BuyerCertificate = "";
        }
        else {
            var NearistSigned = invoices.find(e => (e.InvoiceNumber > invoice.InvoiceNumber || e.InvoiceNumber < invoice.InvoiceNumber) && e.Status != 1);
            invoice.SellerCertificate = NearistSigned.SignXML.substring(NearistSigned.SignXML.lastIndexOf("<X509Certificate>") + 1, str.lastIndexOf("</X509Certificate>"));
            invoice.BuyerCertificate = "";
        }
        result.push(invoice)
    })
}

Array.prototype.split = (chunk_size) => {
    if (!this.length) return;
    var results = [];
    while (this.length) {
        results.push(this.splice(0, chunk_size));
    }
    return results;
};

const GetTaxReportDetail = async (invoices) => {
    const invoiceIds = invoices.map(e => parseInt(e.Id));
    invoiceIds = invoiceIds.chunks(1000);
}