import { useQuery } from "@tanstack/react-query";

import { checkAuth } from "../services/checkAuth";

export function useAuth() {
  const { data: isAuth } = useQuery({
    queryKey: ["isAuth"],
    queryFn: checkAuth,
  });

  return { isAuth };
}
