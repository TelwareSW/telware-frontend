import { useMutation, useQueryClient } from "@tanstack/react-query";

import { DeleteProfilePicture as DeleteProfilePictureAPI } from "../services/DeleteProfilePicture";

function useDeleteProfileSettings() {
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
  });

  return { deleteProfilePicture, data, error, isPending };
}

export { useDeleteProfileSettings };
