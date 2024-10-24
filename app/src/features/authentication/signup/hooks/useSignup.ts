import { useMutation } from "@tanstack/react-query";
import { Signup } from "../services/apiSignup";

export function useSignup() {
  const {
    mutate: signup,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: Signup,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return { signup, isPending, isSuccess };
}
