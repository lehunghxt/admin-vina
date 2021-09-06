import { PrepareTaxCode, ExportHaNoiData } from '../../Controller/ReportController';
import { ZipFolder } from '@Helper/ZipHelper'
const fs = require('fs')

export default function Handler(req, res, next) {
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
        default: NotSuported(req, res)
            break;
    }
}

async function Get(req, res, next) {
    try {
        const { provinceid, fromdate, todate } = req.query;
        console.log(req.query)
        if (req.session.User.UserType !== 1 && provinceid !== req.session.User.Ipconfig)
            res.json({ error: "Mã số thuế này không thuộc khu vực quản lý!" })
        var taxcodes = await PrepareTaxCode(provinceid, fromdate, todate);
        res.json(taxcodes)
    } catch (error) {
        console.log(error)
        res.status(500).send();
    }
}

async function Post(req, res, next) {
    try {
        const { customers, fromdate, todate, type } = req.body.params;
        await ExportHaNoiData(customers, fromdate, todate, type)
        // const d = new Date();
        // console.log(d);
        // var path = `/ExportExcel/${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()}`
        // await ZipFolder(path, path);
        // var filePath = path.join(__dirname + path + '.zip');
        // var stat = fs.statSync(filePath);
        // res.writeHead(200, {
        //     'Content-Type': 'application/zip',
        //     'Content-Length': stat.size
        // });
        // var readStream = fs.createReadStream(filePath);
        // readStream.pipe(res);
    } catch (error) {
        console.log(error)
        res.status(500).send();
    }
}

async function Put(req, res, next) {
    NotSuported(req, res);
}

async function Patch(req, res, next) {
    NotSuported(req, res);
}

async function Delete(req, res, next) {
    NotSuported(req, res);
}

async function NotSuported(req, res) {
    res.status(404).json({ message: "Not Found" });
}