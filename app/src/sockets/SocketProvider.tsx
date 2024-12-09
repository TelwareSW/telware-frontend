import { useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { useQueryClient } from "@tanstack/react-query";

import { SocketContext } from "./SocketContext";
import { useSocket } from "utils/socket";

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
  res: {
    messageId: string;
    message: MessageInterface;
  };
}

interface AckCreateGroup {
  success: boolean;
  message: string;
  data: {
    _id: string;
  };
}

function SocketProvider({ children }: SocketProviderProps) {
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = useSocket();
  const queryClient = useQueryClient();

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

      socket.on("RECEIVE_MESSAGE", (message) => {
        console.log("RECEIVED_MESSAGE");
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
        ({
          chatId,
          content,
          id,
        }: {
          chatId: string;
          content: string;
          id: string;
        }) => {
          console.log("EDIT_MESSAGE_SERVER", chatId, id, content);
          dispatch(editMessage({ chatId, messageId: id, content }));
        }
      );

      socket.on("JOIN_GROUP_CHANNEL", () => {
        queryClient.invalidateQueries({ queryKey: ["chats"] });
      });

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

  const sendMessage = (sentMessage: MessageInterface) => {
    if (isConnected && socket) {
      const messageToSend = {
        ...sentMessage,
        isFirstTime: false,
        chatType: "private",
        threadMessages: [],
      };
      console.log("messageToSend", messageToSend);
      socket.emit(
        "SEND_MESSAGE",
        messageToSend,
        ({ success, message, res }: AcknowledgmentResponse) => {
          console.log("I'm inside send event!!");
          console.log(success);
          if (!success) {
            console.log("Failed to send", res);
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
        (response: {
          success: boolean;
          res: { message: MessageInterface };
          error?: string;
        }) => {
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

  function createGroupOrChannel({
    type,
    name,
    members,
  }: {
    type: "group" | "channel";
    name: string;
    members: string[];
  }) {
    if (isConnected && socket) {
      console.log(type, members, name);
      socket.emit(
        "CREATE_GROUP_CHANNEL",
        { type, name, members },
        ({ success, data }: AckCreateGroup) => {
          console.log("CREATE_GROUP_CHANNEL_CALLBACK");
          if (success) {
            console.log(data._id);
            navigate(`/${data._id}`);
          }
          if (!success) {
            console.log("failed creating group");
          }
        }
      );
    } else {
      console.warn(
        "Cannot create group or channel: not connected to socket server"
      );
    }
  }

  return (
    <SocketContext.Provider
      value={{
        isConnected,
        sendMessage,
        pinMessage: pinMessageSocket,
        unpinMessage: unpinMessageSocket,
        editMessage: editMessageSocket,
        createGroupOrChannel,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
