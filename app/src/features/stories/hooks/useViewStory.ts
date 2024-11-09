import { useMutation, useQueryClient } from "@tanstack/react-query";
import { viewStory as viewStoryAPI } from "../services/viewStory";
import { story } from "types/story";
function useViewStory(storyId: string) {
  const queryClient = useQueryClient();

  const {
    mutate: viewStory,
    data,
    error,
    isPending,
  } = useMutation({
    mutationFn: () => viewStoryAPI(storyId),
    onSuccess: () => {
      queryClient.setQueryData(["stories"], (oldStories: story[] = []) =>
        oldStories.map((story) =>
          story.id === storyId ? { ...story, viewed: true } : story
        )
      );
    },
  });

  return { viewStory, data, error, isPending };
}

export { useViewStory };
