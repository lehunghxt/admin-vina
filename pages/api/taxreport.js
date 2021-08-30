import { PrepareTaxCode } from '../../Controller/ReportController';

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
    NotSuported(req, res);
}

async function Post(req, res, next) {
    try {
        const { provinceid, fromdate, todate, taxcode } = req.body;
        if (req.session.User.UserType !== 1 && provinceid !== req.session.User.Ipconfig)
            res.json({ error: "Mã số thuế này không thuộc khu vực quản lý!" })
        var taxcodes = await PrepareTaxCode(provinceid, fromdate, todate, taxcode);
        res.json(taxcodes)
    } catch (error) {
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