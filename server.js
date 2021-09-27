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
const {WriteFile, ReadFile} = require("./Helper/FileHelper");
const {LogActionKickUser, LogActionBlockUser} = require("./Helper/LogAction");

const sessionMidlleWare = session({
  secret: "VinaCA@123!@#",
  resave: true,
  saveUninitialized: true,
})

app.use(sessionMidlleWare);
app.use(
  redirectLoop({
    defaultPath: "/",
    maxRedirects: 5,
  })
);

io.use((socket, next) => {
  sessionMidlleWare(socket.handshake, socket.handshake.res || {}, next);
})

global.__basedir = __dirname;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// =============================LISTENING SOCKET.IO===============================
const rooms = ['EHD7', 'EHD10', 'HD7', 'HD10']
io.on("connection", (socket) => {
  const key = socket.handshake.query.tọken;
  switch (key) {
    case "EHD7": socket.join('EHD7')
      break;
    case "EHD10": socket.join('EHD10')
      break;
    case "HD7": socket.join('HD7')
      break;
    case "HD10": socket.join('HD10')
      break;
    default: {
      socket.join('master')
    }
      break;
  }
  console.log("We have a new connection!!!");
  socket.on("lockcustomer", async ({taxcode, User}) => {
    try {
        await LogActionBlockUser(User, taxcode);//LogAction
        var data = await ReadFile("taxcodes.txt", "utf-8");
        var taxcodes = data ? data.split(",") : [];
        if (!taxcodes.includes(taxcode)) {
            taxcodes.push(taxcode);
            await WriteFile("taxcodes.txt", taxcodes.join(","));
            io.emit("lockcustomer", taxcode);
        } else 
            io.emit("lockcustomer", taxcode);
    } catch (error) {
        console.log('=========================');
        console.log(error);
        console.log('=========================');
        socket.emit("error", 'Đã có lỗi xảy ra.');
    }
  });
  socket.on("lockuser", async ({taxcode, User}) => {
    try {
        const {GetIdLockUser} = require('./Controller/UserController');
        var data = await GetIdLockUser(taxcode);
        if(data.length > 0){
            var thisids = data.map((e) => e.Id);
            thisids = thisids.join(",");
            var ids = await ReadFile("ids.txt", "utf-8");
            var ids = ids ? ids.split(",") : [];
            await LogActionKickUser(User, thisids);//LogAction
            if (!ids.includes(thisids)) {
                ids.push(thisids);
                await WriteFile("ids.txt", ids.join(","));
                io.emit("lockuser", thisids);
            } else io.emit("lockuser", thisids);
        }else {
            socket.emit("error", 'Không tìm thấy khách hàng !');
        }
    } catch (err) {
        console.log(err);
        socket.emit("error", 'Đã có lỗi xảy ra.');
    }
  });
  socket.on('ClientCount', async () => {
    var count = [];
    var time = (new Date()).toLocaleTimeString();

    // rooms.forEach(async element => {
    //   var len = (await io.in(element).fetchSockets()).length;
    //   console.log(len)
    //   count.push({
    //     server: element, time: time, value: (len - 1)
    //   })
    // });
    for await (const room of rooms) {
      var len = (await io.in(room).fetchSockets()).length;
      count.push({
        server: room, time: time, value: len
      })
    }
    io.in('master').emit("ClientCount", count);
  });
  socket.on('disconnect', () => {
  })
});
//================================================================================
nextApp.prepare().then(() => {
  app.post("/taxcode", async function (req, res) {
    var { taxcode } = req.body;
    var taxcodes = await ReadFile("taxcodes.txt");
    taxcodes = taxcodes.split(",");
    if (taxcodes && taxcodes.includes(taxcode)) {
      taxcodes = taxcodes.filter(function (value) {
        return value != taxcode;
      });
      await WriteFile("taxcodes.txt", taxcodes.join(","));
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
