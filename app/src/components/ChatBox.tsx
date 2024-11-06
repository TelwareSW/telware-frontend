import { useCloseChat } from "@hooks/useCloseChat";
import ChatInput from "./ChatInput";
import Topbar from "./Topbar";

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
