import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getMyStories as getMyStoriesAPI } from "../services/getMyStories";
import { story } from "types/story";

function useMyStroies() {
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ["myStories"],
    queryFn: getMyStoriesAPI,
    onSuccess: (data: story[]) => {
      queryClient.setQueryData(["myStories"], data);
    },
  });

  return { data, error, isLoading };
}

export { useMyStroies };
