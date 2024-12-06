import { useMutation, useQueryClient } from "@tanstack/react-query";

import { DeleteProfilePicture as DeleteProfilePictureAPI } from "../services/apiDeleteProfilePicture";
import toast from "react-hot-toast";

function useDeleteProfilePicture() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteProfilePicture,
    data,
    error,
    isPending,
  } = useMutation({
    mutationFn: DeleteProfilePictureAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profilePicture"] });
    },
    onError: () => {
      toast.error("Something went wrong. Please try again.");
    },
  });

  return { deleteProfilePicture, data, error, isPending };
}

export { useDeleteProfilePicture };
