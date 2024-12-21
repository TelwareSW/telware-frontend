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
  const [isConnected, setIsConnected] = useState(false);
  const {
    callId,
    joinCall,
    recieveICE,
    recieveAnswer,
    peerConnection,
    startPeerConnection,
    offer,
    acceptCall: setAcceptedCall,
    callAccepted
  } = useCallContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = useSocket();
  const queryClient = useQueryClient();

  const userId = useAppSelector((state) => state.user.userInfo.id);

  const user = useAppSelector((state) => state.user.userInfo);

  const { decrypt } = useEncryptDecrypt();
  const { chat } = useChat();
  const handleIceCandidates = useCallback(async () => {
    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        resolve(null);
      }, 10000);
      if (peerConnection && isConnected && socket && callId) {
        peerConnection.onicecandidate = (event) => {
          if (!event.candidate) {
            clearTimeout(timeout);
            resolve(null);
          }
          socket.emit("SIGNAL-SERVER", {
            type: "ICE",
            voiceCallId: callId,
            data: event.candidate
          });
        };
      }
    });
  }, [peerConnection, isConnected, socket, callId]);
  const sendOffer = useCallback(() => {
    if (offer && isConnected && socket && callId) {
      socket.emit("SIGNAL-SERVER", {
        type: "OFFER",
        voiceCallId: callId,
        data: offer
      });
    }
  }, [offer, isConnected, socket, callId]);
  const acceptCall = useCallback(() => {
    console.log(callId, callAccepted, isConnected, socket);
    if (isConnected && socket && callId.current && !callAccepted.current) {
      console.log("acceptCall", callId.current);
      setAcceptedCall();
      socket.emit("JOIN-CALL", { voiceCallId: callId.current });
    }
  }, [callAccepted, isConnected, socket, callId, setAcceptedCall]);
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
    if (!socket) return;
    if (!socket.connected) socket.connect();

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

    // socket.on("RECIEVE_OFFER", async (offer) => {
    //   console.log(offer);
    //   const answer = await createAnswer(offer);
    //   sendAnswer(answer);
    // });
    // socket.on("RECEIVE_ANSWER", async (answer: string) => {
    //   console.log(answer);
    //   startCall(answer);
    // });

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
        console.log("call id", voiceCallId);
        joinCall(snederId, chatId, voiceCallId);
        console.log(snederId, userId);
        if (snederId === userId) acceptCall();
      }
    );
    socket.on("CLIENT-JOINED", () => {
      console.log("CLIENT-JOINED");
      startPeerConnection();
      sendOffer();
      handleIceCandidates();
    });
    socket.on("SIGNAL-SERVER", async ({ type, data }) => {
      console.log(typeof data);
      if (type === "ANSWER") recieveAnswer(data);
      if (type === "ICE") recieveICE(data);
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
  }, [socket, chat, decrypt, dispatch, queryClient, user]);

  const sendMessage = (sentMessage: MessageInterface) => {
    if (isConnected && socket) {
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
  const createVoiceCall = ({ chatId }: { chatId: string }) => {
    console.log("create call", isConnected, socket, chatId, callId.current);
    if (isConnected && socket && !callId.current) {
      socket.emit("CREATE-CALL", {
        chatId
      });
    }
  };
  // const startConnection = async (callId: string) => {
  //   const offer = await connectToPeer();
  //   if (isConnected && socket) {
  //     console.log(offer);
  //     socket.emit("SEND_OFFER", { offer });
  //   } else {
  //     console.warn("Cannot unpin message: not connected to socket server");
  //   }
  // };

  function createGroupOrChannel({
    type,
    name,
    members
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
    users
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
    members
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
    chatId
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

  function setPermission({
    chatId,
    type,
    who
  }: {
    chatId: string;
    type: "post" | "download";
    who: "admins" | "everyone";
  }) {
    if (isConnected && socket) {
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
          console.log(message, error, success);
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
        isConnected,
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
        setPrivacy
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
