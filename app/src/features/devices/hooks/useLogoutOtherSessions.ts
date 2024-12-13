import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LogoutOtherSessions } from "../services/apiLogoutOtherSessions";
import toast from "react-hot-toast";

function useLogoutOtherSessions() {
  const queryClient = useQueryClient();

  const {
    mutate: logoutOtherSessions,
    data,
    error,
    isPending,
  } = useMutation({
    mutationFn: LogoutOtherSessions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
      toast.success("Successfully logged out other sessions");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { logoutOtherSessions, data, error, isPending };
}

export { useLogoutOtherSessions };
