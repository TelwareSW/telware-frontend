import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addMessage } from "@state/messages/messages";
import { RootState } from "@state/store";

import { useSocket } from "@hooks/useSocket";

export const useMessageSender = () => {
  const { sendMessage } = useSocket();
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.userInfo.id);
  const { chatId } = useParams<{ chatId: string }>();

  const handleSendMessage = (data: string) => {
    if (data) {
      const message = {
        id: "19008",
        content: data,
        senderId: userId,
        type: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        chatId: chatId!,
        parentMessageId: "",
        isDeleted: false,
        deleteType: 2,
        status: 0,
        isOptionListOpen: false,
        isPinned: false,
      };
      sendMessage(message);
      dispatch(addMessage(message));
    }
  };

  return { handleSendMessage };
};
