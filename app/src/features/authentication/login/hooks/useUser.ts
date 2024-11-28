import { apiUser } from "@features/authentication/oauth/services/apiUser";
import { useQuery } from "@tanstack/react-query";
import { userInfoInterface } from "types/user";

export function useUser() {
  const { data: user, isPending } = useQuery<userInfoInterface>({
    queryKey: ["user"],
    queryFn: apiUser,
  });

  return { user, isPending };
}
