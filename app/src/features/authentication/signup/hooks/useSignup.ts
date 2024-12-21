import { useMutation } from "@tanstack/react-query";
import { Signup } from "../services/apiSignup";

export function useSignup() {
  const {
    mutate: signup,
    isSuccess,
    isPending,
    isError
  } = useMutation({
    mutationFn: Signup
  });

  return {
    signup,
    isPending,
    isSuccess,
    isError
  };
}
