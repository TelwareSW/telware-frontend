import { useMutation } from "@tanstack/react-query";

import { forgotPassword as forgotPasswordAPI } from "../services/apiForgotPassword";
export function useForgotPassword() {
  const {
    mutate: forgotPassword,

    isSuccess,
    isError,
  } = useMutation({
    mutationFn: forgotPasswordAPI,
  });

  return { forgotPassword, isSuccess, isError };
}
