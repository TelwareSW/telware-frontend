import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { apiFetchNextPage } from "../services/apiFetchNextPage";
import { useEffect } from "react";
import { mergeMessages } from "@state/messages/chats";
import { MessageInterface } from "types/messages";
import { useAppDispatch, useAppSelector } from "@hooks/useGlobalState";
import { useEncryptDecrypt } from "./useEncryptDecrypt";
import { getChatByID } from "../utils/helpers";

function useFetchNextPage() {
  const { chatId } = useParams<{ chatId: string }>();
  const dispatch = useAppDispatch();
  const chats = useAppSelector((state) => state.chats.chats);
  const chat = getChatByID({ chats, chatID: chatId! });
  const {
    data,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
  } = useInfiniteQuery({
    queryKey: chatId ? [`chat-${chatId}-pages`] : [],
    queryFn: ({ pageParam }) =>
      apiFetchNextPage({ chatId: chatId!, pageParam }),
    getNextPageParam: (lastPage) => lastPage?.nextPage,
    enabled: !!chatId,
    initialPageParam: 0,
  });

  const { decrypt } = useEncryptDecrypt();

  let decryptedMessages: MessageInterface[] = [];

  useEffect(() => {
    const processMessages = async (messages: MessageInterface[]) => {
      await Promise.all(
        messages.map(async (msg: MessageInterface) => {
          const decryptedMsg = await decrypt({
            message: msg.content,
            key: chat?.encryptionKey!,
            iv: chat?.initializationVector!,
          });

          return {
            ...msg,
            content:
              typeof decryptedMsg === "string" ? decryptedMsg : msg.content,
          };
        })
      ).then((decryptedMessagesArray) => {
        decryptedMessages = decryptedMessagesArray;
      });
    };

    if (data) {
      const lastFetchedPage = data.pages[data.pages.length - 1];
      if (lastFetchedPage && chatId) {
        processMessages(lastFetchedPage.messages).then(() => {
          dispatch(
            mergeMessages({
              chatId: chatId,
              newMessages: decryptedMessages,
            })
          );
        });
      }
    }
  }, [data, chatId, dispatch, chats.length]);

  return {
    data,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
  };
}

export { useFetchNextPage };
