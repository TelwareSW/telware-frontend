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
import { useEncryptDecrypt } from "@features/chats/hooks/useEncryptDecrypt";
import toast from "react-hot-toast";
import { useChat } from "@features/chats/hooks/useChat";

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
  error?: string;
  data: MessageInterface;
}

interface AckCreateGroup {
  success: boolean;
  message: string;
  data?: {
    _id: string;
  };
  error?: string;
}

function SocketProvider({ children }: SocketProviderProps) {
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = useSocket();
  const queryClient = useQueryClient();

  const { decrypt } = useEncryptDecrypt();
  const { chat } = useChat();

  useEffect(() => {
    if (!socket) return;

    socket.connect();

    const onConnect = () => {
      setIsConnected(true);
      console.log("Socket connected");

      socket.io.engine.on("close", (reason) => {
        console.log("Socket connection closed:", reason);
      });
    };

    const onReceiveMessage = (message: MessageInterface) => {
      console.log("Received message:", message);
      if (!chat) {
        console.warn("No chat context available for decryption");
        return;
      }

      if (chat.type === "private") {
        decrypt({
          message: message.content,
          key: chat.encryptionKey!,
          iv: chat.initializationVector!,
        })
          .then((content) => {
            console.log("Decrypted content:", content);
            handleIncomingMessage(
              dispatch,
              { ...message, content: content as string },
              message.chatId
            );
          })
          .catch((error) => {
            console.error("Decryption failed:", error);
          });
      } else {
        handleIncomingMessage(dispatch, message, message.chatId);
      }
    };

    socket.on("connect", onConnect);
    socket.on("RECEIVE_MESSAGE", onReceiveMessage);
    socket.on("PIN_MESSAGE_SERVER", ({ chatId, messageId, userId }) => {
      console.log("PIN_MESSAGE_SERVER", chatId, messageId, userId);
      dispatch(pinMessage({ messageId, chatId }));
    });
    socket.on("UNPIN_MESSAGE_SERVER", ({ chatId, messageId, userId }) => {
      console.log("UNPIN_MESSAGE_SERVER", chatId, messageId, userId);
      dispatch(unpinMessage({ messageId, chatId }));
    });
    socket.on("EDIT_MESSAGE_SERVER", ({ chatId, content, id }) => {
      console.log("EDIT_MESSAGE_SERVER", chatId, id, content);
      dispatch(editMessage({ chatId, messageId: id, content }));
    });

    socket.on("JOIN_GROUP_CHANNEL", () => {
      console.log("YOU'RE ADDED TO GROUP");
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    });
    socket.on("ADD_ADMINS_SERVER", () => {
      console.log("NEW ADMINS ARE ADDED");
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    });
    socket.on("ADD_MEMBERS_SERVER", () => {
      console.log("NEW MEMBERS ARE ADDED");
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    });

    socket.on("typing", (isTyping, message) =>
      handleIsTyping(dispatch, isTyping, message.chatId)
    );

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
      "DELETE_MESSAGE_SERVER",
      ({ chatId, id }: { chatId: string; id: string }) => {
        dispatch(deleteMessageAction({ messageId: id, chatId }));
      }
    );

    socket.on(
      "LEAVE_GROUP_CHANNEL_SERVER",
      ({ chatId, memberId }: { chatId: string; memberId: string }) => {
        console.log("LEAVE_GROUP_CHANNEL_SERVER", chatId, memberId);
        queryClient.invalidateQueries({ queryKey: ["chats"] });
      }
    );

    socket.on("REMOVE_MEMBERS_SERVER", () => {
      console.log("REMOVE_MEMBERS_SERVER");
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    });

    socket.emit("typing");

    return () => {
      console.log("Cleaning up socket listeners");

      socket.disconnect();

      socket.off("connect", onConnect);
      socket.off("RECEIVE_MESSAGE", onReceiveMessage);
      socket.off("PIN_MESSAGE_SERVER");
      socket.off("UNPIN_MESSAGE_SERVER");
      socket.off("EDIT_MESSAGE_SERVER");
      socket.off("JOIN_GROUP_CHANNEL");
      socket.off("typing");
      socket.io.engine.off("close");
    };
  }, [socket, chat, decrypt, dispatch, queryClient]);

  const sendMessage = (sentMessage: MessageInterface) => {
    if (isConnected && socket) {
      console.log("messageToSend", sentMessage);
      socket.emit(
        "SEND_MESSAGE",
        sentMessage,
        ({ success, data, error, message }: AcknowledgmentResponse) => {
          if (!success) {
            console.log(message);
            console.log("Failed to send", error);
          }
          if (success) {
            const _id = data._id;
            if (!chat) return;

            if (chat?.type === "private") {
              decrypt({
                message: sentMessage.content,
                key: chat?.encryptionKey!,
                iv: chat?.initializationVector!,
              }).then((content) => {
                handleIncomingMessage(
                  dispatch,
                  { ...sentMessage, content: content as string, _id },
                  sentMessage.chatId
                );
              });
            } else {
              handleIncomingMessage(
                dispatch,
                { ...sentMessage, _id },
                sentMessage.chatId
              );
            }
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
      socket.emit(
        "CREATE_GROUP_CHANNEL",
        { type, name, members },
        ({ success, data, error }: AckCreateGroup) => {
          if (success) {
            console.log("Group/Channel ID:", data?._id);
            navigate(`/${data?._id}`);
          } else {
            toast.error(error || `Failed to create ${type}`);
          }
        }
      );
    } else {
      console.warn(
        "Cannot create group or channel: not connected to socket server"
      );
    }
  }

  function addGroupMembers({
    chatId,
    users,
  }: {
    chatId: string;
    users: string[];
  }) {
    if (isConnected && socket) {
      socket.emit(
        "ADD_MEMBERS_CLIENT",
        { chatId, users },
        ({ success, message, error }: AckCreateGroup) => {
          if (success) {
            toast.success(message);
            queryClient.invalidateQueries({ queryKey: ["chats"] });
          } else {
            toast.error(message);
            console.error(error);
          }
        }
      );
    } else {
      console.warn("Cannot add members: not connected to socket server");
    }
  }

  function addAdmins({
    chatId,
    members,
  }: {
    chatId: string;
    members: string[];
  }) {
    console.log(chatId, members);
    if (isConnected && socket) {
      socket.emit(
        "ADD_ADMINS_CLIENT",
        { chatId, members },
        ({ success, message, error }: AckCreateGroup) => {
          if (success) {
            toast.success(message);
            queryClient.invalidateQueries({ queryKey: ["chats"] });
          } else {
            toast.error(message);
            console.error(error);
          }
        }
      );
    } else {
      console.warn("Cannot add admins: not connected to socket server");
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

  function leaveGroup({ chatId }: { chatId: string }) {
    if (isConnected && socket) {
      socket.emit(
        "LEAVE_GROUP_CHANNEL_CLIENT",
        { chatId },
        ({ success, message, error }: AckCreateGroup) => {
          if (success) {
            toast.success(message);
            queryClient.invalidateQueries({ queryKey: ["chats"] });
            navigate("/");
          } else {
            toast.error(message);
            console.error(error);
          }
        }
      );
    } else {
      console.warn("Cannot leave group: not connected to socket server");
    }
  }

  function removeMembers({
    chatId,
    members,
  }: {
    chatId: string;
    members: string[];
  }) {
    console.log(chatId, members);
    if (isConnected && socket) {
      socket.emit(
        "REMOVE_MEMBERS_CLIENT",
        { chatId, members },
        ({ success, message, error }: AckCreateGroup) => {
          if (success) {
            toast.success(message);
            queryClient.invalidateQueries({ queryKey: ["chats"] });
          } else {
            toast.error(message);
            console.error(error);
          }
        }
      );
    } else {
      console.warn("Cannot remove members: not connected to socket server");
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
        addGroupMembers,
        addAdmins,
        leaveGroup,
        removeMembers,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
