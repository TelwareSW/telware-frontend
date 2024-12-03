import { useParams } from "react-router-dom";
import { useAppSelector } from "@hooks/useGlobalState";
import { MessageInterface, MessageStatus } from "types/messages";
import { useSocket } from "@hooks/useSocket";

export const useMessageSender = () => {
  const { sendMessage, editMessage } = useSocket();
  const userId = useAppSelector((state) => state.user.userInfo.id);
  const activeMessage = useAppSelector((state) => state.activeMessage);
  const { chatId } = useParams<{ chatId: string }>();

  const handleSendMessage = (data: string, file?: string) => {
    if (activeMessage?.id && activeMessage.state === "edit") {
      editMessage(activeMessage?.id!, data, chatId!);
      return;
    }

    const isReply = activeMessage.state === "reply";

    if (data || file) {
      const message: MessageInterface = {
        _id: "",
        timestamp: new Date().toISOString(),
        content: data,
        contentType: "text",
        isPinned: false,
        isForward: false,
        isAnnouncement: false,
        senderId: userId,
        chatId: chatId!,

        parentMessageId: isReply ? activeMessage.id : null,
        isReply,
        status: MessageStatus.sent,
        media: file,
      };
      sendMessage(message);
    }
  };

  return { handleSendMessage };
};
