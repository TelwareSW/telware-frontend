import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthStatus } from "./useAuthStatus";
import { useAppDispatch, useAppSelector } from "@hooks/useGlobalState";
import { resetLeftSideBar } from "@state/side-bar/sideBar";

const useAuthCheck = () => {
  const { isAuth } = useAuthStatus();
  const navigate = useNavigate();
  const isAdmin = useAppSelector((state) => state.user.userInfo.isAdmin);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuth) {
      if (isAdmin) navigate("/admin", { replace: true });
      else {
        navigate("/", { replace: true });
        dispatch(resetLeftSideBar());
      }
    }
  }, [isAuth, navigate, isAdmin, dispatch]);
};

export default useAuthCheck;
