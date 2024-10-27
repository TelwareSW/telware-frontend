import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { apiGitHubOauth } from "../services/apiGitHubOauth";

export function useOauthGitHub() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: apiGitHubOauth,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], { user: data.user });
      navigate("/", { replace: true });
    },
  });

  return { mutate, isPending };
}
