import { useMutation } from "@tanstack/react-query";
import { sendEmailVerification } from "../services/apiConfirmCode";

export function UseSendConfirmationEmail() {
  const {
    mutate: SendConfirmationCode,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: sendEmailVerification,
    onSuccess: (data) => {
      console.log("Email verification sent:", data);
    },
  });
  return {
    SendConfirmationCode,
    isSuccess,
    isPending,
  };
}
