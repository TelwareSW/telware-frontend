import { useQuery } from "@tanstack/react-query";

import { checkAuth } from "../services/apiCheckAuth";

export function useAuthStatus() {
  const { data: isAuth, isPending } = useQuery({
    queryKey: ["isAuth"],
    queryFn: checkAuth,
  });

  return { isAuth, isPending };
}
