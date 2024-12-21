import { useQuery } from "@tanstack/react-query";
import { apiGetGroups } from "../services/apiGroups";

function useGroups() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["all-groups"],
    queryFn: apiGetGroups,
  });
  return { data, error, isLoading };
}

export { useGroups };
