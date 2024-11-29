import { useQuery } from "@tanstack/react-query";
import { getViews as getViewsAPI } from "../services/getViews";

function useViews(storyId: string) {
  const {
    data: views,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["views", storyId],
    queryFn: () => getViewsAPI(storyId),
    enabled: !!storyId,
  });

  return { views, error, isLoading };
}

export { useViews };
