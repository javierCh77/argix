/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef, useState } from "react";
import type { JSX } from "react";
import { useReducedMotion } from "framer-motion";

type Glow = "none" | "purple" | "cyan";
type Radius = "xl" | "2xl" | "3xl";

type Props = {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  as?: keyof JSX.IntrinsicElements;
  tilt?: boolean;
  hoverShine?: boolean;
  glass?: boolean;
  gradientBorder?: boolean;
  glow?: Glow;
  radius?: Radius;
  baseBg?: string;
  baseBorder?: string;
  /** Recorta efectos (shine/overlay) dentro del borde de la card */
  clipOverflow?: boolean;
};

/** util simple para unir clases */
function cx(...args: Array<string | false | null | undefined>) {
  return args.filter(Boolean).join(" ");
}

/** box-shadow para glow */
function glowShadow(color: "purple" | "cyan", intense: boolean): string {
  if (color === "purple") {
    return intense
      ? [
          "0 0 0 1px rgba(196,138,255,0.50) inset",
          "0 16px 34px rgba(0,0,0,0.60)",
          "0 0 36px rgba(196,138,255,0.35)",
          "0 0 120px rgba(196,138,255,0.28)",
        ].join(", ")
      : [
          "0 0 0 1px rgba(168,85,247,0.35) inset",
          "0 14px 28px rgba(0,0,0,0.55)",
          "0 0 28px rgba(168,85,247,0.28)",
          "0 0 90px rgba(168,85,247,0.22)",
        ].join(", ");
  }
  // cyan
  return intense
    ? [
        "0 0 0 1px rgba(56,189,248,0.50) inset",
        "0 16px 34px rgba(0,0,0,0.60)",
        "0 0 36px rgba(56,189,248,0.35)",
        "0 0 120px rgba(56,189,248,0.28)",
      ].join(", ")
    : [
        "0 0 0 1px rgba(56,189,248,0.35) inset",
        "0 14px 28px rgba(0,0,0,0.55)",
        "0 0 28px rgba(56,189,248,0.28)",
        "0 0 90px rgba(56,189,248,0.22)",
      ].join(", ");
}

export default function MotionCard({
  children,
  className,
  delayMs = 0,
  as = "div",
  tilt = true,
  hoverShine = true,
  glass = true,
  gradientBorder = false,
  glow = "none",
  radius = "3xl",
  baseBg = "#0B0B14",
  baseBorder = "rgba(148,163,184,0.18)",
  clipOverflow = true,
}: Props) {
  const Tag: any = as as any;
  const reduce = useReducedMotion();
  const [hover, setHover] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Tilt 3D
  const onMove = (e: React.MouseEvent) => {
    if (!tilt || reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const rx = ((y - r.height / 2) / r.height) * -8;
    const ry = ((x - r.width / 2) / r.width) * 10;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(${hover ? "-6px" : "0"})`;
  };
  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };

  // radio
  const radiusClass =
    radius === "xl" ? "rounded-xl" : radius === "2xl" ? "rounded-2xl" : "rounded-3xl";

  // estilos base + glow
  const baseStyle: React.CSSProperties = {
    transition: "box-shadow .35s ease, transform .35s ease, border-color .35s ease",
    animation: delayMs ? `fadeInUp .6s ease-out both ${delayMs}ms` : undefined,
    background: glass ? undefined : baseBg,
    border: gradientBorder
      ? undefined
      : `1px solid ${
          glow === "purple"
            ? "rgba(168,85,247,0.55)"
            : glow === "cyan"
            ? "rgba(56,189,248,0.55)"
            : baseBorder
        }`,
    boxShadow: glow === "none" ? undefined : glowShadow(glow === "cyan" ? "cyan" : "purple", hover),
    // 👉 asegura que NADA salga del contenedor
    overflow: clipOverflow ? "hidden" : undefined,
    isolation: clipOverflow ? "isolate" : undefined,
    contain: clipOverflow ? ("paint" as any) : undefined,
  };

  return (
    <Tag
      ref={ref}
      className={cx(
        "relative transition-all duration-500 will-change-transform",
        radiusClass,
        glass && "glass",
        gradientBorder && "gradient-border",
        hoverShine && "card-hover",
        className
      )}
      style={baseStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        reset();
      }}
      onMouseMove={onMove}
    >
      {/* Efectos internos: recortados y con radio heredado */}
      <div
        className={cx("card-overlay", hover && "card-rotate")}
        style={{ borderRadius: "inherit", overflow: "hidden", zIndex: 0 }}
      />
      {hoverShine && (
        <div
          className="card-shine"
          style={{ borderRadius: "inherit", overflow: "hidden", zIndex: 0 }}
        />
      )}

      {/* Contenido por encima de los efectos */}
      <div className="relative z-10 p-8">{children}</div>
    </Tag>
  );
}
