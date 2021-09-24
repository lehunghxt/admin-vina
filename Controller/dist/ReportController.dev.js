"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExportPhuThoData = exports.ExportHaNoiData = exports.PrepareTaxCode = void 0;

var _InvoiceModel2 = require("../Model/InvoiceModel");

var _FileHelper = require("@Helper/FileHelper");

var _ArrayHelper = require("@Helper/ArrayHelper");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var Excel = require("exceljs");

var sequelize = require("../Model/DAL/").sequelize;

var sequelizeEHD = require("../Model/DAL/").sequelizeEHD;

var _CustomerModel = require("../Model/DAL/tblCustomer");

var _InvoiceModel = require("../Model/DAL/tblIvoice");

var CustomerModel = _CustomerModel(sequelize);

var InvoiceModel = _InvoiceModel(sequelize);

var CustomerModelEHD = _CustomerModel(sequelizeEHD);

var InvoiceModelEHD = _InvoiceModel(sequelizeEHD);

var _require = require('xmldom'),
    DOMParser = _require.DOMParser;

var PrepareTaxCode = function PrepareTaxCode(ProvinceId, FromDate, ToDate) {
  var data, dataEHD, result, hdTaxcodes, ehdTaxcodes;
  return regeneratorRuntime.async(function PrepareTaxCode$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          CustomerModel.hasMany(InvoiceModel, {
            foreignKey: 'CustomerId'
          });
          InvoiceModel.belongsTo(CustomerModel, {
            foreignKey: 'CustomerId'
          });
          _context.next = 4;
          return regeneratorRuntime.awrap(CustomerModel.findAll({
            attributes: [sequelize.fn('DISTINCT', sequelize.col('CustomerModel.Id')), "Taxcode", "IsKeepInvocie"],
            include: [{
              model: InvoiceModel,
              required: true,
              attributes: [],
              raw: true,
              where: {
                $or: [{
                  $and: [{
                    CreateDate: {
                      $gte: FromDate
                    }
                  }, {
                    CreateDate: {
                      $lte: ToDate
                    }
                  }]
                }, {
                  $and: [{
                    ModifiedDate: {
                      $gte: FromDate
                    }
                  }, {
                    ModifiedDate: {
                      $lte: ToDate
                    }
                  }]
                }, {
                  $and: [{
                    DateofInvoice: {
                      $gte: FromDate
                    }
                  }, {
                    DateofInvoice: {
                      $lte: ToDate
                    }
                  }]
                }, {
                  $and: [{
                    DateofSign: {
                      $gte: FromDate
                    }
                  }, {
                    DateofSign: {
                      $lte: ToDate
                    }
                  }]
                }, {
                  $and: [{
                    ConvertDate: {
                      $gte: FromDate
                    }
                  }, {
                    ConvertDate: {
                      $lte: ToDate
                    }
                  }]
                }]
              }
            }],
            raw: true,
            where: {
              ProvinceId: ProvinceId
            }
          }));

        case 4:
          data = _context.sent;
          CustomerModelEHD.hasMany(InvoiceModelEHD, {
            foreignKey: 'CustomerId'
          });
          InvoiceModelEHD.belongsTo(CustomerModelEHD, {
            foreignKey: 'CustomerId'
          });
          _context.next = 9;
          return regeneratorRuntime.awrap(CustomerModelEHD.findAll({
            attributes: [sequelize.fn('DISTINCT', sequelize.col('CustomerModel.Id')), "Taxcode", "IsKeepInvocie"],
            include: [{
              model: InvoiceModelEHD,
              required: true,
              attributes: [],
              raw: true,
              where: {
                $or: [{
                  $and: [{
                    CreateDate: {
                      $gte: FromDate
                    }
                  }, {
                    CreateDate: {
                      $lte: ToDate
                    }
                  }]
                }, {
                  $and: [{
                    ModifiedDate: {
                      $gte: FromDate
                    }
                  }, {
                    ModifiedDate: {
                      $lte: ToDate
                    }
                  }]
                }, {
                  $and: [{
                    DateofInvoice: {
                      $gte: FromDate
                    }
                  }, {
                    DateofInvoice: {
                      $lte: ToDate
                    }
                  }]
                }, {
                  $and: [{
                    DateofSign: {
                      $gte: FromDate
                    }
                  }, {
                    DateofSign: {
                      $lte: ToDate
                    }
                  }]
                }, {
                  $and: [{
                    ConvertDate: {
                      $gte: FromDate
                    }
                  }, {
                    ConvertDate: {
                      $lte: ToDate
                    }
                  }]
                }]
              }
            }],
            raw: true,
            where: {
              ProvinceId: ProvinceId
            }
          }));

        case 9:
          dataEHD = _context.sent;
          result = [].concat(_toConsumableArray(data), _toConsumableArray(dataEHD));
          hdTaxcodes = data.map(function (e) {
            return e.Taxcode;
          });
          ehdTaxcodes = dataEHD.map(function (e) {
            return e.Taxcode;
          });
          result = (0, _ArrayHelper.UniqueByKey)(result, "Taxcode");
          result = result.map(function (e) {
            return hdTaxcodes.includes(e.Taxcode) && ehdTaxcodes.includes(e.Taxcode) ? _objectSpread({}, e, {
              type: 3
            }) : hdTaxcodes.includes(e.Taxcode) ? _objectSpread({}, e, {
              type: 2
            }) : _objectSpread({}, e, {
              type: 1
            });
          });
          result.sort(function (a, b) {
            return a.type > b.type ? -1 : 0;
          });
          return _context.abrupt("return", result.map(function (e) {
            return _objectSpread({}, e, {
              IsKeepInvocie: parseInt(e.IsKeepInvocie)
            });
          }));

        case 17:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.PrepareTaxCode = PrepareTaxCode;

var ExportHaNoiData = function ExportHaNoiData(Customers, FromDate, ToDate, Type) {
  var datas, i, data;
  return regeneratorRuntime.async(function ExportHaNoiData$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(GetTaxReportData(Customers, FromDate, ToDate, 1));

        case 3:
          datas = _context2.sent;
          i = 0;

        case 5:
          if (!(i < datas.length)) {
            _context2.next = 14;
            break;
          }

          data = datas[i];
          data.invoices = MapToTaxHaNoiData(data.invoices);
          data.details = MapToTaxHaNoiDetail(data.details);
          _context2.next = 11;
          return regeneratorRuntime.awrap(ExportExcel(data.customer.Taxcode, data.invoices, data.details, Type));

        case 11:
          i++;
          _context2.next = 5;
          break;

        case 14:
          _context2.next = 19;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          throw _context2.t0;

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 16]]);
};

