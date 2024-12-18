import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { apiFetchNextPage } from "../services/apiFetchNextPage";
import { useEffect } from "react";
import { mergeMessages } from "@state/messages/chats";
import { MessageInterface } from "types/messages";
import { useAppDispatch } from "@hooks/useGlobalState";

function useFetchNextPage() {
  const { chatId } = useParams<{ chatId: string }>();
  const dispatch = useAppDispatch();

  const {
    data,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
  } = useInfiniteQuery({
    queryKey: [`chat-${chatId}-pages`],
    queryFn: ({ pageParam }) =>
      apiFetchNextPage({ chatId: chatId!, pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });

  useEffect(() => {
    if (data) {
      const lastFetchedPage = data.pages[data.pages.length - 1];
      if (lastFetchedPage && chatId) {
        dispatch(
          mergeMessages({
            chatId: chatId,
            newMessages: lastFetchedPage.messages as MessageInterface[],
          })
        );
      }
    }
  }, [data, chatId, dispatch]);

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
