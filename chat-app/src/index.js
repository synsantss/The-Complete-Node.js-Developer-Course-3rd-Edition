const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const Filter = require("bad-words");
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom
} = require("./utils/user");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = 3000;
const staticSource = path.join(__dirname, "../public");

app.use(express.static(staticSource));

// socket.emit -> The user
// io.emit -> Everyone
// sockek.broadcast.emit -> Everyone except the user
// io.to.emit -> Everybody in specific group
// sockek.broadcast.to().emit -> Everyone in specific group except the user

io.on("connection", socket => {
  // Client
  socket.emit("message", "Welcome to the server!");

  // Everyone except the user
  socket.broadcast.emit("message", "New user on the server!");

  socket.on("join", ({ username, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, username, room });

    if (error) {
      return callback(error);
    }

    socket.join(user.room);

    socket.emit("message", "Welcome to the group!");
    socket.broadcast
      .to(user.room)
      .emit("message", `${user.username} has joined the group!`);
    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    const filter = new Filter();
    if (filter.isProfane(message)) return callback("Profanity is not allowed!");

    // Everyone
    io.to(user.room).emit("message", message);
    callback(message);
  });

  // When a client goes away
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", `${user.username} has left :(`);
    }
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
