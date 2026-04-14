"use client";

import { useEffect, useRef } from "react";
import { useIsMobile } from "../hooks/useIsMobile";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    // Don't activate custom cursor on touch/mobile
    if (!dot || !ring || isMobile) {
      document.body.style.cursor = "";
      return;
    }

    // Hide default cursor
    document.body.style.cursor = "none";

    let mouseX = -100;
    let mouseY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot follows exactly
      dot.style.left = `${mouseX - 4}px`;
      dot.style.top = `${mouseY - 4}px`;

      // Ring uses CSS transition for lag effect
      ring.style.left = `${mouseX - 16}px`;
      ring.style.top = `${mouseY - 16}px`;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = target.closest("a, button") !== null;

      if (isClickable) {
        ring.style.width = "48px";
        ring.style.height = "48px";
        ring.style.left = `${mouseX - 24}px`;
        ring.style.top = `${mouseY - 24}px`;
        ring.style.opacity = "0.8";
      } else {
        ring.style.width = "32px";
        ring.style.height = "32px";
        ring.style.left = `${mouseX - 16}px`;
        ring.style.top = `${mouseY - 16}px`;
        ring.style.opacity = "0.5";
      }
    };

    const handleMouseLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const handleMouseEnter = () => {
      dot.style.opacity = "0.9";
      ring.style.opacity = "0.5";
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "var(--accent)",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: 0.9,
          top: "-100px",
          left: "-100px",
          transform: "none",
        }}
      />

      {/* Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          border: "1.5px solid var(--accent)",
          background: "transparent",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: 0.5,
          top: "-100px",
          left: "-100px",
          transition: "left 0.12s ease, top 0.12s ease, width 0.2s ease, height 0.2s ease, opacity 0.2s ease",
        }}
      />
    </>
  );
}
