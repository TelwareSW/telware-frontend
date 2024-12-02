import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { apiFetchNextPage } from "../services/apiFetchNextPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { mergeMessages } from "@state/messages/messages";

function useFetchNextPage() {
  const { chatId } = useParams();
  const dispatch = useDispatch();

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
    queryFn: ({ pageParam = 1 }) =>
      apiFetchNextPage({ chatId: chatId!, pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });

  useEffect(() => {
    if (data) {
      const lastFetchedPage = data.pages[data.pages.length - 1];
      if (lastFetchedPage) {
        dispatch(mergeMessages({ messages: lastFetchedPage.messages }));
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
