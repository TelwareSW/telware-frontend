import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import { login as loginApi } from "../services/apiLogin";
import { setUserInfo } from "@state/user/user";

export function useLogin() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], { user: data.user });
      queryClient.invalidateQueries({ queryKey: ["isAuth"] });
      localStorage.setItem("sessionId", data.sessionId);
      dispatch(setUserInfo(data.user));
    },
  });

  return { login, isPending };
}
