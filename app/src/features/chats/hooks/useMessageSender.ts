import { useAppSelector } from "@hooks/useGlobalState";
import { ContentType, MessageInterface, MessageStatus } from "types/messages";
import { useSocket } from "@hooks/useSocket";
import { useEncryptDecrypt } from "./useDecrypt";

export const useMessageSender = () => {
  const { sendMessage, editMessage } = useSocket();
  const userId = useAppSelector((state) => state.user.userInfo.id);
  const activeMessage = useAppSelector((state) => state.activeMessage);

  const { encrypt } = useEncryptDecrypt();

  const handleSendMessage = async (
    data: string,
    chatId?: string,
    file?: string,
    type: ContentType = "text"
  ) => {
    const encrypedMessage = await encrypt({ message: data });


    if (activeMessage?.id && activeMessage.state === "edit") {
      editMessage(activeMessage?.id, data, chatId!);
      return;
    }

    const isReply = activeMessage.state === "reply";

    if (encrypedMessage || file) {
      const message: MessageInterface = {
        _id: "",
        timestamp: new Date().toISOString(),
        content: typeof encrypedMessage === "string" ? encrypedMessage : "",
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
