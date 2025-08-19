/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

function useTypewriter(text: string, speed = 18, startDelay = 250) {
  const reduce = useReducedMotion();
  const [out, setOut] = useState(reduce ? text : "");
  const iRef = useRef(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (reduce) return;
    const kickoff = window.setTimeout(() => {
      const tick = () => {
        iRef.current += 1;
        setOut(text.slice(0, iRef.current));
        if (iRef.current < text.length) {
          timer.current = window.setTimeout(tick, speed);
        }
      };
      tick();
    }, startDelay);

    return () => {
      window.clearTimeout(kickoff);
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [text, speed, startDelay, reduce]);

  return out;
}

/* Decor derecho (blobs) */
const BrainDecor = () => (
  <div className="pointer-events-none absolute right-6 md:right-10 top-1/2 hidden -translate-y-1/2 lg:block z-0 h-64 w-64 md:h-80 md:w-80 opacity-80">
    <div className="relative h-full w-full animate-[spin_18s_linear_infinite]">
      <div
        className="absolute left-10 top-6 h-32 w-32 rounded-full"
        style={{
          background:
            "linear-gradient(45deg, rgba(6,182,212,.26), rgba(139,92,246,.26))",
          animation: "brainPulse 3s ease-in-out infinite",
          filter: "blur(12px)",
        }}
      />
      <div
        className="absolute right-8 top-10 h-24 w-24 rounded-full"
        style={{
          background:
            "linear-gradient(45deg, rgba(139,92,246,.24), rgba(236,72,153,.2))",
          animation: "brainPulse 3s ease-in-out infinite",
          animationDelay: "1s",
          filter: "blur(12px)",
        }}
      />
      <div
        className="absolute bottom-8 left-16 h-20 w-20 rounded-full"
        style={{
          background:
            "linear-gradient(45deg, rgba(236,72,153,.2), rgba(6,182,212,.2))",
          animation: "brainPulse 3s ease-in-out infinite",
          animationDelay: "2s",
          filter: "blur(12px)",
        }}
      />
    </div>
  </div>
);

/* Isotipo + wordmark “argix” con centro BLANCO PURO */
function LogoWordmark() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="mb-6 flex items-center gap-4"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Badge circular */}
      <motion.div
        className="relative h-20 w-20 md:h-24 md:w-24" // 🔹 más grande
        whileHover={!reduce ? { scale: 1.08, rotate: 1 } : {}}
        transition={{ type: "spring", stiffness: 240, damping: 18 }}
      >
        {/* halo exterior suave */}
        <div className="absolute -inset-4 -z-10 rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,.35),rgba(168,85,247,.2),transparent_70%)] blur-xl" />

        {/* anillo cyan */}
        <div
          className="absolute inset-0 rounded-full p-[3px]" // p-[3px] = grosor del aro
          style={{
            background:
              "linear-gradient(135deg, var(--accentA), var(--accentB))",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            borderRadius: "9999px",
          }}
        />

        {/* fondo glass + gradiente blanco */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `
              radial-gradient(circle at center,
                rgba(255,255,255,1) 0%,
                rgba(255,255,255,1) 32%,
                rgba(255,255,255,0.65) 45%,
                rgba(34,211,238,0.35) 65%,
                rgba(168,85,247,0.25) 85%,
                rgba(236,72,153,0.2) 100%
              )
            `,
          }}
        />

        {/* isotipo más grande */}
        <motion.div
          className="absolute inset-0 grid place-items-center"
          animate={!reduce ? { y: [-2, 2, -2] } : {}}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/images/logo_a.png"
            alt="Argix"
            width={85} // 🔹 más grande
            height={85}
            priority
            className="drop-shadow-[0_6px_18px_rgba(6,182,212,.35)]"
          />
        </motion.div>
      </motion.div>

      {/* Wordmark */}
      <div className="select-none leading-none">
        <div
          className="text-2xl md:text-3xl font-black tracking-tight"
          style={{
            background:
              "linear-gradient(135deg, var(--accentA), var(--accentB))",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Argix
        </div>
        <div className="mt-0.5 text-xs md:text-sm text-slate-500">
          inteligencia aplicada
        </div>
      </div>
    </motion.div>
  );
}

export default function HeroSection() {
  const subtitle = useMemo(
    () =>
      "Construimos productos de IA, copilotos y plataformas de datos para optimizar operaciones, mejorar la toma de decisiones y acelerar la innovación.",
    []
  );
  const typed = useTypewriter(subtitle, 40, 250);
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-[90vh] items-center pt-20">
      {/* halo de fondo */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(6,182,212,.12) 0%, transparent 78%)",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center px-6 md:px-12 lg:px-20">
        {/* columna izquierda */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="z-10 flex max-w-2xl flex-col text-left"
        >
          <LogoWordmark />

          <h1
            className="mb-6 text-4xl font-extrabold leading-tight md:text-6xl"
            style={{
              background:
                "linear-gradient(135deg, var(--accentA), var(--accentB))",
              WebkitBackgroundClip: "text",
              color: "transparent",
              ...(reduce
                ? {}
                : { animation: "titlePulse 4s ease-in-out infinite" }),
            }}
          >
            Optimización empresarial con IA
          </h1>

          <p
            className="mb-10 max-w-xl text-base leading-relaxed text-[--color-muted] md:text-lg"
            aria-live="polite"
          >
            {typed}
            {!reduce && (
              <span
                aria-hidden
                className="ml-1 inline-block align-baseline neon-caret"
                style={{ ["--caret-color" as any]: "#22d3ee" }}
              >
                |
              </span>
            )}
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="transition"
          >
            <Link
              href="#contact"
              className="inline-block rounded-full px-6 py-3 font-semibold text-white shadow-lg"
              style={{
                background:
                  "linear-gradient(135deg, var(--accentA), var(--accentB))",
                textDecoration: "none",
              }}
            >
              Contanos tu caso de uso →
            </Link>
          </motion.div>
        </motion.div>

        {/* decor derecha */}
        <BrainDecor />
      </div>

      {/* estilos globales */}
      <style jsx global>{`
        .neon-caret {
          color: var(--caret-color);
          text-shadow: 0 0 5px var(--caret-color), 0 0 10px var(--caret-color),
            0 0 20px var(--caret-color);
          animation: neonBlink 1s infinite;
        }
        @keyframes neonBlink {
          0%,
          45% {
            opacity: 1;
          }
          50%,
          100% {
            opacity: 0;
          }
        }
        @keyframes brainPulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.08);
            opacity: 0.9;
          }
        }
        @keyframes spinRing {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes glowPulse {
          0%,
          100% {
            opacity: 0.28;
            filter: blur(14px);
          }
          50% {
            opacity: 0.55;
            filter: blur(22px);
          }
        }
      `}</style>
    </section>
  );
}
