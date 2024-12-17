import { useState, useEffect, ReactNode, useCallback } from "react";
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
  deleteMessage as deleteMessageAction,
} from "@state/messages/chats";
import { connectToPeer, createAnswer, startCall } from "@features/calls/call";

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
  }, [dispatch, queryClient, socket]);

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
  const startConnection = async () => {
    console.log("kkk");
    const offer = await connectToPeer();
    if (isConnected && socket) {
      console.log(offer);
      socket.emit("SEND_OFFER", { offer });
    } else {
      console.warn("Cannot unpin message: not connected to socket server");
    }
  };
  const sendAnswer = useCallback(
    (
      answer: string,
      callback?: (response: { success: boolean; error?: string }) => void
    ) => {
      if (isConnected && socket) {
        socket.emit(
          "SEND_ANSWER",
          { answer },
          (response: { success: boolean; error?: string }) => {
            if (callback) {
              callback(response);
            } else if (!response.success) {
              console.error("Failed to send answer:", response.error);
            } else {
              console.log("Answer sent successfully");
            }
          }
        );
      } else {
        console.warn("Cannot send answer: not connected to socket server");
      }
    },
    [isConnected, socket]
  );
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

      // TODO Fix: This makes message got received 3 times
      // socket.on("RECEIVE_MESSAGE", (message) => {
      //   console.log("inside recieve");
      //   console.log(message);
      //   handleIncomingMessage(dispatch, message, message.chatId);
      // });
      socket.on("RECIEVE_OFFER", async (offer) => {
        console.log(offer);
        const answer = await createAnswer(offer);
        sendAnswer(answer);
      });
      socket.on("RECEIVE_ANSWER", async (answer: string) => {
        console.log(answer);
        await startCall(answer);
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

      socket.on(
        "DELETE_MESSAGE_SERVER",
        ({ chatId, id }: { chatId: string; id: string }) => {
          dispatch(deleteMessageAction({ messageId: id, chatId }));
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
        socket.off("RECIEVE_OFFER");
      };
    }
  }, [dispatch, sendAnswer, socket]);

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

  function deleteMessage({
    messageId,
    chatId,
  }: {
    messageId: string;
    chatId: string;
  }) {
    if (isConnected && socket) {
      socket.emit(
        "DELETE_MESSAGE_CLIENT",
        { messageId, chatId },
        ({ success }: { success: boolean }) => {
          if (success) {
            dispatch(deleteMessageAction({ messageId, chatId }));
          } else {
            console.log("Failed to delete message");
          }
        }
      );
    } else {
      console.warn("Cannot delete message: not connected to socket server");
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
        startConnection,
        createGroupOrChannel,
        deleteMessage,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
