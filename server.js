// server.js
const express = require("express");
const app = express();
const http = require("http").createServer(app);

const { Server } = require("socket.io");
const io = new Server(http);

// Serwujemy folder "public" jako statyczny:
app.use(express.static("public"));

// Socket.IO - proste logowanie i broadcast wiadomości
io.on("connection", (socket) => {
  console.log("Nowy użytkownik połączony:", socket.id);

  socket.on("chat message", (data) => {
    console.log("Otrzymano wiadomość:", data);
    io.emit("chat message", data); // rozsyła do wszystkich
  });

  socket.on("disconnect", () => {
    console.log("Użytkownik rozłączony:", socket.id);
  });
});

// Uruchom serwer na porcie 3000
http.listen(3000, () => {
  console.log("Serwer działa na porcie 3000");
});
