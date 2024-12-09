import { useQuery } from "@tanstack/react-query";

import { getAllUsers } from "../services/getAllUsers";

function useAllUsers() {
  const { data: users, isPending } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  return { users, isPending };
}

export { useAllUsers };
