import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthStatus } from "./useAuthStatus";

const useAuthCheck = () => {
  const { isAuth } = useAuthStatus();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) navigate("/", { replace: true });
  }, [isAuth, navigate]);
};

export default useAuthCheck;