exports.ExportHaNoiData = ExportHaNoiData;

var MapToTaxHaNoiData = function MapToTaxHaNoiData(invoices) {
  var result = []; //invoices.forEach(invoice => {

  var _loop = function _loop(index) {
    var invoice = invoices[index];
    if (invoice.Status == 5) invoice.Status = 1;else if (invoice.Status == 6 && invoice.IsChange != null && invoice.IsChange == 1) invoice.Status = 2;else if (invoice.Status == 3 && invoice.IsAdjusted != null && invoice.IsAdjusted == 1) invoice.Status = 3;else if (invoice.Status == 7) invoice.Status = 4;else invoice.Status = 0;
    if (invoice.IsConvert != null && invoice.IsConvert == 1) invoice.IsConvert = 1;else invoice.IsConvert = 0;
    if (!invoice.MoneyCode || invoice.MoneyCode.trim().toUpperCase() == "VND") invoice.ExchangeRate = null;

    if (invoice.SignXmlFileBuy && invoice.SignXmlFileBuy.toString().trim() != "") {
      parser = new DOMParser();
      doc = parser.parseFromString(invoice.SignXmlFileBuy, "text/xml");
      nodes = doc.getElementsByTagName("X509Certificate");

      if (nodes.length == 2) {
        invoice.SellerCertificate = nodes[0].childNodes[0].nodeValue;
        invoice.BuyerCertificate = nodes[1].childNodes[0].nodeValue;
      } else if (nodes.length == 1) {
        invoice.SellerCertificate = GetCerBetween2String(invoice.SignXmlFile); //invoice.SignXmlFile.substring(invoice.SignXmlFile.lastIndexOf("<X509Certificate>") + 1, invoice.SignXmlFile.lastIndexOf("</X509Certificate>"));

        invoice.BuyerCertificate = "";
      }
    } else if (invoice.SignXmlFile) {
      invoice.SellerCertificate = GetCerBetween2String(invoice.SignXmlFile);
      invoice.BuyerCertificate = "";
    } else {
      NearistSigned = invoices.find(function (e) {
        return (e.InvoiceNumber > invoice.InvoiceNumber || e.InvoiceNumber < invoice.InvoiceNumber) && e.Status == 0;
      });
      invoice.SellerCertificate = GetCerBetween2String(NearistSigned.SignXmlFile);
      invoice.BuyerCertificate = "";
    }

    result.push(invoice);
  };

  for (var index = 0; index < invoices.length; index++) {
    var parser;
    var doc;
    var nodes;
    var NearistSigned;

    _loop(index);
  }

  return result;
};

