import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getStories as getStoriesAPI } from "../services/getStories";
import { story } from "types/story";

function useStroies() {
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ["stories"],
    queryFn: getStoriesAPI,
    onSuccess: (data: story[]) => {
      queryClient.setQueryData(["stories"], data);
    },
  });

  return { data, error, isLoading };
}

export { useStroies };
