const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = 3000;
const staticSource = path.join(__dirname, "../public");

app.use(express.static(staticSource));

let count = 0;

// server (emit) -> client (receive) - countUpdated
// client (emit) -> server (receive) - increment
// Socket is an object that contains informatios about the connecion (new connection)
io.on("connection", socket => {
  // Sends data to the client
  console.log("Socket up!");
  socket.emit("countUpdated", count);

  // Receives a message from the cient and responds it
  socket.on("increment", () => {
    count++;
    // Message to the single connecion
    //socket.emit("countUpdated", count);

    // Message all connections
    io.emit("countUpdated", count);
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
