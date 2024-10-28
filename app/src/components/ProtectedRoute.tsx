import useAuthCheck from "@features/authentication/login/hooks/useAuthCheck";
import { ReactNode } from "react";

type prortectedRouteType = {
  children: ReactNode;
};

function ProtectedRoute({ children }: prortectedRouteType) {
  console.log('reached here');
  
  const isAuthenticated = useAuthCheck("/login");
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
