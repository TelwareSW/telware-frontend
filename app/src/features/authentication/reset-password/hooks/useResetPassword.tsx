import { useMutation } from "@tanstack/react-query";

import { resetPassword as resetPasswordAPI } from "../services/apiResetPassword";
export function useResetPassword() {
  const {
    mutate: resetPassword,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: resetPasswordAPI,
  });

  return { resetPassword, isPending, isSuccess, isError };
}
