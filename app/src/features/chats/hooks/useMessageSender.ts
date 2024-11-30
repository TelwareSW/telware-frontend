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

  const activeMessage = useSelector((state: RootState) => state.activeMessage);

  const handleSendMessage = (data: string) => {
    const isReply = activeMessage.state === "reply";

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
        isPinned: false,
        deleteType: 2,
        status: 0,
        isOptionListOpen: false,
        isReply: isReply,
        replyMessageId: isReply ? activeMessage.id : null,
      };
      sendMessage(message);
      dispatch(addMessage(message));
    }
  };

  return { handleSendMessage };
};
