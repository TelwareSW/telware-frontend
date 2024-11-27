import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GetAllSessions } from "../services/GetAllSessions";
import { Session } from "../types/sessions";
import { GetCurrentSession } from "../services/GetCurrentSession";

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
