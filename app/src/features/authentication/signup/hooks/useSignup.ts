import { useMutation } from "@tanstack/react-query";
import { Signup } from "../services/apiSignup";

export function useSignup() {
  const {
    mutate: signup,
    isSuccess,
    isPending,
    isError,
  } = useMutation({
    mutationFn: Signup,

    onSuccess: (email) => {
      console.log(email);
    },
  });

  return {
    signup,
    isPending,
    isSuccess,
    isError,
  };
}
