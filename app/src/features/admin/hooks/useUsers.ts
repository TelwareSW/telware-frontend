import { useQuery } from "@tanstack/react-query";
import { apiGetUsers } from "../services/apiUsers";

function useUsers() {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: apiGetUsers,
  });
  return { users, error, isLoading };
}

export { useUsers };
