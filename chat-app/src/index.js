const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const Filter = require("bad-words");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = 3000;
const staticSource = path.join(__dirname, "../public");

app.use(express.static(staticSource));

io.on("connection", socket => {
  // Client
  socket.emit("message", "Welcome to the server!");

  // Everyone except the user
  socket.broadcast.emit("message", "New user on the server!");

  socket.on("sendMessage", (message, callback) => {
    const filter = new Filter();
    if (filter.isProfane(message)) return callback("Profanity is not allowed!");

    // Everyone
    io.emit("message", message);
    callback(message);
  });

  // When a client goes away
  socket.on("disconnect", () => {
    io.emit("message", "A user has left :(");
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
