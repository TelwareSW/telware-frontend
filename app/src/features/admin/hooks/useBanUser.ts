import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { apiBanUser } from "../services/apiUsers";

function useBanUser() {
  const queryClient = useQueryClient();

  const {
    mutate: banUser,
    data,
    error,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (userId: string) => apiBanUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User banned successfully");
    },
    onError: () => {
      toast.error("Error banning user");
    },
  });

  return { banUser, data, error, isPending, isSuccess };
}

export { useBanUser };
