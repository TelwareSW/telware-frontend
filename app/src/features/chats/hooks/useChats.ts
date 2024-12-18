import { useQuery } from "@tanstack/react-query";
import { getAllChatsApi } from "../services/apiGetChats";
import { ChatDataType } from "@mocks/data/chats";
import {
  ChatsState,
  DetailedChatInterface,
  setAllChats,
} from "@state/messages/chats";
import { parseChatsToState } from "../utils/helpers";
import { useAppDispatch, useAppSelector } from "@hooks/useGlobalState";
import { useEffect } from "react";
import { useBlock } from "@features/privacy-settings/hooks/useBlock";
import { useEncryptDecrypt } from "./useEncryptDecrypt";

export function useChats() {
  const { data: chatData, isPending } = useQuery<ChatDataType>({
    queryKey: ["chats"],
    queryFn: getAllChatsApi,
  });
  const dispatch = useAppDispatch();

  const { blockList } = useBlock();
  const { decrypt } = useEncryptDecrypt();
  const userId = useAppSelector((state) => state.user.userInfo.id);

  let DecryptedChats: DetailedChatInterface[] = [];

  useEffect(() => {
    const processMessages = async (chats: DetailedChatInterface[]) => {
      await Promise.all(
        chats.map(async (chat) => {
          const decryptedMsg = await decrypt({
            message: chat.lastMessage?.content!,
            key: chat?.encryptionKey!,
            iv: chat?.initializationVector!,
          });


          return {
            ...chat,
            lastMessage: {
              ...chat.lastMessage,
              content:
                typeof decryptedMsg === "string"
                  ? decryptedMsg
                  : chat.lastMessage?.content!,
            },
          };
        })
      ).then((decryptedMessagesArray) => {
        DecryptedChats = decryptedMessagesArray as DetailedChatInterface[];
      });
    };

    const initialChatState: ChatsState = {
      chats: parseChatsToState(chatData),
      members:
        chatData?.members.filter((member) => member._id !== userId) || [],
    };

    processMessages(initialChatState.chats).then(() => {
      dispatch(
        setAllChats({
          chatsData: {
            chats: DecryptedChats,
            members: initialChatState.members,
          },
          blockList,
          userId,
        })
      );
    });
  }, [isPending, chatData, dispatch]);

  return { isPending };
}
