import ChatInput from "@features/chats/ChatInput";

import { useCloseChat } from "@hooks/useCloseChat";
import Topbar from "@features/chats/Topbar";

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
