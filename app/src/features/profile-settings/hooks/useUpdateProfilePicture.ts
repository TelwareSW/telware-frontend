import { useMutation, useQueryClient } from "@tanstack/react-query";

import { UpdateProfilePicture as UpdateProfilePictureAPI } from "../services/apiUpdateProfilePicture";

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
  });

  return { updateProfilePicture, data, error, isPending };
}

export { useUpdateProfilePicture };
