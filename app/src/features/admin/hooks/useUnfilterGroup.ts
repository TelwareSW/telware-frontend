import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { apiUnfilterGroup } from "../services/apiGroups";

function useUnfilterGroup() {
  const queryClient = useQueryClient();

  const {
    mutate: unfilterGroup,
    data,
    error,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (groupId: string) => apiUnfilterGroup(groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-groups"] });
      toast.success("Group Unfiltered successfully");
    },
    onError: () => {
      toast.error("Error unfiltering group");
    },
  });

  return { unfilterGroup, data, error, isPending, isSuccess };
}

export { useUnfilterGroup };
