import { useAppSelector } from "@hooks/useGlobalState";
import React, { createContext, useContext } from "react";
import { MessageInterface } from "types/messages";

type ContextType = MessageInterface & {
  isMine: boolean;
};

const MessageContext = createContext<ContextType | null>(null);

type ProviderProps = {
  children: React.ReactNode;
  data: MessageInterface;
};

function MessageProvider({ children, data }: ProviderProps) {
  const userId = useAppSelector((state) => state.user.userInfo.id);
  const isMine = userId === data.senderId;

  return (
    <MessageContext.Provider value={{ ...data, isMine }}>
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
