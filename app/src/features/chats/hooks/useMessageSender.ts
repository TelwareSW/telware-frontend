import { useParams } from "react-router-dom";
import { useSocket } from "@hooks/useSocket";
import { useAppSelector } from "@hooks/useGlobalState";
import { MessageInterface } from "types/messages";

export const useMessageSender = () => {
  const { sendMessage, editMessage } = useSocket();
  const userId = useAppSelector((state) => state.user.userInfo.id);
  const activeMessage = useAppSelector((state) => state.activeMessage);
  const { chatId } = useParams<{ chatId: string }>();

  const handleSendMessage = (data: string) => {
    if (activeMessage?.id && activeMessage.state === "edit") {
      editMessage(activeMessage?.id!, data, chatId!);
      return;
    }

    const isReply = activeMessage.state === "reply";

    if (data) {
      const message: MessageInterface = {
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
