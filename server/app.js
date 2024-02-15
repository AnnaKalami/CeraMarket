const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const http = require("http");
const saveMessage = require("../server/chatsHelper");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const indexRouter = require("./routes/index.routes");
const { verifyAccessToken } = require("./middleware/verifyJWT");

app.use(cookieParser());
app.use(express.urlencoded({ extended: "true" }));
app.use(express.json());

// app.use(
//   express.static(
//     process.env.NODE_ENV === 'production'
//     ? path.join(__dirname, "public")
//     : path.join(__dirname, "../client/dist")
//   )
// )


app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "../client/dist")));

app.use(verifyAccessToken);

app.use("/", indexRouter);

app.get('*', (req, res) => {
  const filePath = path.join(__dirname, './dist/index.html');
  res.sendFile(filePath)
});


io.on("connection", (socket) => {
  const idTmpRoom = socket.sids ? socket.sids.join("") : "999";
  socket.join(idTmpRoom);
  socket.on("message", async (msg, userId, chatId) => {
    try {
      const newMsg = await saveMessage(msg, userId, chatId);
      io.to(idTmpRoom).emit("message", newMsg);
    } catch (error) {
      console.error("Ошибка при обработке сообщения:", error);
    }
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Сервер работает на ${PORT} порту! ${process.env.NODE_ENV}`);
});
