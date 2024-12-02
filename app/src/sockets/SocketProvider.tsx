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
import { getSocket } from "utils/socket.tsx";
import { useChats } from "@features/chats/hooks/useChats";

const handleIncomingMessage = (
  dispatch: Dispatch,
  message: MessageInterface
) => {
  console.log(message);
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
  res: any;
}

function SocketProvider({ children }: SocketProviderProps) {
  const [isConnected, setIsConnected] = useState(false);
  const dispatch = useDispatch();
  const socket = getSocket();

  const { chats, isPending } = useChats();

  useEffect(() => {
    if (socket) {
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
        console.log("inside recieve");
        console.log(message);

        handleIncomingMessage(dispatch, message);
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

      socket.on("EDIT_MESSAGE_SERVER", (message: MessageInterface) => {
        console.log(message);

        console.log("hii");
        // const {message}

        // console.log(message.chatId, message._id, message.content);

        // console.log("EDIT_MESSAGE_SERVER", { chatId, messageId, content });
        dispatch(
          editMessage({
            chatId: message.chatId,
            messageId: message._id,
            content: message.content,
          })
        );
      });

      socket.on("typing", (isTyping) => handleIsTyping(dispatch, isTyping));
      socket.emit("typing");
      return () => {
        socket.disconnect();

        socket.off("connect");
        socket.off("disconnect");
        socket.off("receive_message");
        socket.off("typing");
      };
    }
  }, [dispatch, socket]);

  useEffect(() => {
    if (!isPending && chats?.length && socket) {
      chats.forEach((chat) => {
        socket.emit("join", { chatId: chat._id });
      });
      console.log(
        "Joined all chats:",
        chats.map((chat) => chat._id)
      );
    }
  }, [isConnected, isPending, chats, socket]);

  const sendMessage = (sentMessage: MessageInterface) => {
    if (isConnected && socket) {
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
            console.log(sentMessage);
            console.log(message);
            const _id = res.messageId;
            console.log(res);
            handleIncomingMessage(dispatch, { ...sentMessage, _id });
          }
        }
      );
    } else {
      console.warn("Cannot send message: not connected to socket server");
    }
  };

  // const editMessageSocket = (
  //   messageId: string,
  //   content: string,
  //   chatId: string
  // ) => {
  //   if (isConnected) {
  //     console.log(messageId, content, chatId);

  //     socket.emit(
  //       "EDIT_MESSAGE_CLIENT",
  //       { messageId, content, chatId },
  //       () => {}
  //     );
  //   } else {
  //     console.warn("Cannot edit message: not connected to socket server");
  //   }
  // };

  const editMessageSocket = (
    messageId: string,
    content: string,
    chatId: string
  ) => {
    if (isConnected && socket) {
      socket.emit(
        "EDIT_MESSAGE_CLIENT",
        { messageId, content, chatId },
        (response: any) => {
          if (response.success) {
            console.log("Message edited successfully:", response.res.message);
          } else {
            console.error("Failed to edit message:", response.error);
          }
        }
      );
    }
  };

  const pinMessageSocket = (
    chatId: string,
    messageId: string,
    userId: string
  ) => {
    if (isConnected && socket) {
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
    if (isConnected && socket) {
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
