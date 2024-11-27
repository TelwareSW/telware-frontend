import { ReactNode } from "react";
import { MessageInterface } from "./messages";

export interface SocketContextType {
  isConnected: boolean;
  sendMessage: (message: MessageInterface) => void;
}

export interface SocketProviderProps {
  children: ReactNode;
}
