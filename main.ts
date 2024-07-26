import { GameController } from "./HTMLElementGameTemplete/GameController";
import { GameElement } from "./HTMLElementGameTemplete/GameElement";

// frontend/main.js
fetch("/api/hello")
  .then((response) => response.json())
  .then((data) => {
    let app = document.getElementById("api");
    if (app != null) {
      app.innerText = data.message + " Connected";
    }
  });

// Client Script
const ws = new WebSocket("ws://localhost:7777/ws");
ws.onopen = () => {
  console.log("Connected to the server");
  document.getElementById("sendButton")!.addEventListener("click", sendMessage);
};

ws.onmessage = (event: MessageEvent) => {
  const messagesDiv = document.getElementById("messages")!;
  const newMessage = document.createElement("div");
  newMessage.textContent = `${event.data}`;
  messagesDiv.appendChild(newMessage);
};

ws.onclose = () => {
  console.log("Disconnected from the server");
};

function sendMessage() {
  const input = document.getElementById("messageInput") as HTMLInputElement;
  const message = input.value;
  console.log(message);
  ws.send(message);
  input.value = "";
}

let frame = 0;

function start() {
  new GameController("gameController", null, null);
  setInterval(update, 1000 / 60);
  console.log(window.innerWidth + " : " + window.innerHeight);
}

function update() {
  frame++;
  //SetStyle(assets["world"],(frame/128),(50+Math.sin(frame/128)*25),100 ,(frame*2),getRandomColor());
  for (let id in GameElement.GameElementColletion) {
    GameElement.GameElementColletion[id].update(
      GameElement.GameElementColletion[id]
    );
  }
}

start();
