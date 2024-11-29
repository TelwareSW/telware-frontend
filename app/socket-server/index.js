const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const PORT = 4000;

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

    socket.broadcast.emit("receive_message", data);
  });

  socket.on("join", ({ chatId }) => {
    socket.join(chatId);
    console.log(`User ${socket.id} joined chat ${chatId}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });

  socket.on("PIN_MESSAGE_CLIENT", ({ messageId, chatId, userId }) => {
    console.log("PIN_MESSAGE_CLIENT", messageId, chatId, userId);
    socket.broadcast
      .to(chatId)
      .emit("PIN_MESSAGE_SERVER", { messageId, chatId, userId });
  });

  socket.on("UNPIN_MESSAGE_CLIENT", ({ messageId, chatId, userId }) => {
    console.log("UNPIN_MESSAGE_CLIENT", messageId, chatId, userId);
    socket.broadcast
      .to(chatId)
      .emit("UNPIN_MESSAGE_SERVER", { messageId, chatId, userId });
  });
});

server.listen(PORT, () => {
  console.log(`Socket.io server running on http://localhost:${PORT}`);
});
