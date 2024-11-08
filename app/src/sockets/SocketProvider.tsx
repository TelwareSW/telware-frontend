import { useState, useEffect, ReactNode } from "react";
import { useDispatch } from "react-redux";
import {
  addMessage,
  MessageInterface,
  setIsTyping,
} from "@state/messages/messages";
import socket from "utils/socket";
import { SocketContext } from "./SocketContext";
import { Dispatch } from "redux";

const handleIncomingMessage = (
  dispatch: Dispatch,
  message: MessageInterface
) => {
  dispatch(addMessage(message));
};
const handleIsTyping = (dispatch: Dispatch, isTyping: boolean) => {
  dispatch(setIsTyping({ isTyping: isTyping }));
};
const SocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("connect", () => {
      const engine = socket.io.engine;
      console.log("Connected to socket");
      setIsConnected(true);
      engine.on("close", (reason) => {
        console.log(reason);
      });
    });

    socket.on("receive_message", (message: MessageInterface) => {
      handleIncomingMessage(dispatch, message);
    });
    socket.on("typing", (isTyping) => handleIsTyping(dispatch, isTyping));
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("receive_message");
    };
  }, [dispatch]);

  const sendMessage = (message: MessageInterface) => {
    if (isConnected) {
      socket.emit("send_message", { message });
    } else {
      console.warn("Cannot send message: not connected to socket server");
    }
  };

  return (
    <SocketContext.Provider value={{ isConnected, sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
