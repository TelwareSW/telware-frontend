import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { login as loginApi } from "../services/apiLogin";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      console.log(data);

      queryClient.setQueryData(["user"], { user: data.user });
      navigate("/", { replace: true });
    },
  });

  return { login, isPending };
}
