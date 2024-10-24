import { useMutation, useQueryClient } from "@tanstack/react-query";

import { UpdateProfileSettings as UpdateProfileSettingsAPI } from "../services/UpdateProfileSettings";

function useUpdateProfileSettings() {
  const queryClient = useQueryClient();

  const {
    mutate: updateProfileSettings,
    data,
    error,
    isPending,
  } = useMutation({
    mutationFn: UpdateProfileSettingsAPI,
    onSuccess: (data) => {
      queryClient.setQueryData(["profileSettings"], data);
    },
  });

  return { updateProfileSettings, data, error, isPending };
}

export { useUpdateProfileSettings };
