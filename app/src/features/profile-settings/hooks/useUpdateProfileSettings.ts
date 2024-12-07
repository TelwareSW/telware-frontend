import { useMutation, useQueryClient } from "@tanstack/react-query";

import { UpdateProfileSettings as UpdateProfileSettingsAPI } from "../services/apiUpdateProfileSettings";

function useUpdateProfileSettings() {
  const queryClient = useQueryClient();

  const {
    mutate: updateProfileSettings,
    data,
    error,
    isPending,
  } = useMutation({
    mutationFn: UpdateProfileSettingsAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profileSettings"] });
    },
  });

  return { updateProfileSettings, data, error, isPending };
}

export { useUpdateProfileSettings };
