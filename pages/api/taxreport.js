import { PrepareTaxCode, ExportHaNoiData, ExportPhuThoData } from '../../Controller/ReportController';
import { SplitArray } from '@Helper/ArrayHelper';
import { ZipFolder } from '@Helper/ZipHelper';
import axios from 'axios'

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
        // if (req.session.User.UserType !== 1 && provinceid !== req.session.User.Ipconfig)
        //     return res.json({ error: "Mã số thuế này không thuộc khu vực quản lý!" })
        var taxcodes = await PrepareTaxCode(provinceid, fromdate, todate);
        res.json(taxcodes)
    } catch (error) {
        console.log(error)
        res.status(500).send();
    }
}

async function Post(req, res, next) {
    try {
        const { customers, fromdate, todate, type, action } = req.body.params;
        const CurrentUser = req.session.User;
        switch (action) {
            case "Hanoi": {
                await ExportHaNoiData(customers, fromdate, todate, type, CurrentUser)
                const d = new Date();
                var path = `/public/ExportExcel/${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()}`
                await ZipFolder(path);
                return res.json({ file: `/ExportExcel/${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()}.zip` })
            }
            case "Phutho": {
                var response = [];
                var data = await ExportPhuThoData(customers, fromdate, todate);
                if (data) {
                    if (data.length > 5000) {
                        var requests = SplitArray(data, 5000);
                        for (let index = 0; index < array.length; index++) {
                            var request = requests[index];
                            var r = await SendPhuThoTax(request);
                            response = [...response, ...r];
                        }
                    }
                    else response = await SendPhuThoTax(data);
                }
                return res.json(response);
            }
        }
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

const SendPhuThoTax = async (data) => {
    data.MNCCap = "a7964cf9-fc1b-4bc2-86a3-f72bef6b5c51"
    await axios.post('https://cucthue.phutho.gov.vn/nbo/api/hoa-don', data);
}