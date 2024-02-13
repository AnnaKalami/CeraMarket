const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const http = require("http");
// const saveMessage = require('../server/chatsHelper')
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

app.use(express.static(path.join(__dirname, 'public')));7
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use(verifyAccessToken);

app.use("/", indexRouter);

io.on("connection", (socket) => {
  console.log("a user connected");
  // socket.join(`${message.chat_id}`);
  // socket.emit('message', 'Добро пожаловать!');
  socket.on("message", async (msg) => {
    console.log(msg);
    // try {
      // const savedMessage = await saveMessage(msg, userId);
      // console.log(savedMessage, 'SAVED MESSAGE app.js');
    // io.to(`${message.chat_id}`).emit('message', msg)
      socket.emit('message', msg);
      // socket.emit('message', savedMessage);
  // } catch (error) {
  //     console.error('Ошибка при обработке сообщения:', error);
  // }
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Сервер работает на ${PORT} порту! ${process.env.NODE_ENV}`);
});
