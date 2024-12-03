import { useParams } from "react-router-dom";
import { useAppSelector } from "@hooks/useGlobalState";
import { ContentType, MessageInterface, MessageStatus } from "types/messages";
import { useSocket } from "@hooks/useSocket";

export const useMessageSender = () => {
  const { sendMessage, editMessage } = useSocket();
  const userId = useAppSelector((state) => state.user.userInfo.id);
  const activeMessage = useAppSelector((state) => state.activeMessage);
  const { chatId } = useParams<{ chatId: string }>();

  const handleSendMessage = (
    data: string,
    file?: string,
    type: ContentType = "text"
  ) => {
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
        contentType: type,
        isPinned: false,
        isForward: false,
        isAnnouncement: false,
        senderId: userId,
        chatId: chatId!,

        parentMessageId: isReply ? activeMessage.id : null,
        isReply,
        status: MessageStatus.sent,
        media: file,
        replyMessageId: null, // or provide the appropriate value
      };
      sendMessage(message);
    }
  };

  return { handleSendMessage };
};
