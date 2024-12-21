import { useAppSelector } from "@hooks/useGlobalState";
import { ContentType, MessageInterface, MessageStatus } from "types/messages";
import { useSocket } from "@hooks/useSocket";
import { useEncryptDecrypt } from "./useEncryptDecrypt";
import { getChatByID } from "../utils/helpers";
import { getFileType } from "@utils/helpers";

export const useMessageSender = () => {
  const { sendMessage, editMessage } = useSocket();
  const userId = useAppSelector((state) => state.user.userInfo.id);
  const activeMessage = useAppSelector((state) => state.activeMessage);
  const { activeThread } = useAppSelector((state) => state.channelsThreads);

  const { encrypt } = useEncryptDecrypt();
  const chats = useAppSelector((state) => state.chats.chats);

  const handleSendMessage = async (
    data: string,
    chatId?: string,
    file?: string,
    type: ContentType = "text"
  ) => {
    const chat = getChatByID({ chats, chatID: chatId as string });

    const encrypedMessage = await encrypt({
      message: data,
      key: chat?.encryptionKey as string,
      iv: chat?.initializationVector as string
    });

    if (activeMessage?.id && activeMessage.state === "edit") {
      editMessage(activeMessage?.id, data, chatId!);
      return;
    }

    const isReply = activeMessage.state === "reply";
    const isEncryptedContent =
      chat?.type === "private" && typeof encrypedMessage === "string";

    type = getFileType(file, isEncryptedContent ? encrypedMessage : data);

    if (encrypedMessage || file) {
      const message: MessageInterface = {
        _id: "",
        timestamp: new Date().toISOString(),
        content: isEncryptedContent ? encrypedMessage : data,
        contentType: type,
        isPinned: false,
        isForward: false,
        isAnnouncement: false,
        isAppropriate: true,
        senderId: userId,
        chatId: chatId!,
        parentMessageId: isReply ? activeMessage.id : null,
        isReply,
        status: MessageStatus.sent,
        media: file,
        threadMessages: [],
        isMention: false,
        isSeen: false,
      };

      const threadMessage = {
        ...message,
        parentMessageId: activeThread,
        isReply: true,
        chatType: "channel"
      };

      const messageToSend = activeThread ? threadMessage : message;

      sendMessage({ ...messageToSend, chatType: chat?.type || "private" });
    }
  };

  return { handleSendMessage };
};
