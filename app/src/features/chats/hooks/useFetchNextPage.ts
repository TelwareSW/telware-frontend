import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { apiFetchNextPage } from "../services/apiFetchNextPage";

function useFetchNextPage() {
  const { chatId } = useParams();

  const {
    data,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
  } = useInfiniteQuery({
    queryKey: [`page-${chatId}`],
    queryFn: ({ pageParam = 1 }) =>
      apiFetchNextPage({ chatId: chatId!, pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });

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
