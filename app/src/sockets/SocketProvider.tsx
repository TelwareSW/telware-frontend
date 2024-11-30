import { useState, useEffect, ReactNode } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";

import {
  addMessage,
  editMessage,
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
  message: MessageInterface
) => {
  dispatch(addMessage(message));
};

const handleIsTyping = (dispatch: Dispatch, isTyping: boolean) => {
  dispatch(setIsTyping({ isTyping: isTyping }));
};

type SocketProviderProps = {
  children: ReactNode;
};

interface AcknowledgmentResponse {
  success: boolean;
  message: string;
  res: string;
}

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

    socket.on("RECEIVE_MESSAGE", (message: MessageInterface) => {
      handleIncomingMessage(dispatch, message);
    });

    socket.on(
      "PIN_MESSAGE_SERVER",
      (chatId: string, messageId: string, userId: string) => {
        dispatch(pinMessage({ chatId, messageId }));
      }
    );

    socket.on(
      "UNPIN_MESSAGE_SERVER",
      (chatId: string, messageId: string, userId: string) => {
        dispatch(unpinMessage({ chatId, messageId }));
      }
    );

    socket.on(
      "EDIT_MESSAGE_SERVER",
      (chatId: string, messageId: string, content: string) => {
        console.log("EDIT_MESSAGE_SERVER", chatId, messageId, content);
        dispatch(editMessage({ chatId, messageId, content }));
      }
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
    if (!isPending && chats?.length) {
      chats.forEach((chat) => {
        socket.emit("join", { chatId: chat.id });
      });
      console.log(
        "Joined all chats:",
        chats.map((chat) => chat.id)
      );
    }
  }, [isConnected, isPending, chats, socket]);

  const sendMessage = (sentMessage: MessageInterface) => {
    if (isConnected) {
      socket.emit(
        "SEND_MESSAGE",
        sentMessage,
        ({ success, message, res }: AcknowledgmentResponse) => {
          console.log("enta2 yasta b allah 3lek");
          console.log(res, message, success);
          if (success) {
            console.log(res, message);
            const id = res;
            handleIncomingMessage(dispatch, { ...sentMessage, id });
          }
        }
      );
    } else {
      console.warn("Cannot send message: not connected to socket server");
    }
  };

  const editMessageSocket = (
    messageId: string,
    content: string,
    chatId: string
  ) => {
    if (isConnected) {
      socket.emit("EDIT_MESSAGE_CLIENT", { messageId, content, chatId });
    } else {
      console.warn("Cannot edit message: not connected to socket server");
    }
  };

  const pinMessageSocket = (
    chatId: string,
    messageId: string,
    userId: string
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
    userId: string
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
        editMessage: editMessageSocket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
