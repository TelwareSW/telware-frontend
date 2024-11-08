import { useMutation, useQueryClient } from "@tanstack/react-query";

import { login as loginApi } from "../services/apiLogin";

export function useLogin() {
  const queryClient = useQueryClient();

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], { user: data.user });
      queryClient.invalidateQueries({ queryKey: ["isAuth"] });
    },
  });

  return { login, isPending };
}
