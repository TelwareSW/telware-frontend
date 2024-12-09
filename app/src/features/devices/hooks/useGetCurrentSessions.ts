import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Session } from "../types/sessions";
import { GetCurrentSession } from "../services/apiGetCurrentSession";

function useGetCurrentSession() {
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ["current-session"],
    queryFn: GetCurrentSession,
    onSuccess: (data: Session) => {
      queryClient.setQueryData(["current-session"], data);
    },
  });

  return { data, error, isLoading };
}

export { useGetCurrentSession };
