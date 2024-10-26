import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Path = "/login" | "/signup" | "/password-reset";

const useAuthCheck = (path: Path) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/auth/me", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          setIsAuthenticated(true);
          navigate("/", { replace: true });
        } else {
          setIsAuthenticated(false);
          navigate(path);
        }
      } catch (error) {
        setIsAuthenticated(false);
        navigate("/login");
      }
    }

    checkAuth();
  }, [navigate]);

  return isAuthenticated;
};

export default useAuthCheck;
