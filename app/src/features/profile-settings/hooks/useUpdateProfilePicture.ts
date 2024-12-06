import { useMutation, useQueryClient } from "@tanstack/react-query";

import { UpdateProfilePicture as UpdateProfilePictureAPI } from "../services/apiUpdateProfilePicture";
import toast from "react-hot-toast";

function useUpdateProfilePicture() {
  const queryClient = useQueryClient();

  const {
    mutate: updateProfilePicture,
    data,
    error,
    isPending,
  } = useMutation({
    mutationFn: UpdateProfilePictureAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profilePicture"] });
    },
    onError: () => {
      toast.error("Something went wrong. Please try again.");
    },
  });

  return { updateProfilePicture, data, error, isPending };
}

export { useUpdateProfilePicture };
