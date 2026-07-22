import { useEffect, useRef, useState } from "react";
export function useTypewriter(text: string, speed = 65) {
  const [displayed, setDisplayed] = useState("");
  const ref = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const run = () => {
      setDisplayed("");
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, speed);
      return interval;
    };

    let interval: ReturnType<typeof setInterval>;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          interval = run();
        } else {
          clearInterval(interval);
          setDisplayed("");
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [text, speed]);

  return { displayed, ref };
}
