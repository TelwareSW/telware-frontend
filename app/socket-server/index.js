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

  socket.on("SEND_MESSAGE", (data, callback) => {
    console.log("Message received from client:", data);
    callback({ success: true, message: "sent seccussfully", res: Date.now() });
    socket.join(data.chatId);
    socket.to(data.chatId).emit("RECEIVE_MESSAGE", { ...data, id: Date.now() });
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

  socket.on("EDIT_MESSAGE_CLIENT", ({ messageId, content, chatId }) => {
    const room = io.sockets.adapter.rooms.get(chatId);

    if (room) {
      console.log(`Room ${chatId} members:`, [...room]);
    } else {
      console.log(`No members in room: ${chatId}`);
    }
    socket.join(chatId);
    console.log("EDIT_MESSAGE_CLIENT:", messageId, content, chatId);
    io.to(chatId).emit("EDIT_MESSAGE_SERVER", chatId, messageId, content); //TODO: handle user disjoin the room for some reason
  });
});

server.listen(PORT, () => {
  console.log(`Socket.io server running on http://localhost:${PORT}`);
});
