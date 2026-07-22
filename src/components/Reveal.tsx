"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** 进入视口前多少像素就触发，默认 80 */
  rootMargin?: string;
}

/**
 * 滚动进入视口时淡入上移，仅触发一次。
 * 用原生 IntersectionObserver，零依赖，静态站也能跑。
 */
export default function Reveal({ children, rootMargin = "0px 0px -80px 0px" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // 不支持 IO 或 prefers-reduced-motion 就直接显示
    if (typeof IntersectionObserver === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <div
      ref={ref}
      className={shown ? "transition-all duration-700 ease-out opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
    >
      {children}
    </div>
  );
}