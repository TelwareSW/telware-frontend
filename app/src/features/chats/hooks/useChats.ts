import { useQuery } from "@tanstack/react-query";
import { getAllChatsApi } from "../services/apiGetChats";
import { Chat } from "@mocks/data/chats";

export function useChats() {
  const { data: chats, isPending } = useQuery<Chat[]>({
    queryKey: ["chats"],
    queryFn: getAllChatsApi,
  });

  return { chats, isPending };
}
