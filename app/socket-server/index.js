const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("send_message", (data) => {
    console.log("Message received from client:", data);

    io.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start server on port 4000
server.listen(4000, () => {
  console.log("Socket.io server running on http://localhost:4000/socket-io");
});
