import { useQuery } from "@tanstack/react-query";

import { getStories as getStoriesAPI } from "../services/getStories";

function useStroies() {
  const {
    data: stories,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["stories"],
    queryFn: getStoriesAPI,
  });

  return { stories, error, isLoading };
}

export { useStroies };
