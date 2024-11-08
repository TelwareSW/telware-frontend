import ChatInput from "@features/chats/ChatInput";
import Topbar from "@features/chats/Topbar";

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
