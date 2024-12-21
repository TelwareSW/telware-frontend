import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { apiFilterGroup } from "../services/apiGroups";

function useFilterGroup() {
  const queryClient = useQueryClient();

  const {
    mutate: filterGroup,
    data,
    error,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (groupId: string) => apiFilterGroup(groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-groups"] });
      toast.success("Group Filtered successfully");
    },
    onError: () => {
      toast.error("Error filtering group");
    },
  });

  return { filterGroup, data, error, isPending, isSuccess };
}

export { useFilterGroup };
