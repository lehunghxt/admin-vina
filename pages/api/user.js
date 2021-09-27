import { GetListAccount, CreateAccount, UpdateAccount, UpdateAccountStatus, DeleteAccount } from '@Controller/UserController'

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
    var data = await GetListAccount(req.session.User.Id);
    return res.json(data);
}

async function Post(req, res, next) {
    try {
        var { user } = req.body;
        console.log(user)
        var data = await CreateAccount(user, req.session.User.Id);
        return res.json(data)
    } catch (error) {
        console.log(error);
        return res.status(500).send()
    }
}

async function Put(req, res, next) {
    try {
        var { user } = req.body;
        var data = await UpdateAccount(user);
        return res.json(data)
    } catch (error) {
        console.log(error);
        return res.status(500).send()
    }
}

async function Patch(req, res, next) {
    try {
        var { id, status } = req.body;
        var data = await UpdateAccountStatus(id, status);
        return res.json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).send()
    }
}

async function Delete(req, res, next) {
    try {
        var { id } = req.body;
        await DeleteAccount(id);
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send()
    }
}

async function NotSuported(req, res) {
    res.status(404).json({ message: "Not Found" });
}