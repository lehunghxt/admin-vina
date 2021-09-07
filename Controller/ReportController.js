import { GetInvoiceCode, VoidNotSignedInvoices, GetInvoicesByIds, GetAdjustedLinks, GetReplacedLinks } from "../Model/InvoiceModel";
const path = require("path");
const Excel = require("exceljs");
const sequelize = require("../Model/DAL/").sequelize;
const _CustomerModel = require("../Model/DAL/tblCustomer");
const _InvoiceModel = require("../Model/DAL/tblIvoice");
const _InvoiceDetailModel = require("../Model/DAL/tblIvoiceDetail");

const CustomerModel = _CustomerModel(sequelize);
const InvoiceModel = _InvoiceModel(sequelize);
const InvoiceDetailModel = _InvoiceDetailModel(sequelize);

import ReportTaxMaster from '../class/ReportTaxMasterModel';
const { DOMParser } = require('xmldom')

export const PrepareTaxCode = async (ProvinceId, FromDate, ToDate) => {
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
    where: {
      ProvinceId
    }
  })
  return data;
}

const GetAccessedInvoices = async (CustomerId, FromDate, ToDate) => {
  return await InvoiceModel.findAll({
    where: {
      CustomerId,
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
    }
  });
}

export const ExportHaNoiData = async (Customers, FromDate, ToDate, Type) => {
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
      invoices = MapToTaxHaNoiData(invoices);
    }
    var details = await GetTaxReportDetail(invoices, invoiceIds);
    ExportExcel(customer.Taxcode, invoices, details, Type);
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
  return result;
}

const GetTaxReportDetail = async (invoices, invoiceIds) => {
  invoiceIds = SplitArray(invoiceIds, 1000);
  var details = [];
  var result = [];
  for (let i = 0; i < invoiceIds.length; i++) {
    var detailpart = await InvoiceDetailModel.findAll({
      where: {
        IvoiceId: invoiceIds[i]
      }
    });
    details.push(detailpart);
  }
  for (let i = 0; i < invoices.length; i++) {
    let invoice = invoices[i];
    let invoiceDetails = details.filter(e => e.IvoiceId == invoice.Id);
    console.log(invoiceDetails)
    for (let y = 0; y < invoiceDetails.length; y++) {
      invoiceDetails[y].Tax = (invoiceDetails[y].Tax == 0 && invoice.Tax != 0) ? invoice.Tax : invoiceDetails[y].Tax;
      invoiceDetails[y].TemptCode = invoice.TemptCode;
      invoiceDetails[y].Symbol = invoice.Symbol;
      invoiceDetails[y].InvoiceNumber = invoice.InvoiceNumber;

      invoiceDetails[y].Tax = invoiceDetails[y].Tax == -1 ? 0 : invoiceDetails[y].Tax;
      invoiceDetails[y].MoneyTax = invoiceDetails[y].MoneyTax ? invoiceDetails[y].MoneyTax : (invoiceDetails[y].TotalMoney * invoiceDetails[y].Tax / 100);
      if (invoiceDetails[y].Discount && y > 0 && invoiceDetails[y].IvoiceId == invoiceDetails[y - 1].IvoiceId) {
        invoiceDetails[y].DiscountMoney = invoiceDetails[y].TotalMoney;
        invoiceDetails[y].TotalMoneyAfterTax = 0;
        invoiceDetails[y].Tax = 0;
        invoiceDetails[y].MoneyTax = 0;
        invoiceDetails[y].TotalMoney = 0;

        invoiceDetails[y - 1].TotalMoney = invoiceDetails[y - 1].TotalMoney - invoiceDetails[y].DiscountMoney;
        invoiceDetails[y - 1].MoneyTax = invoiceDetails[y - 1].TotalMoney * invoiceDetails[y - 1].Tax / 100;
        invoiceDetails[y - 1].TotalMoney = invoiceDetails[y - 1].TotalMoney + invoiceDetails[y - 1].MoneyTax;
      }
      else if (invoiceDetails[y].Discount && y > 0 && invoiceDetails[y].IvoiceId == invoiceDetails[y + 1].IvoiceId) {
        invoiceDetails[y].DiscountMoney = invoiceDetails[y].TotalMoney;
        invoiceDetails[y].TotalMoneyAfterTax = 0;
        invoiceDetails[y].Tax = 0;
        invoiceDetails[y].MoneyTax = 0;
        invoiceDetails[y].TotalMoney = 0;

        invoiceDetails[y + 1].TotalMoney = invoiceDetails[y + 1].TotalMoney - invoiceDetails[y].DiscountMoney;
        invoiceDetails[y + 1].MoneyTax = invoiceDetails[y + 1].TotalMoney * invoiceDetails[y + 1].Tax / 100;
        invoiceDetails[y + 1].TotalMoney = invoiceDetails[y + 1].TotalMoney + invoiceDetails[y + 1].MoneyTax;
      }
    }
    result.push(invoiceDetails);
  }
  return result;
}

