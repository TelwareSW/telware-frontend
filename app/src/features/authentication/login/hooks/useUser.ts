import { apiUser } from "@features/authentication/oauth/services/apiUser";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
  const { data, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: apiUser,
  });
  
  const user = data?.user;

  return { user, isPending };
}
