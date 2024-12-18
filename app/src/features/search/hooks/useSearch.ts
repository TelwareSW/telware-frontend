import { useQuery } from "@tanstack/react-query";
import { SearchRequest, SearchResponseData } from "../types/search";
import { Search } from "../services/searchAPI";
import { useEffect } from "react";
import toast from "react-hot-toast";

interface UseSearchResponse {
  data: SearchResponseData | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

function useSearch(searchRequest: SearchRequest): UseSearchResponse {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["global-search", searchRequest],
    queryFn: () => Search(searchRequest),
    enabled: searchRequest?.query.length > 0,
    retry: 3,
    retryDelay: 1000,
  });

  useEffect(() => {
    if (error) {
      toast.error("Failed to search");
    }
  }, [error]);

  return { data, isLoading, error, refetch };
}

export { useSearch };
