import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthStatus } from "@features/authentication/login/hooks/useAuthStatus";

type prortectedRouteType = {
  children: ReactNode;
};

function ProtectedRoute({ children }: prortectedRouteType) {
  const navigate = useNavigate();
  const { isAuth, isPending } = useAuthStatus();

  useEffect(() => {
    if (!isAuth && !isPending) {
      navigate("/login");
    }
  }, [navigate, isAuth, isPending]);

  if (isAuth) return children;
  else return null;
}

export default ProtectedRoute;
