import { useState, useEffect, ReactNode } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";

import { SocketContext } from "./SocketContext";
import { getSocket } from "utils/socket";
import {
  addMessage,
  setIsTyping,
  pinMessage,
  unpinMessage,
} from "@state/messages/chats";
import { MessageInterface } from "types/messages";

const handleIncomingMessage = (
  dispatch: Dispatch,
  message: MessageInterface,
  chatId: string
) => {
  dispatch(addMessage({ chatId, message }));
};

const handleIsTyping = (
  dispatch: Dispatch,
  isTyping: boolean,
  chatId: string
) => {
  dispatch(setIsTyping({ chatId, isTyping }));
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
      handleIncomingMessage(dispatch, message, message.chatId);
    });

    socket.on(
      "PIN_MESSAGE_SERVER",
      ({
        chatId,
        messageId,
        userId,
      }: {
        chatId: string;
        messageId: string;
        userId: string;
      }) => {
        console.log("UNPIN_MESSAGE_SERVER", chatId, messageId, userId);
        dispatch(pinMessage({ messageId, chatId }));
      }
    );

    socket.on(
      "UNPIN_MESSAGE_SERVER",
      ({
        chatId,
        messageId,
        userId,
      }: {
        chatId: string;
        messageId: string;
        userId: string;
      }) => {
        console.log("UNPIN_MESSAGE_SERVER", chatId, messageId, userId);
        dispatch(unpinMessage({ messageId, chatId }));
      }
    );

    socket.on("EDIT_MESSAGE_SERVER", (message) => {
      console.log("hii");

      console.log(message.chatId, message.messageId, message.content);

      // console.log("EDIT_MESSAGE_SERVER", { chatId, messageId, content });
      // dispatch(editMessage({ chatId, messageId, content }));
    });

    //TODO: check this
    socket.on("typing", (isTyping, message) =>
      handleIsTyping(dispatch, isTyping, message.chatId)
    );

    socket.emit("typing");
    return () => {
      socket.disconnect();

      socket.off("connect");
      socket.off("disconnect");
      socket.off("receive_message");
      socket.off("typing");
    };
  }, [dispatch, socket]);

  // useEffect(() => {
  //   if (!isPending && chats?.length) {
  //     chats.forEach((chat) => {
  //       socket.emit("join", { chatId: chat._id });
  //     });
  //     console.log(
  //       "Joined all chats:",
  //       chats.map((chat) => chat._id)
  //     );
  //   }
  // }, [isConnected, isPending, chats, socket]);

  const sendMessage = (sentMessage: MessageInterface) => {
    if (isConnected) {
      socket.emit(
        "SEND_MESSAGE",
        { ...sentMessage, isFirstTime: false, chatType: "private" },
        ({ success, message, res }: AcknowledgmentResponse) => {
          console.log("I'm inside send event!!");
          console.log(success);
          if (!success) {
            console.log(res);
          }
          if (success) {
            console.log(message);
            const _id = res;
            handleIncomingMessage(
              dispatch,
              {
                ...sentMessage,
                _id,
              },
              sentMessage.chatId
            );
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
      socket.emit(
        "EDIT_MESSAGE_CLIENT",
        { messageId, content, chatId },
        () => {}
      );
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
