import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postStory as postStoryAPI } from "../services/postStory";
import { story } from "types/story";
function usePostStory() {
  const queryClient = useQueryClient();

  const {
    mutate: postStory,
    data,
    error,
    isPending,
  } = useMutation({
    mutationFn: ({ story, caption }: { story: File; caption: string }) =>
      postStoryAPI(story, caption),
    onSuccess: (newStory) => {
      queryClient.setQueryData(["myStories"], (oldStories: story[] = []) => {
        return [...oldStories, { ...newStory, viewed: false }];
      });
    },
  });

  return { postStory, data, error, isPending };
}

export { usePostStory };
