import { useQuery } from "@tanstack/react-query";
import { apiGetGroups } from "../services/apiGroups";

function useGroups() {
  const {
    data: groups,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["groups"],
    queryFn: apiGetGroups,
  });
  return { groups, error, isLoading };
}

export { useGroups };
