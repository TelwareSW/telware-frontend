import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteStory as DeleteStoryAPI } from "../services/deleteStory";
import { story } from "types/story";

function useDeleteStory() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteStory,
    data,
    error,
    isPending,
  } = useMutation({
    mutationFn: DeleteStoryAPI,
    onSuccess: (deletedStory) => {
      queryClient.setQueryData(["stories"], (oldStories: story[] = []) =>
        oldStories.filter((story) => story.id !== deletedStory.id)
      );
    },
  });

  return { deleteStory, data, error, isPending };
}

export { useDeleteStory };
