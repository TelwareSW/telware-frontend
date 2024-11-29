import { ReactNode } from "react";
import { MessageInterface } from "./messages";

export interface SocketContextType {
  isConnected: boolean;
  sendMessage: (message: MessageInterface) => void;
  pinMessage: (chatId: string, messageId: string, userId: string) => void;
  unpinMessage: (chatId: string, messageId: string, userId: string) => void;
}

export interface SocketProviderProps {
  children: ReactNode;
}
