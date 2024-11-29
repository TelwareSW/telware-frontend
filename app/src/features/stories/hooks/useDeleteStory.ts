import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteStory as DeleteStoryAPI } from "../services/deleteStory";
import toast from "react-hot-toast";

function useDeleteStory() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteStory,

    data,
    error,
    isPending,
  } = useMutation({
    mutationFn: (storyId: string) => DeleteStoryAPI(storyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myStories"] });
      toast.success("Story successfully deleted");
    },
    onError: () => {
      toast.error("Error deleting story");
    },
  });

  return { deleteStory, data, error, isPending };
}

export { useDeleteStory };
