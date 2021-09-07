const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const next = require("next");
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({});
const handle = nextApp.getRequestHandler();
const session = require("express-session");
const redirectLoop = require("express-redirect-loop");
const lib = require("./Helper/FileHelper");
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

global.__basedir = __dirname;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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

  //For next script and public
  app.get('/_next/*', (req, res) => {
    return handle(req, res);
  });
  app.get('/assets/*', (req, res) => {
    return handle(req, res);
  });
  app.get('/auth', (req, res) => {
    return handle(req, res);
  })
  app.post("/api/auth", async (req, res) => {
    try {
      return handle(req, res);
    } catch (error) {
      console.log({ error })
      res.status(500).send();
    }
  });

  app.all("*", (req, res) => {
    if (req.session.User) {
      console.log("Da dang nhap vao he thong");
      return handle(req, res);
    } else {
      console.log("Chua dang nhap vao he thong");
      return res.redirect("/auth");
    }
  });
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
