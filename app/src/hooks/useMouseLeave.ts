import { useEffect, useRef } from "react";

export function useMouseLeave(handler: () => void, listenCapturing = true) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function handleMouseLeave() {
      if (ref.current) {
        setTimeout(() => {
          handler();
        }, 100);
      }
    }

    const currentRef = ref.current;

    if (currentRef) {
      currentRef.addEventListener(
        "mouseleave",
        handleMouseLeave,
        listenCapturing
      );
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener(
          "mouseleave",
          handleMouseLeave,
          listenCapturing
        );
      }
    };
  }, [handler, listenCapturing]);

  return ref;
}
