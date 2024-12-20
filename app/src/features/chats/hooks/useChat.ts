import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getChatApi } from "../services/apiGetChats";
import { DetailedChatInterface } from "@state/messages/chats";

export function useChat() {
  const { chatId } = useParams<{ chatId: string }>();

  const { data: chat, isPending } = useQuery<DetailedChatInterface>({
    queryKey: ["current-chat", chatId!],
    queryFn: () => getChatApi(chatId!),
  });

  return { chat, isPending };
}
