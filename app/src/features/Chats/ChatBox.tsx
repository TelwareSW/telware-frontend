import ChatInput from "@features/Chats/ChatInput";
import Topbar from "@features/Chats/Topbar";

import { useCloseChat } from "@hooks/useCloseChat";

function ChatBox() {
  useCloseChat();

  return (
    <>
      <ChatInput />
      <Topbar />
    </>
  );
}

export default ChatBox;
