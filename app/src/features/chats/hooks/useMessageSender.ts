import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addMessage } from "@state/messages/messages";
import { RootState } from "@state/store";

import { useSocket } from "@hooks/useSocket";

export const useMessageSender = () => {
  const { sendMessage, editMessage } = useSocket();
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.userInfo.id);
  const activeMessage = useSelector((state: RootState) => state.activeMessage);
  const { chatId } = useParams<{ chatId: string }>();

  const handleSendMessage = (data: string) => {
    if (activeMessage?.id) {
      editMessage(activeMessage?.id!, data, chatId!);
      return;
    }

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
      };
      sendMessage(message);
    }
  };

  return { handleSendMessage };
};
