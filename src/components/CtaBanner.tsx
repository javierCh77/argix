"use client";

import { motion, useReducedMotion, type Transition } from "framer-motion";
import { Sparkles } from "lucide-react";
import Image from "next/image";

// ✅ Tipar como tuple de 4 números
const ease: Transition["ease"] = [0.16, 1, 0.3, 1];

export default function CtaBanner() {
  const reduce = useReducedMotion();

  return (
    <section className="px-6">
      <div className="mx-auto w-full max-w-7xl">
        {/* Wrapper con borde degradado animado + halo */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="relative overflow-hidden rounded-2xl"
        >
          {/* Borde degradado animado */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              padding: "1px",
              background:
                "linear-gradient(90deg, rgba(34,211,238,0.6), rgba(192,132,252,0.6), rgba(34,211,238,0.6))",
              backgroundSize: reduce ? "100% 100%" : "300% 100%",
              animation: reduce ? undefined : "borderShift 8s linear infinite",
              WebkitMask:
                "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />

          {/* Contenido */}
          <div className="relative z-10 rounded-[calc(1rem+1px)] bg-white/85 backdrop-blur border border-white/60 p-6 md:p-8">
            {/* Halo sutil */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-24 opacity-40"
              style={{
                background:
                  "radial-gradient(60% 60% at 60% 40%, rgba(34,211,238,0.12) 0%, rgba(192,132,252,0.10) 35%, transparent 70%)",
                filter: "blur(24px)",
              }}
            />

            {/* Partículas mínimas */}
            {!reduce && <FloatingBits />}

            <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
              {/* Copy */}
              <div className="max-w-2xl">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-medium text-slate-700">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Automatización con IA</span>
                </div>

                <h3
                  id="cta-title"
                  className="text-2xl font-semibold leading-tight text-slate-900 md:text-3xl"
                >
                  ¿Listo para{" "}
                  <span className="relative">
                    acelerar
                    <span className="absolute -inset-1 -z-10 rounded-md bg-gradient-to-r from-cyan-300/40 to-purple-300/40 blur-sm" />
                  </span>{" "}
                  tus KPIs con IA?
                </h3>

                <p className="mt-2 text-slate-600">
                  Propongamos un piloto de <strong>4–6 semanas</strong> con
                  objetivos claros, métricas de éxito y entregables que puedas
                  llevar a producción.
                </p>

                {/* Badges de confianza */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge>Integración rápida</Badge>
                  <Badge>Seguridad & cumplimiento</Badge>
                  <Badge>ROI medible</Badge>
                </div>
              </div>

              {/* CTA */}
              <div className="shrink-0">
                {/* <Button href="#contacto">
                  <span className="inline-flex items-center gap-2">
                    Agendar llamada
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Button> */}
                <Image
                  src="/images/logo.png"
                  alt="Logo de la empresa"
                  width={150}
                  height={50}
                  className="h-[50px] w-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Animación CSS del borde */}
      <style jsx>{`
        @keyframes borderShift {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 300% 50%;
          }
        }
      `}</style>
    </section>
  );
}

/* =========================
   Subcomponentes
========================= */
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-full border border-slate-200 bg-white/70 px-2.5 py-1 text-xs font-medium text-slate-700 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
      {children}
    </div>
  );
}

/**
 * Partículas minimalistas: 3 puntos orbitando con parallax sutil.
 * No interfiere con el layout, sólo aporta profundidad.
 */
function FloatingBits() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <motion.span
        className="absolute h-2 w-2 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, #a78bfa 0%, rgba(167,139,250,0.2) 45%, transparent 70%)",
          top: "14%",
          left: "12%",
          filter: "blur(0.2px)",
        }}
        animate={{ x: [0, 8, -6, 0], y: [0, -6, 8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute h-2 w-2 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, #22d3ee 0%, rgba(34,211,238,0.2) 45%, transparent 70%)",
          top: "70%",
          left: "22%",
          filter: "blur(0.2px)",
        }}
        animate={{ x: [0, -10, 6, 0], y: [0, 7, -9, 0] }}
        transition={{ duration: 9.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute h-2 w-2 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, #60a5fa 0%, rgba(96,165,250,0.2) 45%, transparent 70%)",
          top: "36%",
          right: "10%",
          filter: "blur(0.2px)",
        }}
        animate={{ x: [0, 6, -8, 0], y: [0, -8, 6, 0] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
