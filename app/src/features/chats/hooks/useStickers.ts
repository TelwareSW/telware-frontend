import { useQuery } from "@tanstack/react-query";

import { getStickers as getStickersAPI } from "../services/GetStickers";
import { getTrendingStickers as getTrendingStickersAPI } from "../services/GetStickers";
import { GIPHY_LIMIT } from "@constants";

function useStickers(query: string) {
  const {
    data: stickers,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["Stickers", query],
    queryFn: () => getStickersAPI(query, GIPHY_LIMIT),
    enabled: !!query,
  });

  return { stickers, error, isLoading };
}

function useTrendingStickers() {
  const {
    data: trendingStickers,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["trendingStickers"],
    queryFn: () => getTrendingStickersAPI(GIPHY_LIMIT),
  });

  return { trendingStickers, error, isLoading };
}

export { useTrendingStickers, useStickers };
