import { useQuery } from "@tanstack/react-query";

import { getGifs as getGifsAPI } from "../services/GetGIFS";
import { getTrendingGifs as getTrendingGifsAPI } from "../services/GetGIFS";
import { GIPHY_LIMIT } from "@constants";

function useGifs(query: string) {
  const {
    data: gifs,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["gifs", query],
    queryFn: () => getGifsAPI(query, GIPHY_LIMIT),
    enabled: !!query,
  });

  return { gifs, error, isLoading };
}

function useTrendingGifs() {
  const {
    data: trendingGifs,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["trendingGifs"],
    queryFn: () => getTrendingGifsAPI(GIPHY_LIMIT),
  });

  return { trendingGifs, error, isLoading };
}

export { useTrendingGifs, useGifs };
