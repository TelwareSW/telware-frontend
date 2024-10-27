import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { apiGoogleOauth } from "../services/apiGoogleOauth";

export function useOauthGoogle() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: mutateGoogle, isPending } = useMutation({
    mutationFn: apiGoogleOauth,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], { user: data.user });
      navigate("/", { replace: true });
    },
  });

  return { mutateGoogle, isPending };
}
