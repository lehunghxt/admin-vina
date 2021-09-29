import { GetLog } from '@Controller/LogController'

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
    const { fromdate, todate, type, page } = req.query;
    try {
        var data = await GetLog(fromdate, todate, type, page);
        return res.json(data);
    } catch (error) {
        console.log(data);
        return res.status(500).send();
    }
}

async function Post(req, res, next) {
    NotSuported(req, res)
}

async function Put(req, res, next) {
    NotSuported(req, res)
}

async function Patch(req, res, next) {
    NotSuported(req, res)
}

async function Delete(req, res, next) {
    NotSuported(req, res)
}

async function NotSuported(req, res) {
    res.status(404).json({ message: "Not Found" });
}