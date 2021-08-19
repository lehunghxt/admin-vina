const express = require("express");
const next = require("next");
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({});
const handle = app.getRequestHandler();
const bodyParser = require("body-parser");
const session = require("express-session");
const UserController = require("./Controller/UserController");

app.prepare().then(() => {
  const server = express();
  server.use(
    session({
      secret: "secret",
      resave: true,
      saveUninitialized: true,
    })
  );
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json());

  // server.get('/', (req, res) => {
  //   if(!req.session.User){
  //     return app.render(req, res, '/auth/login', req.query)
  //   }
  //   return app.render(req, res, '/index', req.query)
  // })

  // server.get('/auth/login', (req, res) => {
  //   if(req.session.User){
  //     return app.render(req, res, '/index', req.query)
  //   }
  //   return app.render(req, res, '/auth/login', req.query)
  // })
  

  server.post("/auth/login", (req, res) => {
    const { username, password } = req.body;
    UserController.CheckLogin(username, password).then((data) => {
      req.session.User = data;
      req.session.save(err => {
        console.log(err)
      });
      return handle(req, res);
    });
  });
  server.all("*", (req, res) => {
    console.log(req.session.User);
    if(req.session.User == undefined){
      return app.render(req, res, '/auth/login', req.query)
    }
    return handle(req, res);
  });
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
