import { useQuery } from "@tanstack/react-query";
import { getGifs as getGifsAPI } from "../services/apiGetGIFS";

function useGifs() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["gifs"],
    queryFn: () => getGifsAPI(),
  });

  return { data, error, isLoading };
}

export { useGifs };
