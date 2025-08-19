"use client";

import {useEffect, useRef} from "react";

/**
 * Fondo futurista minimal:
 * - Aurora (radiales suaves)
 * - Anillo cónico rotando lento (profundidad)
 * - Grilla sutil revelada por spotlight que sigue el cursor
 * Alineado al mismo contenedor que el navbar/hero (max-w-7xl + padding).
 */
export default function BackgroundFX() {
  const anchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce) return;

    const setLocal = (x: number, y: number) => {
      const el = anchorRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // coordenadas relativas al contenedor (no al viewport)
      el.style.setProperty("--mx", `${x - rect.left}px`);
      el.style.setProperty("--my", `${y - rect.top}px`);
    };

    const onMove = (e: MouseEvent) => setLocal(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) setLocal(t.clientX, t.clientY);
    };

    // posición inicial (centro del contenedor)
    requestAnimationFrame(() => {
      const el = anchorRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setLocal(r.left + r.width * 0.6, r.top + r.height * 0.4);
    });

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, {passive: true});
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* AURORA global (muy suave, acorde a la paleta) */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_800px_at_80%_-10%,color-mix(in_oklab,var(--accentB)_12%,transparent)_0%,transparent_60%),radial-gradient(1000px_700px_at_10%_-20%,color-mix(in_oklab,var(--accentA)_12%,transparent)_0%,transparent_60%),#ffffff]" />

      {/* ANILLO CÓNICO lento */}
      <div className="absolute left-1/2 top-[-30%] h-[1200px] w-[1200px] -translate-x-1/2 rounded-full opacity-20 blur-[1px]
                      [background:conic-gradient(from_0deg,theme(colors.cyan.400/8),theme(colors.violet.500/8),theme(colors.cyan.400/8))]
                      [mask-image:radial-gradient(closest-side,black_0%,transparent_70%)]
                      animate-[spin_75s_linear_infinite] motion-reduce:animate-none" />

      {/* CAPA ALINEADA AL CONTENEDOR */}
      <div
        ref={anchorRef}
        className="absolute left-1/2 top-0 h-full w-full max-w-7xl -translate-x-1/2 px-6 md:px-12 lg:px-20"
        // valores por defecto del spotlight (por si no llega el JS)
        style={{"--mx": "60%", "--my": "40%"} as React.CSSProperties}
      >
        {/* Grilla revelada por spotlight */}
        <div className="absolute inset-0 opacity-70
                        [mask-image:radial-gradient(700px_500px_at_var(--mx)_var(--my),black_0%,transparent_70%)]
                        motion-reduce:[mask-image:none]">
          <div className="absolute inset-[-120px]
                          bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)]
                          bg-[size:28px_28px]" />
        </div>

        {/* Orbes lejanos, suaves y dentro del ancho del contenedor */}
        <div className="absolute right-[clamp(1rem,3vw,2.5rem)] top-24 h-72 w-72 rounded-full
                        bg-[radial-gradient(circle_at_30%_30%,theme(colors.cyan.400/18),transparent_60%)]
                        blur-3xl" />
        <div className="absolute right-[clamp(4rem,8vw,6rem)] bottom-10 h-56 w-56 rounded-full
                        bg-[radial-gradient(circle_at_70%_70%,theme(colors.violet.500/18),transparent_60%)]
                        blur-3xl" />
      </div>
    </div>
  );
}
