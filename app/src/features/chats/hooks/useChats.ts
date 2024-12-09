import { useQuery } from "@tanstack/react-query";
import { getAllChatsApi } from "../services/apiGetChats";
import { ChatDataType } from "@mocks/data/chats";
import { ChatsState, setAllChats } from "@state/messages/chats";
import { parseChatsToState } from "../helpers";
import { useAppDispatch } from "@hooks/useGlobalState";
import { useEffect } from "react";

export function useChats() {
  const { data: chatData, isPending } = useQuery<ChatDataType>({
    queryKey: ["chats"],
    queryFn: getAllChatsApi,
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initialChatState: ChatsState = {
      chats: parseChatsToState(chatData),
      members: chatData?.members || [],
    };

    dispatch(setAllChats({ chatsData: initialChatState }));
  }, [isPending, chatData, dispatch]);

  return { isPending };
}