var MapToTaxHaNoiDetail = function MapToTaxHaNoiDetail(invoices, details) {
  var _loop2 = function _loop2(i) {
    var invoice = invoices[i];
    var invoiceDetails = details.filter(function (e) {
      return e.IvoiceId == invoice.Id;
    });

    for (var y = 0; y < invoiceDetails.length; y++) {
      invoiceDetails[y].Tax = invoiceDetails[y].Tax == 0 && invoice.Tax != 0 ? invoice.Tax : invoiceDetails[y].Tax;
      invoiceDetails[y].TemptCode = invoice.TemptCode;
      invoiceDetails[y].Symbol = invoice.Symbol;
      invoiceDetails[y].InvoiceNumber = invoice.InvoiceNumber;
      invoiceDetails[y].Tax = invoiceDetails[y].Tax == -1 ? 0 : invoiceDetails[y].Tax;
      invoiceDetails[y].MoneyTax = invoiceDetails[y].MoneyTax ? invoiceDetails[y].MoneyTax : invoiceDetails[y].TotalMoney * invoiceDetails[y].Tax / 100;

      if (invoiceDetails[y].Discount && y > 0 && invoiceDetails[y].IvoiceId == invoiceDetails[y - 1].IvoiceId) {
        invoiceDetails[y].DiscountMoney = invoiceDetails[y].TotalMoney;
        invoiceDetails[y].TotalMoneyAfterTax = 0;
        invoiceDetails[y].Tax = 0;
        invoiceDetails[y].MoneyTax = 0;
        invoiceDetails[y].TotalMoney = 0;
        invoiceDetails[y - 1].TotalMoney = invoiceDetails[y - 1].TotalMoney - invoiceDetails[y].DiscountMoney;
        invoiceDetails[y - 1].MoneyTax = invoiceDetails[y - 1].TotalMoney * invoiceDetails[y - 1].Tax / 100;
        invoiceDetails[y - 1].TotalMoney = invoiceDetails[y - 1].TotalMoney + invoiceDetails[y - 1].MoneyTax;
      } else if (invoiceDetails[y].Discount && y > 0 && invoiceDetails[y].IvoiceId == invoiceDetails[y + 1].IvoiceId) {
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

    result = [].concat(_toConsumableArray(result), _toConsumableArray(invoiceDetails));
  };

  for (var i = 0; i < invoices.length; i++) {
    _loop2(i);
  }

  return result;
};

var ExportExcel = function ExportExcel(taxcode, invoices, details, type) {
  var d, dirpath, MasterWorkbook, sheetToCloneMaster, copySheetMaster, DetailWorkbook, sheetToCloneDetail, copySheetDetail, i, loaihoadon, _d, masterrow, CurrentInvoiceNumber, STT, _i, detail, detailrow, workbook, _sheetToCloneMaster, _copySheetMaster, _sheetToCloneDetail, _copySheetDetail, _i2, _loaihoadon, _d2, _masterrow, _CurrentInvoiceNumber, _STT, _i3, _detail;

  return regeneratorRuntime.async(function ExportExcel$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          d = new Date();
          dirpath = "".concat(d.getDate().toString().padStart(2, '0'), "-").concat((d.getMonth() + 1).toString().padStart(2, '0'), "-").concat(d.getFullYear());
          (0, _FileHelper.CreateFolder)("/public/ExportExcel/".concat(dirpath));

          if (!(type == 1)) {
            _context3.next = 28;
            break;
          }

          _context3.next = 6;
          return regeneratorRuntime.awrap(new Excel.Workbook().xlsx.readFile(__basedir + '/public/ExportExcel/TaxReportMasterTemplate.xlsx'));

        case 6:
          MasterWorkbook = _context3.sent;
          sheetToCloneMaster = MasterWorkbook.getWorksheet("Hoadon_Master");
          copySheetMaster = MasterWorkbook.addWorksheet("".concat(taxcode));
          copySheetMaster.model = sheetToCloneMaster.model;
          copySheetMaster.name = "".concat(taxcode);
          _context3.next = 13;
          return regeneratorRuntime.awrap(new Excel.Workbook().xlsx.readFile(__basedir + '/public/ExportExcel/TaxReportDetailTemplate.xlsx'));

        case 13:
          DetailWorkbook = _context3.sent;
          sheetToCloneDetail = DetailWorkbook.getWorksheet("Hoadon_Detail");
          copySheetDetail = DetailWorkbook.addWorksheet("".concat(taxcode));
          copySheetDetail.model = sheetToCloneDetail.model;
          copySheetDetail.name = "".concat(taxcode); //#endregion
          //#region Master

          for (i = 0; i < invoices.length; i++) {
            loaihoadon = "";
            _d = invoices[i];
            if (_d.TemptCode.Contains("GTKT")) loaihoadon = "Hóa đơn giá trị gia tăng";else if (_d.TemptCode.Contains("GTTT")) loaihoadon = "Hóa đơn bán hàng";else if (_d.TemptCode.Contains("XKNB")) loaihoadon = "Hóa đơn xuất kho kiêm vận chuyển nội bộ";
            masterrow = [];
            masterrow[1] = _d.Id.toString().padStart(9, '0');
            masterrow[2] = _d.IvoiceCode;
            masterrow[3] = _d.TemptCode.split('/')[0].trimEnd('0');
            masterrow[4] = loaihoadon;
            masterrow[5] = _d.TemptCode;
            masterrow[6] = _d.Symbol;
            masterrow[7] = _d.InvoiceNumber.toString().padStart(7, '0');
            masterrow[8] = _d.Status;
            masterrow[9] = _d.DateofInvoice;
            masterrow[10] = _d.IsConvert;
            masterrow[11] = _d.IsConvert && _d.IsConvert.toString().includes("true") ? _d.ConvertDate : null;
            masterrow[12] = _d.MoneyCode;
            masterrow[13] = _d.ExchangeRate;
            masterrow[14] = _d.SellerName;
            masterrow[15] = _d.SellerTaxCode;
            masterrow[16] = _d.SellerAddress;
            masterrow[17] = _d.CompanyName ? _d.CompanyName : _d.ContractName;
            masterrow[18] = _d.CompanyTaxcode;
            masterrow[19] = _d.CompanyAdd;
            masterrow[20] = _d.TotalMoneyNoTax;
            masterrow[21] = _d.MoneyTax;
            masterrow[22] = _d.TotalServiceAmount;
            masterrow[23] = _d.TotalMoney;
            masterrow[24] = _d.TotalAmountInWords;
            masterrow[25] = _d.SellerCertificate;
            masterrow[26] = _d.DateofSign != null ? _d.DateofSign : _d.DateofInvoice;
            masterrow[27] = _d.BuyerCertificate;
            masterrow[28] = _d.SignXMLBuy ? _d.BuyerSignDate : null;
            masterrow[29] = "0309612872";
            masterrow[30] = "SMARTVAS";
            masterrow[31] = _d.ProcessedInvoiceCode;
            masterrow[32] = _d.ProcessedDate;
            masterrow[33] = "";
            masterrow[34] = "http://tracuu.smartvas.vn";
            copySheetMaster.addRow(masterrow);
          }

          _context3.next = 21;
          return regeneratorRuntime.awrap(MasterWorkbook.xlsx.writeFile(__basedir + "/public/ExportExcel/".concat(dirpath, "/TaxReportMaster.xlsx")));

        case 21:
          //#endregion
          //#region Detail
          CurrentInvoiceNumber = details[0].InvoiceNumber;
          STT = 1;

          for (_i = 0; _i < details.length; _i++) {
            detail = details[_i];
            detailrow = [];
            detailrow[1] = detail.IvoiceId.toString().padStart(9, '0');
            detailrow[2] = "SMARTVAS";
            detailrow[3] = detail.TemptCode.split('/')[0].trimEnd('0');
            detailrow[4] = detail.TemptCode;
            detailrow[5] = detail.Symbol;
            detailrow[6] = detail.InvoiceNumber.toString().padStart(7, '0');
            detailrow[7] = taxcode;

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
          } //#endregion
          //WriteFile


          _context3.next = 26;
          return regeneratorRuntime.awrap(DetailWorkbook.xlsx.writeFile(__basedir + "/public/ExportExcel/".concat(dirpath, "/TaxReportDetail.xlsx")));

        case 26:
          _context3.next = 45;
          break;

        case 28:
          _context3.next = 30;
          return regeneratorRuntime.awrap(new Excel.Workbook().xlsx.readFile(__basedir + '/public/ExportExcel/TaxReportTemplate.xlsx'));

        case 30:
          workbook = _context3.sent;
          _sheetToCloneMaster = workbook.getWorksheet("Hoadon_Master");
          _copySheetMaster = workbook.addWorksheet("".concat(taxcode, "_Master"));
          _sheetToCloneDetail = workbook.getWorksheet("Hoadon_Detail");
          _copySheetDetail = workbook.addWorksheet("".concat(taxcode, "_Detail"));
          _copySheetMaster.model = _sheetToCloneMaster.model;
          _copySheetMaster.name = "".concat(taxcode, "_Master");
          _copySheetDetail.model = _sheetToCloneDetail.model;
          _copySheetDetail.name = "".concat(taxcode, "_Detail"); //#endregion
          //#region Master

          for (_i2 = 0; _i2 < invoices.length; _i2++) {
            _loaihoadon = "";
            _d2 = invoices[_i2];
            if (_d2.TemptCode.includes("GTKT")) _loaihoadon = "Hóa đơn giá trị gia tăng";else if (_d2.TemptCode.includes("GTTT")) _loaihoadon = "Hóa đơn bán hàng";else if (_d2.TemptCode.includes("XKNB")) _loaihoadon = "Hóa đơn xuất kho kiêm vận chuyển nội bộ";
            _masterrow = [];
            _masterrow[1] = _d2.Id.toString().padStart(9, '0');
            _masterrow[2] = _d2.IvoiceCode;
            _masterrow[3] = _d2.TemptCode.split('/')[0].trimEnd('0');
            _masterrow[4] = _loaihoadon;
            _masterrow[5] = _d2.TemptCode;
            _masterrow[6] = _d2.Symbol;
            _masterrow[7] = _d2.InvoiceNumber.toString().padStart(7, '0');
            _masterrow[8] = _d2.Status;
            _masterrow[9] = _d2.DateofInvoice;
            _masterrow[10] = _d2.IsConvert;
            _masterrow[11] = _d2.IsConvert && _d2.IsConvert.toString().includes("true") ? _d2.ConvertDate : null;
            _masterrow[12] = _d2.MoneyCode;
            _masterrow[13] = _d2.ExchangeRate;
            _masterrow[14] = _d2.SellerName;
            _masterrow[15] = _d2.SellerTaxCode;
            _masterrow[16] = _d2.SellerAddress;
            _masterrow[17] = _d2.CompanyName ? _d2.CompanyName : _d2.ContractName;
            _masterrow[18] = _d2.CompanyTaxcode;
            _masterrow[19] = _d2.CompanyAdd;
            _masterrow[20] = _d2.TotalMoneyNoTax;
            _masterrow[21] = _d2.MoneyTax;
            _masterrow[22] = _d2.TotalServiceAmount;
            _masterrow[23] = _d2.TotalMoney;
            _masterrow[24] = _d2.TotalAmountInWords;
            _masterrow[25] = _d2.SellerCertificate;
            _masterrow[26] = _d2.DateofSign != null ? _d2.DateofSign : _d2.DateofInvoice;
            _masterrow[27] = _d2.BuyerCertificate;
            _masterrow[28] = _d2.SignXMLBuy ? _d2.BuyerSignDate : null;
            _masterrow[29] = "0309612872";
            _masterrow[30] = "SMARTVAS";
            _masterrow[31] = _d2.ProcessedInvoiceCode;
            _masterrow[32] = _d2.ProcessedDate;
            _masterrow[33] = "";
            _masterrow[34] = "http://tracuu.smartvas.vn";

            _copySheetMaster.addRow(_masterrow);
          } //#endregion
          //#region Detail


          _CurrentInvoiceNumber = details[0].InvoiceNumber;
          _STT = 1;

          for (_i3 = 0; _i3 < details.length; _i3++) {
            _detail = details[_i3];
            detailrow = [];
            detailrow[1] = _detail.IvoiceId.toString().padStart(9, '0');
            detailrow[2] = "SMARTVAS";
            detailrow[3] = _detail.TemptCode.split('/')[0].trimEnd('0');
            detailrow[4] = _detail.TemptCode;
            detailrow[5] = _detail.Symbol;
            detailrow[6] = _detail.InvoiceNumber.toString().padStart(7, '0');
            detailrow[7] = taxcode;

            if (_CurrentInvoiceNumber != _detail.InvoiceNumber) {
              _CurrentInvoiceNumber = _detail.InvoiceNumber;
              _STT = 1;
            }

            detailrow[8] = _STT;
            detailrow[9] = _detail.ProductName;
            detailrow[10] = _detail.Unit;
            detailrow[11] = _detail.Number;
            detailrow[12] = _detail.Price;
            detailrow[13] = '';
            detailrow[14] = _detail.DiscountMoney;
            detailrow[15] = _detail.TotalMoney;
            detailrow[16] = _detail.Tax;
            detailrow[17] = _detail.MoneyTax;
            detailrow[18] = _detail.TotalMoneyAfterTax;
            detailrow[19] = '';
            detailrow[20] = '';
            _STT += 1;

            _copySheetDetail.addRow(detailrow);
          } //#endregion
          //WriteFile


          _context3.next = 45;
          return regeneratorRuntime.awrap(workbook.xlsx.writeFile(__basedir + "/public/ExportExcel/".concat(dirpath, "/").concat(taxcode, ".xlsx")));

        case 45:
          return _context3.abrupt("return");

        case 46:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var GetCerBetween2String = function GetCerBetween2String(str) {
  var result = str.match(new RegExp('<X509Certificate>' + "(.*)" + '</X509Certificate>'));
  return result[1];
};

var ExportPhuThoData = function ExportPhuThoData(Customers, FromDate, ToDate) {
  var datas, result, i, data, request;
  return regeneratorRuntime.async(function ExportPhuThoData$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(GetTaxReportData(Customers, FromDate, ToDate, 2));

        case 2:
          datas = _context4.sent;
          result = [];

          for (i = 0; i < datas.length; i++) {
            data = datas[i];
            request = MapToPhuThoData(data.invoices, data.details);
            result = [].concat(_toConsumableArray(result), _toConsumableArray(request));
          }

          return _context4.abrupt("return", result);

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.ExportPhuThoData = ExportPhuThoData;

var MapToPhuThoData = function MapToPhuThoData(invoices, details) {
  var result = [];
  invoices.forEach(function (i) {
    var _result$push;

    var HHDVu = MapToPhuThoDetail(details.filter(function (e) {
      return e.IvoiceId == i.Id;
    }));
    result.push((_result$push = {
      MHDon: i.Id,
      MTCHDon: i.IvoiceCode,
      LHDon: i.InvoiceType == 1 ? "01GTKT" : i.InvoiceType == 2 ? "02GTTT" : i.InvoiceType == 4 ? "03XKNB" : "",
      THDon: i.InvoiceType == 1 ? "Hóa đơn giá trị gia tăng" : i.InvoiceType == 2 ? "Hóa đơn bán hàng" : i.InvoiceType == 4 ? "Phiếu xuất kho kiêm vận chuyển nội bộ" : "",
      KHMSHDon: i.TemptCode,
      KHHDon: i.Symbol,
      SHDon: i.InvoiceNumber.toString().padStart(7, '0'),
      TTHDon: i.Status === 5 ? 1 : i.Status === 3 ? 3 : i.Status === 6 ? 2 : i.Status === 7 ? 4 : 0,
      TDLap: FormatDate(i.DateofInvoice),
      TTICDoi: i.IsConvert == 1 && i.ConvertDate ? true : false,
      TDICDoi: i.IsConvert == 1 && i.ConvertDate ? FormatDate(i.ConvertDate) : null,
      DVTTe: i.MoneyCode,
      TGia: i.MoneyCode == "VND" ? "1.00" : i.ExchangeRate ? i.ExchangeRate.toFixed(2) : "1.00",
      TNBan: i.SellerCompanyName,
      MSTNBan: i.SellerTaxCode,
      DCNBan: i.SellerCompanyAddress,
      TNMua: i.CompanyName,
      MSTNMua: i.CompanyTaxcode,
      DCNMua: i.CompanyAdd,
      MSTNCCap: "0309612872",
      MCQThue: i.SellerTaxCode == "2601031408" ? "21701" : i.SellerTaxCode == "2601033331" ? "21709" : i.SellerTaxCode == "2601040152" ? "21711" : i.SellerTaxCode == "2600734422" ? "21705" : i.SellerTaxCode == "2600115373" ? "21703" : "",
      TgTHang: i.TotalMoneyNoTax ? i.TotalMoneyNoTax.toFixed(4) : Number(0).toFixed(4),
      TgTThue: i.MoneyTax ? i.MoneyTax.toFixed(4) : Number(0).toFixed(4),
      TgTTTBSo: i.TotalMoney ? i.TotalMoney.toFixed(4) : Number(0).toFixed(4)
    }, _defineProperty(_result$push, "TgTTTBSo", i.TotalMoney ? i.TotalMoney.toFixed(4) : Number(0).toFixed(4)), _defineProperty(_result$push, "CTCHDon", "http://tracuu.smartvas.vn/"), _defineProperty(_result$push, "LDXLy", i.LDXLy ? i.LDXLy : null), _defineProperty(_result$push, "MHDSXLy", i.MHDSXLy ? i.MHDSXLy : null), _defineProperty(_result$push, "NHDSXLy", i.NHDSXLy ? i.NHDSXLy : null), _defineProperty(_result$push, "HHDVu", HHDVu), _result$push));
  });
  return result;
};

var MapToPhuThoDetail = function MapToPhuThoDetail(details) {
  var result = [];
  var STT = 0;
  var IvoiceId = details[0].IvoiceId;

  for (var i = 0; i < details.length; i++) {
    var detail = details[i];
    STT = IvoiceId == detail.IvoiceId ? STT++ : 1;
    result.push({
      STTu: STT,
      THHDVu: detail.ProductName,
      DVTinh: detail.Unit,
      DGia: detail.Price ? detail.Price.toFixed(4) : Number(0).toFixed(4),
      SLuong: detail.Number ? detail.Number.toFixed(4) : Number(0).toFixed(4),
      ThTien: detail.TotalMoney ? detail.TotalMoney.toFixed(4) : Number(0).toFixed(4),
      TSuat: detail.Type == 4 || detail.Tax == -1 ? "KCT" : detail.Tax.toString()
    });
  }

  ;
  return result;
};

var GetTaxReportData = function GetTaxReportData(Customers, FromDate, ToDate, ReportType) {
  var result, _loop3, index, invoices, invoiceIds, i, InvoicesByNotice, removeInvoiceIds, listProcess, processedIds, MissingInvoiceIds, MissingInvoices, listAdjusted, listAdjustedLinks, listReplaced, listReplacedLinks, details, _ret;

  return regeneratorRuntime.async(function GetTaxReportData$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          result = [];
          _context6.prev = 1;

          _loop3 = function _loop3(index) {
            var customer, NoticeIds;
            return regeneratorRuntime.async(function _loop3$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    customer = Customers[index];
                    _context5.next = 3;
                    return regeneratorRuntime.awrap((0, _InvoiceModel2.GetAccessedInvoices)(customer.Id, FromDate, ToDate, customer.type));

                  case 3:
                    invoices = _context5.sent;

                    if (!(!invoices || invoices.length < 1)) {
                      _context5.next = 6;
                      break;
                    }

                    return _context5.abrupt("return", "continue");

                  case 6:
                    invoiceIds = invoices.map(function (e) {
                      return parseInt(e.Id);
                    });
                    NoticeIds = _toConsumableArray(new Set(invoices.map(function (i) {
                      return parseInt(i.NoticeissuedId);
                    })));
                    i = 0;

                  case 9:
                    if (!(i < NoticeIds.length)) {
                      _context5.next = 44;
                      break;
                    }

                    InvoicesByNotice = invoices.filter(function (e) {
                      return e.NoticeissuedId == NoticeIds[i];
                    });

                    if (!(InvoicesByNotice.length < 1)) {
                      _context5.next = 13;
                      break;
                    }

                    return _context5.abrupt("continue", 41);

                  case 13:
                    if (!InvoicesByNotice.every(function (e) {
                      return e.Status === 1;
                    })) {
                      _context5.next = 18;
                      break;
                    }

                    removeInvoiceIds = invoices.filter(function (e) {
                      return e.NoticeissuedId == NoticeIds[i];
                    }).map(function (e) {
                      return parseInt(e.Id);
                    });
                    invoices = invoices.filter(function (e) {
                      return e.NoticeissuedId !== NoticeIds[i];
                    });
                    invoiceIds = invoiceIds.filter(function (e) {
                      return !removeInvoiceIds.includes(e);
                    });
                    return _context5.abrupt("continue", 41);

                  case 18:
                    // if (customer.IsKeepInvocie && parseInt(customer.IsKeepInvocie) == 1) {
                    //   const lastSignedInvoiceInList = InvoicesByNotice.filter(e => e.Status !== 1).reduce((prev, current) => (prev && prev.InvoiceNumber > current.InvoiceNumber) ? prev : current, null)
                    //   if (!lastSignedInvoiceInList) continue;
                    //   const ListNotSigned = InvoicesByNotice.filter(e => e.InvoiceNumber < lastSignedInvoiceInList.InvoiceNumber && e.Status === 1);
                    //   if (ListNotSigned && ListNotSigned.length > 0) {
                    //     var ListNeedUpdate = [];
                    //     ListNotSigned.forEach(async e => {
                    //       var invoice = invoices.find(i => i.Id == e.Id);
                    //       if (!({ IvoiceCode } = invoice))
                    //         invoice.IvoiceCode = await GetInvoiceCode();
                    //       invoice.Status = 5;
                    //       invoice.DateofSign = invoice.DateofInvoice;
                    //       ListNeedUpdate.push(invoice);
                    //       //Update result
                    //       InvoicesByNotice[InvoicesByNotice.findIndex(e => e.Id == invoice.Id)] = invoice;
                    //       invoices[invoices.findIndex(e => e.Id == invoice.Id)] = invoice;
                    //     });
                    //     await VoidNotSignedInvoices(ListNeedUpdate, customer.Id);
                    //   }
                    // }
                    InvoicesByNotice = InvoicesByNotice.filter(function (e) {
                      return e.Status > 1;
                    });
                    invoices = InvoicesByNotice.filter(function (e) {
                      return e.Status > 1 && e.NoticeissuedId == NoticeIds[i];
                    });
                    listProcess = InvoicesByNotice.filter(function (e) {
                      return e.Status === 3 || e.Status === 6;
                    });

                    if (!(listProcess.length > 0)) {
                      _context5.next = 41;
                      break;
                    }

                    processedIds = InvoicesByNotice.map(function (e) {
                      return parseInt(e.Id);
                    });
                    processedIds = [].concat(_toConsumableArray(processedIds), _toConsumableArray(InvoicesByNotice.map(function (e) {
                      return e.IvoiceAdjustedId && parseInt(e.IvoiceAdjustedId) ? parseInt(e.IvoiceAdjustedId) : undefined;
                    })));
                    processedIds = [].concat(_toConsumableArray(processedIds), _toConsumableArray(InvoicesByNotice.map(function (e) {
                      return e.IvoiceChangeId && parseInt(e.IvoiceChangeId) ? parseInt(e.IvoiceChangeId) : undefined;
                    })));
                    MissingInvoiceIds = processedIds.filter(function (x) {
                      return x && !invoiceIds.includes(x);
                    });
                    _context5.next = 28;
                    return regeneratorRuntime.awrap((0, _InvoiceModel2.GetInvoicesByIds)(MissingInvoiceIds, customer.Id, customer.type));

                  case 28:
                    MissingInvoices = _context5.sent;
                    listAdjusted = listProcess.filter(function (e) {
                      return e.Status === 3;
                    });

                    if (!(listAdjusted.length > 0)) {
                      _context5.next = 35;
                      break;
                    }

                    _context5.next = 33;
                    return regeneratorRuntime.awrap((0, _InvoiceModel2.GetAdjustedLinks)(processedIds, customer.Id, customer.type));

                  case 33:
                    listAdjustedLinks = _context5.sent;
                    listAdjustedLinks.forEach(function (adj) {
                      var processed = invoices.find(function (e) {
                        return e.Id == adj.InvoiceId;
                      });
                      var process = invoices.find(function (e) {
                        return e.Id == adj.AdjustedInvoiceId;
                      });
                      if (!processed) return;
                      if (!process) process = MissingInvoices.find(function (e) {
                        return e.Id == adj.AdjustedInvoiceId;
                      });

                      if (ReportType == 1) {
                        processed.ProcessedInvoiceCode = process.IvoiceCode;
                        processed.ProcessedDate = process.DateofSign;
                      } else {
                        processed.LDXLy = adj.AdjustedContent;
                        processed.MHDSXLy = adj.AdjustedInvoiceId;
                        processed.NHDSXLy = FormatDate(process.DateofInvoice);
                      }

                      invoices[invoices.findIndex(function (i) {
                        return i.Id == processed.Id;
                      })] = processed;
                    });

                  case 35:
                    listReplaced = listProcess.filter(function (e) {
                      return e.Status === 6;
                    });

                    if (!(listReplaced.length > 0)) {
                      _context5.next = 41;
                      break;
                    }

                    _context5.next = 39;
                    return regeneratorRuntime.awrap((0, _InvoiceModel2.GetReplacedLinks)(processedIds, customer.Id, customer.type));

                  case 39:
                    listReplacedLinks = _context5.sent;
                    listReplacedLinks.forEach(function (rep) {
                      var processed = invoices.find(function (e) {
                        return e.Id == rep.InvoiceId;
                      });
                      var process = invoices.find(function (e) {
                        return e.Id == rep.ReplaceInvoiceId;
                      });
                      if (!processed) return;
                      if (!process) process = MissingInvoices.find(function (e) {
                        return e.Id == rep.ReplaceInvoiceId;
                      });

                      if (ReportType == 1) {
                        processed.ProcessedInvoiceCode = process.IvoiceCode;
                        processed.ProcessedDate = process.DateofSign;
                      } else {
                        processed.LDXLy = rep.ReplaceContent;
                        processed.MHDSXLy = rep.ReplaceInvoiceId;
                        processed.NHDSXLy = FormatDate(process.DateofInvoice);
                      }

                      invoices[invoices.findIndex(function (i) {
                        return i.Id == processed.Id;
                      })] = processed;
                    });

                  case 41:
                    i++;
                    _context5.next = 9;
                    break;

                  case 44:
                    if (!(!invoices || invoices.length < 1)) {
                      _context5.next = 46;
                      break;
                    }

                    return _context5.abrupt("return", "continue");

                  case 46:
                    details = (0, _InvoiceModel2.GetInvoiceDetailByInvoiceIds)(invoiceIds, customer.type);
                    result = [].concat(_toConsumableArray(result), [{
                      customer: customer,
                      invoices: invoices,
                      details: details
                    }]);

                  case 48:
                  case "end":
                    return _context5.stop();
                }
              }
            });
          };

          index = 0;

        case 4:
          if (!(index < Customers.length)) {
            _context6.next = 13;
            break;
          }

          _context6.next = 7;
          return regeneratorRuntime.awrap(_loop3(index));

        case 7:
          _ret = _context6.sent;

          if (!(_ret === "continue")) {
            _context6.next = 10;
            break;
          }

          return _context6.abrupt("continue", 10);

        case 10:
          index++;
          _context6.next = 4;
          break;

        case 13:
          ;
          return _context6.abrupt("return", result);

        case 17:
          _context6.prev = 17;
          _context6.t0 = _context6["catch"](1);
          throw _context6.t0;

        case 20:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 17]]);
};

var FormatDate = function FormatDate(date) {
  var day = date.getDate().toString().padStart(2, '0');
  var month = (date.getMonth() + 1).toString().padStart(2, '0');
  var year = date.getFullYear().toString().padStart(2, '0');
  return "".concat(day, "/").concat(month, "/").concat(year, "/");
};