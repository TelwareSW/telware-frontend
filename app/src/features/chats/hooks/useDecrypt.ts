import { useParams } from "react-router-dom";
import { decryptMessage, encryptMessage, getChatByID } from "../utils/helpers";
import { useAppSelector } from "@hooks/useGlobalState";

export const useEncryptDecrypt = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const chats = useAppSelector((state) => state.chats.chats);

  const decrypt = async ({ message, id }: { message: string; id?: string }) => {
    const chat = getChatByID({ chats, chatID: id || chatId! });

    return chat && chat.numberOfMembers === 2
      ? await decryptMessage({
          encryptedMessageHex: message,
          keyHex: chat?.encryptionKey!,
          ivHex: chat?.initializationVector!,
        })
      : message;
  };

  const encrypt = async ({ message }: { message: string }) => {
    const chat = getChatByID({ chats, chatID: chatId! });

    return chat && chat.numberOfMembers === 2
      ? await encryptMessage({
          message: message,
          keyHex: chat?.encryptionKey!,
          ivHex: chat?.initializationVector!,
        })
      : message;
  };

  return { decrypt, encrypt };
};
