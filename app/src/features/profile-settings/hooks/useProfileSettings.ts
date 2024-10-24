import { useQuery, useQueryClient } from "@tanstack/react-query";

import { GetProfileSettings as GetProfileSettingsAPI } from "../services/GetProfileSettings";

function useProfileSettings() {
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ["profileSettings"],
    queryFn: GetProfileSettingsAPI,
    onSuccess: (data) => {
      queryClient.setQueryData(["profileSettings"], data);
    },
  });

  return { data, error, isLoading };
}

export { useProfileSettings };
