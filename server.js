const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const next = require("next");
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({});
const handle = nextApp.getRequestHandler();
const session = require("express-session");
const redirectLoop = require("express-redirect-loop");
const UserController = require("./Controller/UserController");
const lib = require("./helper");

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(
  redirectLoop({
    defaultPath: "/",
    maxRedirects: 5,
  })
);
app.use(app.urlencoded({ extended: true }));
app.use(app.json());
// =============================LISTENING SOCKET.IO===============================
io.on("connection", (socket) => {
  console.log("We have a new connection!!!");
  socket.emit("now", {
    message: "zeit",
  });
  socket.on("lockcustomer", async (taxcode) => {
    try {
      console.log("server da nghe duoc");
      var data = await lib.ReadFile("taxcodes.txt", "utf-8");
      var taxcodes = data ? data.split(",") : [];
      if (!taxcodes.includes(taxcode)) {
        taxcodes.push(taxcode);
        await lib.WriteFile("taxcodes.txt", taxcodes.join(","));
        io.emit("lockcustomer", taxcode);
      } else io.emit("lockcustomer", taxcode);
    } catch (error) {
      console.log("thong bao loi");
      console.log(error);
      socket.emit("error", error);
    }
  });
  socket.on("lockuser", async (taxcode) => {
    try {
      console.log(taxcode);
      var data = await UserController.GetIdLockUser(taxcode);
      var thisids = data.recordset.map((e) => e.Id);
      thisids = thisids.join(",");
      console.log(thisids);
      var ids = await lib.ReadFile("ids.txt", "utf-8");
      var ids = ids ? ids.split(",") : [];
      if (!ids.includes(thisids)) {
        ids.push(thisids);
        await lib.WriteFile("ids.txt", ids.join(","));
        io.emit("lockuser", thisids);
      } else io.emit("lockuser", thisids);
    } catch (err) {
      socket.emit("error", err);
    }
  });
});
//================================================================================
nextApp.prepare().then(() => {
  app.post("/taxcode", async function (req, res) {
    var { taxcode } = req.body;
    var taxcodes = await lib.ReadFile("taxcodes.txt");
    taxcodes = taxcodes.split(",");
    if (taxcodes && taxcodes.includes(taxcode)) {
      taxcodes = taxcodes.filter(function (value) {
        return value != taxcode;
      });
      await lib.WriteFile("taxcodes.txt", taxcodes.join(","));
      res.status(200).send();
    }
    res.status(202).send();
  });

  app.post("/auth/login", (req, res) => {
    const { username, password } = req.body;
    UserController.CheckLogin(username, password).then((data) => {
      UserController.getUserRoleById(data.Id).then(roles => {
        data.roles = roles;
        req.session.User = data;
        req.session.save((err) => {
          console.log(err);
        });
        return handle(req, res);
      })
    });
  });
  app.all("*", (req, res) => {
    if (req.session.User) {
      console.log("Da dang nhap vao he thong");
      return handle(req, res);
    } else {
      console.log("Chua dang nhap vao he thong");
      return nextApp.render(req, res, "/auth/login", req.query);
    }
  });
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
