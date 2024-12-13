import { useMutation, useQueryClient } from "@tanstack/react-query";
import { viewStory as viewStoryAPI } from "../services/apiViewStory";

function useViewStory() {
  const queryClient = useQueryClient();

  const {
    mutate: viewStory,
    data,
    error,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (storyId: string) => viewStoryAPI(storyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories"] });
    },
    onError: (error) => {
      console.error("Error viewing story:", error);
    },
  });

  return { viewStory, data, error, isPending, isSuccess };
}

export { useViewStory };
