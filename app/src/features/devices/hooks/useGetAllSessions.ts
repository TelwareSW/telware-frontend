import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GetAllSessions } from "../services/GetAllSessions";
import { Session } from "../types/sessions";

function useGetAllSessions() {
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ["sessions"],
    queryFn: GetAllSessions,
    onSuccess: (data: Session[]) => {
      queryClient.setQueryData(["sessions"], data);
    },
  });

  return { data, error, isLoading };
}

export { useGetAllSessions };
