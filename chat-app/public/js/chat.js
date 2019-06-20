const socket = io();

// Elements
const $messageForm = document.querySelector("message-form");
const $messageFormInput = document.querySelector("input");
const $messageFormButton = document.querySelector("button");

socket.on("message", message => {
  console.log(message);
});

document.querySelector("#message-form").addEventListener("submit", e => {
  e.preventDefault();

  $messageFormButton.setAttribute("disabled", "disabled");

  const message = e.target.elements.message.value;

  socket.emit("sendMessage", message, callbackMessage => {
    $messageFormButton.removeAttribute("disabled");
    $messageFormInput.value = "";
    $messageFormInput.focus();
    console.log("This message was delivered:", callbackMessage);
  });
});

document.querySelector("#send-location").addEventListener("click", () => {
  if (!navigator.geolocation)
    return alert("Geolocation is not supported by your browser");

  navigator.geolocation.getCurrentPosition(position => {
    console.log(position);
  });
});
