import { useQuery } from "@tanstack/react-query";
import { getStickers as getStickersAPI } from "../services/apiGetStickers";

function useStickers() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["stickers"],
    queryFn: () => getStickersAPI(),
  });

  return { data, error, isLoading };
}

export { useStickers };
