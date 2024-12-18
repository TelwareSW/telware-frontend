import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { apiActivateUser } from "../services/apiUsers";

function useActivateUser() {
  const queryClient = useQueryClient();

  const {
    mutate: activateUser,
    data,
    error,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (userId: string) => apiActivateUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User activated successfully");
    },
    onError: () => {
      toast.error("Error activating user");
    },
  });

  return { activateUser, data, error, isPending, isSuccess };
}

export { useActivateUser };
