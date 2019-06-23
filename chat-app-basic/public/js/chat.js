const socket = io();

// Receives data to the client
socket.on("countUpdated", count => {
  console.log("The count has been updated!", count);
});

document.querySelector("#increment").addEventListener("click", () => {
  console.log("Clicked!");
  // Sends data to the server
  socket.emit("increment");
});
