import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { apiUser } from "../services/apiUser";

export function useOauthLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: apiUser,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], { user: data.user });
      navigate("/", { replace: true });
    },
  });

  return { login, isPending };
}
