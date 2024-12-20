import { ReactNode } from "react";
import { MessageInterface } from "./messages";

export interface SocketContextType {
  isConnected: boolean;
  sendMessage: (message: MessageInterface & { chatType: string }) => void;
  pinMessage: (chatId: string, messageId: string, userId: string) => void;
  unpinMessage: (chatId: string, messageId: string, userId: string) => void;
  editMessage: (messageId: string, content: string, chatId: string) => void;
  createGroupOrChannel: ({
    type,
    name,
    members,
  }: {
    type: "group" | "channel";
    name: string;
    members: string[];
  }) => void;
  addGroupMembers: ({
    chatId,
    users,
  }: {
    chatId: string;
    users: string[];
  }) => void;
  addAdmins: ({
    chatId,
    members,
  }: {
    chatId: string;
    members: string[];
  }) => void;
  startConnection: (offer?: RTCSessionDescription) => void;
  deleteMessage: ({
    messageId,
    chatId,
  }: {
    messageId: string;
    chatId: string;
  }) => void;
  leaveGroup: ({ chatId }: { chatId: string }) => void;
}

export interface SocketProviderProps {
  children: ReactNode;
}
