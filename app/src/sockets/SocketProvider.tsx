import { useState, useEffect, ReactNode } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";

import {
  addMessage,
  MessageInterface,
  pinMessage,
  setIsTyping,
  unpinMessage,
} from "@state/messages/messages";

import { SocketContext } from "./SocketContext";
import { getSocket } from "utils/socket";
import { useChats } from "@features/chats/hooks/useChats";

const handleIncomingMessage = (
  dispatch: Dispatch,
  message: MessageInterface,
) => {
  dispatch(addMessage(message));
};

const handleIsTyping = (dispatch: Dispatch, isTyping: boolean) => {
  dispatch(setIsTyping({ isTyping: isTyping }));
};

type SocketProviderProps = {
  children: ReactNode;
};

function SocketProvider({ children }: SocketProviderProps) {
  const [isConnected, setIsConnected] = useState(false);
  const dispatch = useDispatch();
  const socket = getSocket();

  const { chats, isPending } = useChats();

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      const engine = socket.io.engine;
      setIsConnected(true);
      console.log("connected");

      engine.on("close", (reason) => {
        console.log(reason);
      });
    });

    socket.on("receive_message", (message: MessageInterface) => {
      handleIncomingMessage(dispatch, message);
    });

    socket.on(
      "PIN_MESSAGE_SERVER",
      (chatId: string, messageId: string, userId: string) => {
        dispatch(pinMessage({ chatId, messageId }));
      },
    );

    socket.on(
      "UNPIN_MESSAGE_SERVER",
      (chatId: string, messageId: string, userId: string) => {
        dispatch(unpinMessage({ chatId, messageId }));
      },
    );

    socket.on("typing", (isTyping) => handleIsTyping(dispatch, isTyping));
    socket.emit("typing");
    return () => {
      socket.disconnect();

      socket.off("connect");
      socket.off("disconnect");
      socket.off("receive_message");
      socket.off("typing");
    };
  }, [dispatch, socket]);

  useEffect(() => {
    if (isConnected && !isPending && chats?.length) {
      chats.forEach((chat) => {
        socket.emit("join", { chatId: chat.id });
      });
      console.log(
        "Joined all chats:",
        chats.map((chat) => chat.id),
      );
    }
  }, [isConnected, isPending, chats, socket]);

  const sendMessage = (message: MessageInterface) => {
    if (isConnected) {
      socket.emit("send_message", message);
    } else {
      console.warn("Cannot send message: not connected to socket server");
    }
  };

  const pinMessageSocket = (
    chatId: string,
    messageId: string,
    userId: string,
  ) => {
    if (isConnected) {
      socket.emit("PIN_MESSAGE_CLIENT", { messageId, chatId, userId });
    } else {
      console.warn("Cannot pin message: not connected to socket server");
    }
  };

  const unpinMessageSocket = (
    chatId: string,
    messageId: string,
    userId: string,
  ) => {
    if (isConnected) {
      socket.emit("UNPIN_MESSAGE_CLIENT", { messageId, chatId, userId });
    } else {
      console.warn("Cannot unpin message: not connected to socket server");
    }
  };

  return (
    <SocketContext.Provider
      value={{
        isConnected,
        sendMessage,
        pinMessage: pinMessageSocket,
        unpinMessage: unpinMessageSocket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
