import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { apiGithubOauth } from "../services/apiGithubOauth";

export function useOauthGithub() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: loginWithGithub, isPending } = useMutation({
    mutationFn: apiGithubOauth,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], { user: data.user });
      navigate("/", { replace: true });
    },
  });

  return { loginWithGithub, isPending };
}
