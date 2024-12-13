import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postStory as postStoryAPI } from "../services/apiPostStory";
import toast from "react-hot-toast";
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
    onSuccess: () => {
      toast.success("Story successfully uploaded");
      queryClient.invalidateQueries({ queryKey: ["myStories"] });
    },
    onError: () => {
      toast.error("Error uploading story");
    },
  });

  return { postStory, data, error, isPending };
}

export { usePostStory };
