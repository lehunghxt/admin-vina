"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Handler;

var _ReportController = require("../../Controller/ReportController");

var _ZipHelper = require("@Helper/ZipHelper");

var fs = require('fs');

function Handler(req, res, next) {
  switch (req.method) {
    case 'GET':
      Get(req, res, next);
      break;

    case 'POST':
      Post(req, res, next);
      break;

    case 'PUT':
      Put(req, res, next);
      break;

    case 'PATCH':
      Patch(req, res, next);
      break;

    case 'DELETE':
      Delete(req, res, next);
      break;

    default:
      NotSuported(req, res);
      break;
  }
}

function Get(req, res, next) {
  var _req$query, provinceid, fromdate, todate, taxcodes;

  return regeneratorRuntime.async(function Get$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$query = req.query, provinceid = _req$query.provinceid, fromdate = _req$query.fromdate, todate = _req$query.todate;
          console.log(req.query);
          if (req.session.User.UserType !== 1 && provinceid !== req.session.User.Ipconfig) res.json({
            error: "Mã số thuế này không thuộc khu vực quản lý!"
          });
          _context.next = 6;
          return regeneratorRuntime.awrap((0, _ReportController.PrepareTaxCode)(provinceid, fromdate, todate));

        case 6:
          taxcodes = _context.sent;
          res.json(taxcodes);
          _context.next = 14;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.status(500).send();

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
}

function Post(req, res, next) {
  var _req$body, customers, fromdate, todate, type, path, filePath, stat, readStream;

  return regeneratorRuntime.async(function Post$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body = req.body, customers = _req$body.customers, fromdate = _req$body.fromdate, todate = _req$body.todate, type = _req$body.type;
          _context2.next = 4;
          return regeneratorRuntime.awrap((0, _ReportController.ExportHaNoiData)(customers, fromdate, todate, type));

        case 4:
          path = "/ExportExcel/".concat(d.getDate().toString().padStart(2, '0'), "-").concat((d.getMonth() + 1).toString().padStart(2, '0'), "-").concat(d.getFullYear());
          _context2.next = 7;
          return regeneratorRuntime.awrap((0, _ZipHelper.ZipFolder)(path, path));

        case 7:
          filePath = path.join(__dirname + path + '.zip');
          stat = fs.statSync(filePath);
          res.writeHead(200, {
            'Content-Type': 'application/zip',
            'Content-Length': stat.size
          });
          readStream = fs.createReadStream(filePath);
          readStream.pipe(res);
          _context2.next = 18;
          break;

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.status(500).send();

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 14]]);
}

function Put(req, res, next) {
  return regeneratorRuntime.async(function Put$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          NotSuported(req, res);

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function Patch(req, res, next) {
  return regeneratorRuntime.async(function Patch$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          NotSuported(req, res);

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function Delete(req, res, next) {
  return regeneratorRuntime.async(function Delete$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          NotSuported(req, res);

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
}

function NotSuported(req, res) {
  return regeneratorRuntime.async(function NotSuported$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          res.status(404).json({
            message: "Not Found"
          });

        case 1:
        case "end":
          return _context6.stop();
      }
    }
  });
}