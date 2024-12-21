import { useEffect, ReactNode, useCallback } from "react";
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
  deleteMessage as deleteMessageAction
} from "@state/messages/chats";
// import { connectToPeer, createAnswer, startCall } from "@features/calls/call";
import { useEncryptDecrypt } from "@features/chats/hooks/useEncryptDecrypt";
import toast from "react-hot-toast";
import { useChat } from "@features/chats/hooks/useChat";
import { useCallContext } from "@features/calls/hooks/useCallContext";
import { useAppSelector } from "@hooks/useGlobalState";
import { resetRightSideBar } from "@state/side-bar/sideBar";

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
  const {
    callId,
    joinCall,
    recieveICE,
    recieveAnswer,
    setChatId,
    getPeerConnection,
    createAnswer,
    startPeerConnection,
    offer,
    endCall,
    acceptCall: setAcceptedCall
  } = useCallContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = useSocket();
  const queryClient = useQueryClient();

  const userId = useAppSelector((state) => state.user.userInfo.id);

  const user = useAppSelector((state) => state.user.userInfo);

  const { decrypt } = useEncryptDecrypt();
  const { chat } = useChat();
  const handleIceCandidates = useCallback(
    async (clientId: string) => {
      return new Promise((resolve) => {
        const timeout = setTimeout(() => {
          resolve(null);
        }, 10000);
        if (socket?.connected && socket && callId.current) {
          const peerConnection = getPeerConnection(clientId);
          if (!peerConnection) return;
          peerConnection.onicecandidate = (event) => {
            if (!event.candidate) {
              clearTimeout(timeout);
              resolve(null);
            }
            socket.emit("SIGNAL-SERVER", {
              type: "ICE",
              voiceCallId: callId.current,
              data: event.candidate,
              targetId: clientId
            });
          };
        }
      });
    },
    [socket, callId, getPeerConnection]
  );
  const sendOffer = useCallback(
    (clientId: string, offer: RTCSessionDescriptionInit) => {
      if (
        socket &&
        offer &&
        socket?.connected &&
        socket &&
        callId.current &&
        clientId
      ) {
        socket.emit("SIGNAL-SERVER", {
          type: "OFFER",
          voiceCallId: callId.current,
          data: offer,
          targetId: clientId
        });
      }
    },
    [socket, callId]
  );
  const acceptCall = useCallback(() => {
    if (socket?.connected && socket && callId.current) {
      setAcceptedCall();
      socket.emit("JOIN-CALL", { voiceCallId: callId.current });
    }
  }, [socket, callId, setAcceptedCall]);
  const finishCall = useCallback(() => {
    if (socket?.connected && socket && callId.current) {
      socket.emit("LEAVE", { voiceCallId: callId.current });
      endCall(null);
    }
  }, [socket, callId, endCall]);
  const sendAnswer = useCallback(
    (clientId: string, answer: RTCSessionDescriptionInit) => {
      if (
        socket &&
        offer &&
        socket?.connected &&
        socket &&
        callId.current &&
        clientId
      ) {
        socket.emit("SIGNAL-SERVER", {
          type: "ANSWER",
          voiceCallId: callId.current,
          data: answer,
          targetId: clientId
        });
      }
    },
    [socket, callId, offer]
  );
  useEffect(() => {
    if (!socket) return;

    const onConnect = () => {
      socket.io.engine.on("close", (reason) => {
        console.log("Socket connection closed:", reason);
      });
    };
    const onReceiveMessage = (message: MessageInterface) => {
      if (!chat) {
        console.warn("No chat context available for decryption");
        return;
      }

      if (chat.type === "private") {
        decrypt({
          message: message.content,
          key: chat.encryptionKey!,
          iv: chat.initializationVector!
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
    socket.on("SET_PERMISSION_SERVER", ({ chatId, type, who }) => {
      console.log("SET_PERMISSION_SERVER", chatId, type, who);
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    });
    socket.on("SET_PRIVACY_SERVER", ({ chatId, privacy }) => {
      console.log("SET_PERMISSION_SERVER", chatId, privacy);
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    });

    socket.on("typing", (isTyping, message) =>
      handleIsTyping(dispatch, isTyping, message.chatId)
    );
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

    socket.on(
      "DELETE_GROUP_CHANNEL_SERVER",
      ({ chatId }: { chatId: string }) => {
        console.log("DELETE_GROUP_CHANNEL_SERVER", chatId);
        queryClient.invalidateQueries({ queryKey: ["chats"] });
      }
    );

    socket.on("REMOVE_MEMBERS_SERVER", ({ memberId }: { memberId: string }) => {
      console.log("REMOVE_MEMBERS_SERVER");

      if (memberId === user.id) {
        navigate("/");
        dispatch(resetRightSideBar());
        //TODO: close the right sidebar
      }
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    });

    socket.on(
      "CALL-STARTED",
      ({
        snederId,
        voiceCallId,
        chatId
      }: {
        snederId: string;
        voiceCallId: string;
        chatId: string;
      }) => {
        joinCall(snederId, chatId, voiceCallId);
        if (snederId === userId) acceptCall();
      }
    );
    socket.on("CLIENT-JOINED", async ({ clientId }) => {
      const offer = await startPeerConnection(clientId);
      try {
        if (offer && clientId) {
          sendOffer(clientId, offer);
          handleIceCandidates(clientId);
        } else throw new Error("Failed to send offer");
      } catch {
        console.error("Failed to send offer");
      }
    });
    socket.on(
      "SIGNAL-CLIENT",
      async ({ type, voiceCallId, data, senderId }) => {
        if (voiceCallId == callId.current) {
          if (type === "OFFER") {
            const answer = await createAnswer(data, senderId);
            if (answer) {
              sendAnswer(senderId, answer);
              handleIceCandidates(senderId);
            } else {
              console.error("Failed to create answer");
            }
          }
          if (type === "ANSWER") recieveAnswer(data, senderId);
          if (type === "ICE") recieveICE(data, senderId);
        }
      }
    );
    socket.on("CLIENT-LEFT", ({ voiceCallId, clientId }) => {
      if (voiceCallId === callId.current) {
        endCall(clientId);
      }
    });
    socket.emit("typing");

    return () => {
      console.log("Cleaning up socket listeners");
      // if (socket.connected) socket.disconnect();
      socket.off("connect", onConnect);
      socket.off("RECEIVE_MESSAGE", onReceiveMessage);
      socket.off("PIN_MESSAGE_SERVER");
      socket.off("UNPIN_MESSAGE_SERVER");
      socket.off("EDIT_MESSAGE_SERVER");
      socket.off("JOIN_GROUP_CHANNEL");
      socket.off("typing");
      // socket.io.engine.off("close");
    };
  }, [socket, chat]);

  const sendMessage = (sentMessage: MessageInterface) => {
    if (socket?.connected && socket) {
      console.log("messageToSend", sentMessage);
      socket.emit(
        "SEND_MESSAGE",
        sentMessage,
        ({
          success,
          data: recieved_message,
          error,
          message
        }: AcknowledgmentResponse) => {
          if (!success) {
            console.log(message);
            console.log("Failed to send", error);
          }
          if (success) {
            const _id = recieved_message._id;

            if (
              recieved_message.isAppropriate === false &&
              chat?.type !== "private"
            ) {
              toast.error("Your message was inappropriate.");
              recieved_message.content =
                "🚫️ This mesaage has inappropriate content.";
            }

            if (!chat) return;

            if (chat?.type === "private") {
              decrypt({
                message: recieved_message.content,
                key: chat?.encryptionKey || "",
                iv: chat?.initializationVector || ""
              }).then((content) => {
                handleIncomingMessage(
                  dispatch,
                  { ...recieved_message, content: content as string, _id },
                  recieved_message.chatId
                );
              });
            } else {
              handleIncomingMessage(
                dispatch,
                { ...recieved_message, _id },
                recieved_message.chatId
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
    if (socket?.connected && socket) {
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
                content: response.res.message.content
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
    if (socket?.connected && socket) {
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
    if (socket?.connected && socket) {
      socket.emit("UNPIN_MESSAGE_CLIENT", { messageId, chatId, userId });
    } else {
      console.warn("Cannot unpin message: not connected to socket server");
    }
  };
  const createVoiceCall = ({ chatId }: { chatId: string }) => {
    if (socket?.connected && socket && !callId.current) {
      setChatId(chatId);
      socket.emit("CREATE-CALL", {
        chatId
      });
    }
  };

  function createGroupOrChannel({
    type,
    name,
    members
  }: {
    type: "group" | "channel";
    name: string;
    members: string[];
  }) {
    if (socket?.connected && socket) {
      socket.emit(
        "CREATE_GROUP_CHANNEL",
        { type, name, members },
        ({ success, data, error }: AckCreateGroup) => {
          if (success) {
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
    users
  }: {
    chatId: string;
    users: string[];
  }) {
    if (socket?.connected && socket) {
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
    members
  }: {
    chatId: string;
    members: string[];
  }) {
    if (socket?.connected && socket) {
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
    chatId
  }: {
    messageId: string;
    chatId: string;
  }) {
    if (socket?.connected && socket) {
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
    if (socket?.connected && socket) {
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
    members
  }: {
    chatId: string;
    members: string[];
  }) {
    console.log(chatId, members);
    if (socket?.connected && socket) {
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

  function setPermission({
    chatId,
    type,
    who
  }: {
    chatId: string;
    type: "post" | "download";
    who: "admins" | "everyone";
  }) {
    if (socket?.connected && socket) {
      socket.emit(
        "SET_PERMISSION_CLIENT",
        { chatId, type, who },
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
      console.warn("Cannot remove members: not connected to socket");
    }
  }

  function deleteGroup({ chatId }: { chatId: string }) {
    if (isConnected && socket) {
      socket.emit(
        "DELETE_GROUP_CHANNEL_CLIENT",
        { chatId },
        ({ success, message, error }: AckCreateGroup) => {
          console.log(message, error, success);
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
      console.warn("Cannot delete group: not connected to socket server");
    }
  }

  function setPrivacy({
    chatId,
    privacy
  }: {
    chatId: string;
    privacy: boolean;
  }) {
    console.log(privacy);
    if (isConnected && socket) {
      socket.emit(
        "SET_PRIVACY_CLIENT",
        { chatId, privacy },
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
      console.warn("Cannot set privacy: not connected to socket server");
    }
  }

  return (
    <SocketContext.Provider
      value={{
        isConnected: socket?.connected || false,
        sendMessage,
        pinMessage: pinMessageSocket,
        unpinMessage: unpinMessageSocket,
        editMessage: editMessageSocket,
        //startConnection,
        createGroupOrChannel,
        deleteMessage,
        addGroupMembers,
        addAdmins,
        leaveGroup,
        removeMembers,
        acceptCall,
        createVoiceCall,
        setPermission,
        deleteGroup,
        setPrivacy,
        finishCall
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
