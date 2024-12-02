import { useAppSelector } from "@hooks/useGlobalState";
import { getChatByID } from "../helpers";

function useSelectedMessages({ chatId }: { chatId?: string }) {
  const chats = useAppSelector((state) => state.chats.chats);
  const chat = chatId ? getChatByID({ chatID: chatId, chats }) : undefined;

  const selectedMessages = chat?.selectedMessages;

  return { selectedMessages };
}

export { useSelectedMessages };
