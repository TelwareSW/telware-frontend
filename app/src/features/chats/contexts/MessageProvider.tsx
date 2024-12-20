import { useAppSelector } from "@hooks/useGlobalState";
import { Member } from "@mocks/data/chats";
import React, { createContext, useContext } from "react";
import { MessageInterface } from "types/messages";

type ContextType = MessageInterface & {
  isMine: boolean;
  chatType: string;
  sender?: Member;
  numberOfMembers?: number;
};

const MessageContext = createContext<ContextType | null>(null);

type ProviderProps = {
  children: React.ReactNode;
  data: MessageInterface;
  chatType: string;
  sender?: Member;
  numberOfMembers?: number;
};

function MessageProvider({
  children,
  data,
  chatType,
  sender,
  numberOfMembers,
}: ProviderProps) {
  const userId = useAppSelector((state) => state.user.userInfo.id);
  const isMine = userId === data.senderId;

  return (
    <MessageContext.Provider
      value={{ ...data, isMine, chatType, sender, numberOfMembers }}
    >
      {children}
    </MessageContext.Provider>
  );
}

export function useMessageContext() {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessageContext must be used within a MessageProvider");
  }
  return context;
}

export default MessageProvider;
export { MessageContext };
