import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Signup } from "../services/apiSignup";

export function useSignup() {
  const navigate = useNavigate();

  const { mutate: signup, isPending } = useMutation({
    mutationFn: Signup,
    onSuccess: (data) => {
      console.log(data);
      navigate("login", { replace: true });
    },
  });
  return { signup, isPending };
}
