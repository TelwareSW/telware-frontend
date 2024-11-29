import { useQuery } from "@tanstack/react-query";

import { getMyStories as getMyStoriesAPI } from "../services/getMyStories";

function useMyStroies() {
  const {
    data: myStories,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["myStories"],
    queryFn: getMyStoriesAPI,
  });
  return { myStories, error, isLoading };
}

export { useMyStroies };
