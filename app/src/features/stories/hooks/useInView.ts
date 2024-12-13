import { useEffect, useRef, useState } from "react";
interface Options {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}
export function useInView(options: Options) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [options]);

  return { ref, inView };
}
