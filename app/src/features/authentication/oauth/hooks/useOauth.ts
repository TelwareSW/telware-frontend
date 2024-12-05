import { useEffect } from "react";
import { useOauthLogin } from "./useOauthLogin";

export function useOauth() {
  const { login } = useOauthLogin();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const oauth = urlParams.get("oauth");

    if (oauth) {
      login();
    }
  }, []);
}
