import { useAuth } from "@features/authentication/login/hooks/useAuth";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type prortectedRouteType = {
  children: ReactNode;
};

function ProtectedRoute({ children }: prortectedRouteType) {
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [navigate, isAuth]);

  if (isAuth) return children;
  else return null;
}

export default ProtectedRoute;
