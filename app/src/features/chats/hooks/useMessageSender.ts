import { useParams } from "react-router-dom";
import { useSocket } from "@hooks/useSocket";
import { useAppSelector } from "@hooks/useGlobalState";

export const useMessageSender = () => {
  const { sendMessage, editMessage } = useSocket();
  const userId = useAppSelector((state) => state.user.userInfo.id);
  const activeMessage = useAppSelector((state) => state.activeMessage);
  const { chatId } = useParams<{ chatId: string }>();

  const handleSendMessage = (data: string) => {
    if (activeMessage?.id) {
      editMessage(activeMessage?.id!, data, chatId!);
      return;
    }

    const isReply = activeMessage.state === "reply";

    if (data) {
      const message = {
        id: "",
        content: data,
        senderId: userId,
        type: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        chatId: chatId!,
        parentMessageId: "",
        isDeleted: false,
        isPinned: false,
        deleteType: 2,
        status: 0,
        isOptionListOpen: false,
        isReply: isReply,
        replyMessageId: isReply ? activeMessage.id : null,
      };
      sendMessage(message);
    }
  };

  return { handleSendMessage };
};
