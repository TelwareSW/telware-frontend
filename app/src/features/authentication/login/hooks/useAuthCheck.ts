import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "./useAuth";

const useAuthCheck = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) navigate("/", { replace: true });
  }, [isAuth, navigate]);
};

export default useAuthCheck;
