import { CheckLogin, GetUserRoleById } from '@Controller/UserController'

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
    const { username, password } = req.body;
    var user = await CheckLogin(username, password);
    if (user) {
        console.time("MyTimer");
        var roles = await GetUserRoleById(user.Id);
        console.timeLog("MyTimer");
        if (roles && roles.length > 0) {
            user.Roles = roles;
            user.Password = undefined;
            req.session.User = user;
            req.session.save();
            return res.json(user)
        }
    }
    return res.json(null);
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