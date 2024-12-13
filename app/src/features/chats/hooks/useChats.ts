import { useQuery } from "@tanstack/react-query";
import { getAllChatsApi } from "../services/apiGetChats";
import { ChatDataType } from "@mocks/data/chats";
import { ChatsState, setAllChats } from "@state/messages/chats";
import { parseChatsToState } from "../utils/helpers";
import { useAppDispatch, useAppSelector } from "@hooks/useGlobalState";
import { useEffect } from "react";
import { useBlock } from "@features/privacy-settings/hooks/useBlock";

export function useChats() {
  const { data: chatData, isPending } = useQuery<ChatDataType>({
    queryKey: ["chats"],
    queryFn: getAllChatsApi,
  });
  const dispatch = useAppDispatch();

  const { blockList } = useBlock();
  const userId = useAppSelector((state) => state.user.userInfo.id);
  useEffect(() => {
    const initialChatState: ChatsState = {
      chats: parseChatsToState(chatData),
      members:
        chatData?.members.filter((member) => member._id !== userId) || [],
    };

    dispatch(setAllChats({ chatsData: initialChatState, blockList, userId }));
  }, [isPending, chatData, dispatch]);

  return { isPending };
}