const SplitArray = (array, chunk_size) => {
  if (!array.length) return;
  var results = [];
  while (array.length) {
    results.push(array.splice(0, chunk_size));
  }
  return results;
};

const ExportExcel = async (taxcode, invoices, details, type) => {
  var d = new Date();
  const dirpath = `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()}`;
  if (type == 1) {
    //#region Hanle Files
    let MasterWorkbook;
    MasterWorkbook = await new Excel.Workbook().xlsx.readFile('/public/ExportExcel/TaxReportMasterTemplate.xlsx')
    let sheetToCloneMaster = MasterWorkbook.getWorksheet("Hoadon_Master");
    let copySheetMaster = MasterWorkbook.addWorksheet(`${taxcode}`);
    copySheetMaster.model = sheetToCloneMaster.model;
    copySheetMaster.name = `${taxcode}`;
    let DetailWorkbook;
    DetailWorkbook = await new Excel.Workbook().xlsx.readFile('/public/ExportExcel/TaxReportDetailTemplate.xlsx')
    let sheetToCloneDetail = DetailWorkbook.getWorksheet("Hoadon_Detail");
    let copySheetDetail = DetailWorkbook.addWorksheet(`${taxcode}`);
    copySheetDetail.model = sheetToCloneDetail.model;
    copySheetDetail.name = `${taxcode}`;
    //#endregion

    //#region Master
    for (let i = 0; i < invoices.length; i++) {
      let loaihoadon = "";
      let d = invoices[i];
      if (d.TemptCode.Contains("GTKT")) loaihoadon = "Hóa đơn giá trị gia tăng";
      else if (d.TemptCode.Contains("GTTT")) loaihoadon = "Hóa đơn bán hàng";
      else if (d.TemptCode.Contains("XKNB")) loaihoadon = "Hóa đơn xuất kho kiêm vận chuyển nội bộ";

      let masterrow = [];
      masterrow[1] = d.Id.toString().padStart(9, '0');
      masterrow[2] = d.InvoiceCode;
      masterrow[3] = d.TemptCode.split('/')[0].trimEnd('0');
      masterrow[4] = loaihoadon;
      masterrow[5] = d.TemptCode;
      masterrow[6] = d.Symbol;
      masterrow[7] = d.InvoiceNumber.toString().padStart(7, '0');
      masterrow[8] = d.Status;
      masterrow[9] = d.DateofInvoice;
      masterrow[10] = d.IsConvert;
      masterrow[11] = d.IsConvert && d.IsConvert.toString().includes("true") ? d.ConvertDate : null;
      masterrow[12] = d.MoneyCode;
      masterrow[13] = d.ExchangeRate;
      masterrow[14] = d.SellerName;
      masterrow[15] = d.SellerTaxCode;
      masterrow[16] = d.SellerAddress;
      masterrow[17] = d.CompanyName ? d.CompanyName : d.ContractName;
      masterrow[18] = d.CompanyTaxcode;
      masterrow[19] = d.CompanyAdd;
      masterrow[20] = d.TotalMoneyNoTax;
      masterrow[21] = d.MoneyTax;
      masterrow[22] = d.TotalServiceAmount;
      masterrow[23] = d.TotalMoney;
      masterrow[24] = d.TotalAmountInWords;
      masterrow[25] = d.SellerCertificate;
      masterrow[26] = d.DateofSign != null ? d.DateofSign : d.DateofInvoice;
      masterrow[27] = d.BuyerCertificate;
      masterrow[28] = d.SignXMLBuy ? d.BuyerSignDate : null;
      masterrow[29] = "0309612872";
      masterrow[30] = "SMARTVAS";
      masterrow[31] = d.ProcessedInvoiceCode;
      masterrow[32] = d.ProcessedDate;
      masterrow[33] = "";
      masterrow[34] = "http://tracuu.smartvas.vn";
      copySheetMaster.addRow(masterrow);
    }

    MasterWorkbook.xlsx.writeFile(`/public/ExportExcel/${dirpath}/TaxReportMaster.xlsx`);
    //#endregion

    //#region Detail

    let CurrentInvoiceNumber = details[0].InvoiceNumber;
    let STT = 1;
    for (let i = 0; i < details.length; i++) {
      let detail = details[i];
      console.log(detail)
      var detailrow = [];
      detailrow[1] = detail.IvoiceId.toString().padStart(9, '0');
      detailrow[2] = "SMARTVAS";
      detailrow[3] = detail.TemptCode.split('/')[0].trimEnd('0');
      detailrow[4] = detail.TemptCode;
      detailrow[5] = detail.Symbol;
      detailrow[6] = detail.InvoiceNumber.toString().padStart(7, '0');
      detailrow[7] = Taxcode;

      if (CurrentInvoiceNumber != detail.InvoiceNumber) {
        CurrentInvoiceNumber = detail.InvoiceNumber;
        STT = 1;
      }

      detailrow[8] = STT;
      detailrow[9] = detail.ProductName;
      detailrow[10] = detail.Unit;
      detailrow[11] = detail.Number;
      detailrow[12] = detail.Price;
      detailrow[13] = '';
      detailrow[14] = detail.DiscountMoney;
      detailrow[15] = detail.TotalMoney;
      detailrow[16] = detail.Tax;
      detailrow[17] = detail.MoneyTax;
      detailrow[18] = detail.TotalMoneyAfterTax;
      detailrow[19] = '';
      detailrow[20] = '';
      STT += 1;
      copySheetDetail.addRow(detailrow);
    }
    //#endregion

    //WriteFile
    DetailWorkbook.xlsx.writeFile(__basedir + `/public/ExportExcel/${dirpath}/TaxReportDetail.xlsx`);
  }
  else {
    //#region Hanle Files
    let workbook = await new Excel.Workbook().xlsx.readFile(__basedir + '/public/ExportExcel/TaxReportTemplate.xlsx');
    let sheetToCloneMaster = workbook.getWorksheet("Hoadon_Master");
    let copySheetMaster = workbook.addWorksheet(`${taxcode}_Master`);
    let sheetToCloneDetail = workbook.getWorksheet("Hoadon_Detail");
    let copySheetDetail = workbook.addWorksheet(`${taxcode}_Detail`);

    copySheetMaster.model = sheetToCloneMaster.model;
    copySheetMaster.name = `${taxcode}_Master`;
    copySheetDetail.model = sheetToCloneDetail.model;
    copySheetDetail.name = `${taxcode}_Detail`;
    //#endregion

    //#region Master
    for (let i = 0; i < invoices.length; i++) {
      let loaihoadon = "";
      let d = invoices[i];
      if (d.TemptCode.includes("GTKT")) loaihoadon = "Hóa đơn giá trị gia tăng";
      else if (d.TemptCode.includes("GTTT")) loaihoadon = "Hóa đơn bán hàng";
      else if (d.TemptCode.includes("XKNB")) loaihoadon = "Hóa đơn xuất kho kiêm vận chuyển nội bộ";

      let masterrow = [];
      masterrow[1] = d.Id.toString().padStart(9, '0');
      masterrow[2] = d.InvoiceCode;
      masterrow[3] = d.TemptCode.split('/')[0].trimEnd('0');
      masterrow[4] = loaihoadon;
      masterrow[5] = d.TemptCode;
      masterrow[6] = d.Symbol;
      masterrow[7] = d.InvoiceNumber.toString().padStart(7, '0');
      masterrow[8] = d.Status;
      masterrow[9] = d.DateofInvoice;
      masterrow[10] = d.IsConvert;
      masterrow[11] = d.IsConvert && d.IsConvert.toString().includes("true") ? d.ConvertDate : null;
      masterrow[12] = d.MoneyCode;
      masterrow[13] = d.ExchangeRate;
      masterrow[14] = d.SellerName;
      masterrow[15] = d.SellerTaxCode;
      masterrow[16] = d.SellerAddress;
      masterrow[17] = d.CompanyName ? d.CompanyName : d.ContractName;
      masterrow[18] = d.CompanyTaxcode;
      masterrow[19] = d.CompanyAdd;
      masterrow[20] = d.TotalMoneyNoTax;
      masterrow[21] = d.MoneyTax;
      masterrow[22] = d.TotalServiceAmount;
      masterrow[23] = d.TotalMoney;
      masterrow[24] = d.TotalAmountInWords;
      masterrow[25] = d.SellerCertificate;
      masterrow[26] = d.DateofSign != null ? d.DateofSign : d.DateofInvoice;
      masterrow[27] = d.BuyerCertificate;
      masterrow[28] = d.SignXMLBuy ? d.BuyerSignDate : null;
      masterrow[29] = "0309612872";
      masterrow[30] = "SMARTVAS";
      masterrow[31] = d.ProcessedInvoiceCode;
      masterrow[32] = d.ProcessedDate;
      masterrow[33] = "";
      masterrow[34] = "http://tracuu.smartvas.vn";
      copySheetMaster.addRow(masterrow);
    }
    //#endregion

    //#region Detail
    let CurrentInvoiceNumber = details[0].InvoiceNumber;
    let STT = 1;
    for (let i = 0; i < details.length; i++) {
      let detail = details[i];
      console.log(detail)
      var detailrow = [];
      detailrow[1] = detail.IvoiceId.toString().padStart(9, '0');
      detailrow[2] = "SMARTVAS";
      detailrow[3] = detail.TemptCode.split('/')[0].trimEnd('0');
      detailrow[4] = detail.TemptCode;
      detailrow[5] = detail.Symbol;
      detailrow[6] = detail.InvoiceNumber.toString().padStart(7, '0');
      detailrow[7] = Taxcode;

      if (CurrentInvoiceNumber != detail.InvoiceNumber) {
        CurrentInvoiceNumber = detail.InvoiceNumber;
        STT = 1;
      }

      detailrow[8] = STT;
      detailrow[9] = detail.ProductName;
      detailrow[10] = detail.Unit;
      detailrow[11] = detail.Number;
      detailrow[12] = detail.Price;
      detailrow[13] = '';
      detailrow[14] = detail.DiscountMoney;
      detailrow[15] = detail.TotalMoney;
      detailrow[16] = detail.Tax;
      detailrow[17] = detail.MoneyTax;
      detailrow[18] = detail.TotalMoneyAfterTax;
      detailrow[19] = '';
      detailrow[20] = '';
      STT += 1;
      copySheetDetail.addRow(detailrow);
    }
    //#endregion

    //WriteFile
    workbook.xlsx.writeFile(__basedir + `/public/ExportExcel/${dirpath}/${taxcode}.xlsx`);
  }
}