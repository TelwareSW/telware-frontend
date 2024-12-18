import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { apiDeactivateUser } from "../services/apiUsers";

function useDeactivateUser() {
  const queryClient = useQueryClient();

  const {
    mutate: deactivateUser,
    data,
    error,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (userId: string) => apiDeactivateUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User deactivated successfully");
    },
    onError: () => {
      toast.error("Error deactivating user");
    },
  });

  return { deactivateUser, data, error, isPending, isSuccess };
}

export { useDeactivateUser };
