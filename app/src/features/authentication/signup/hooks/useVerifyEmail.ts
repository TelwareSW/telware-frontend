import { useMutation } from "@tanstack/react-query";
import { verifyEmail } from "../services/apiVerfiyCode";
export function UseVerifyEmail() {
  const {
    mutate: verifyCode,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: verifyEmail,
    onSuccess: (data) => {
      console.log("Email verification sent:", data);
    },
  });
  return {
    verifyCode,
    isSuccess,
    isPending,
  };
}
