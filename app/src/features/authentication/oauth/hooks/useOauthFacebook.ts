import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { apiFacebookOauth } from "../services/apiFacebookOauth";

export function useOauthFacebook() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: loginWithFacebook, isPending } = useMutation({
    mutationFn: apiFacebookOauth,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], { user: data.user });
      navigate("/", { replace: true });
    },
  });

  return { loginWithFacebook, isPending };
}
