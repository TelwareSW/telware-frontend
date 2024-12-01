import { useQuery } from "@tanstack/react-query";
import { getAllChatsApi } from "../services/apiGetChats";
import { ChatData } from "@mocks/data/chats";

export function useChats() {
  const { data: chatData, isPending } = useQuery<ChatData>({
    queryKey: ["chats"],
    queryFn: getAllChatsApi,
  });

  const chats = chatData?.chats.map((chat) => ({
    ...chat,
    lastMessage: chatData.lastMessages.find(
      (lastMessage) => lastMessage.chatId === chat._id,
    )?.lastMessage,
    members: chat.members.map((memberId) =>
      chatData.members.find((member) => member._id === memberId),
    ),
  }));

  return { chats, isPending };
}
