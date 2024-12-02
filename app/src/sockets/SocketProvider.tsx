import { useState, useEffect, ReactNode } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";

import { SocketContext } from "./SocketContext";
import { getSocket } from "utils/socket";

import { MessageInterface } from "types/messages";
import {
  addMessage,
  setIsTyping,
  pinMessage,
  unpinMessage,
  editMessage,
} from "@state/messages/chats";

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
  res: any;
}

function SocketProvider({ children }: SocketProviderProps) {
  const [isConnected, setIsConnected] = useState(false);
  const dispatch = useDispatch();
  const socket = getSocket();

  useEffect(() => {
    if (socket) {
      socket.connect();

      //TODO: remove and make sure it still works
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

      socket.on(
        "EDIT_MESSAGE_SERVER",
        (chatId: string, messageId: string, content: string) => {
          console.log("EDIT_MESSAGE_SERVER", chatId, messageId, content);
          dispatch(editMessage({ chatId, messageId, content }));
        }
      );

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
    }
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
            console.log(message);
            const _id = res.messageId;
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
    if (isConnected && socket) {
      socket.emit(
        "EDIT_MESSAGE_CLIENT",
        { messageId, content, chatId },
        (response: any) => {
          if (response.success) {
            console.log("Message edited successfully:", response.res.message);
            dispatch(
              editMessage({
                chatId: response.res.message.chatId,
                messageId: response.res.message._id,
                content: response.res.message.content,
              })
            );
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
