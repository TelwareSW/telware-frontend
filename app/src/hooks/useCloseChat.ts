import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useCloseChat() {
  const navigate = useNavigate();

  useEffect(() => {
    function onEscPress(e: KeyboardEvent) {
      if (e.key === "Escape") {
        navigate("/");
      }
    }

    document.addEventListener("keydown", onEscPress, false);

    return () => {
      document.removeEventListener("keydown", onEscPress, false);
    };
  }, []);
}
