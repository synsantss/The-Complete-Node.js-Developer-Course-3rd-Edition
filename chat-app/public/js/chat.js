const socket = io();

// Elements
const $messageForm = document.querySelector("#message-form");
const $messageFormInput = $messageForm.querySelector("input");
const $messageFormButton = $messageForm.querySelector("button");
const $messages = document.querySelector("#messages");

// Templates
const messageTemplate = document.querySelector("#message-template").innerHTML;

const autoScrool = () => {
  // New message element
  const $newMessage = $messages.lastElementChild;

  // Height of the new message
  const newMessageStyles = getComputedStyle($newMessage);
  const newMessageMargin = parseInt(newMessageStyles.marginBottom);
  const newMessageHeight = $newMessage.offsetHeight + newMessageMargin;

  // Visible height
  const visibleHeight = $messages.offsetHeight;

  // Height of messages container
  const containerHeight = $messages.scrollHeight;

  // How far have i scrow
  const scrollOffSet = $messages.scrollTop + visibleHeight;

  if (containerHeight - newMessageHeight <= scrollOffSet) {
    $messages.scrollTop = $messages.scrollHeight;
  }
};

socket.on("message", message => {
  console.log(message);
  const html = Mustache.render(messageTemplate, { message });
  $messages.insertAdjacentHTML("beforeend", html);
  autoScrool();
});

// Options
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
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

socket.emit("join", { username, room }, error => {
  if (error) {
    alert(error);
    location.href = "/";
  }
});
