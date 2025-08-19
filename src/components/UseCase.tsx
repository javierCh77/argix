"use client";

import React from "react";
import { Building, Stethoscope, ShieldCheck, Users, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import MotionCard from "./ui/MotionCard";
import Link from "next/link";

type UseCase = {
  icon: React.ReactNode;
  title: string;
  description: string;
  bullets: string[];
  href?: string;
};

const CASES: UseCase[] = [
  {
    icon: <Stethoscope size={20} className="text-purple-600" />,
    title: "Salud",
    description: "Análisis de historias clínicas, triage de síntomas y turnos automáticos.",
    bullets: ["Extracción de datos clínicos", "Clasificación de síntomas", "Alertas y priorización"],
    href: "#contacto",
  },
  {
    icon: <Users size={20} className="text-purple-600" />,
    title: "Recursos Humanos",
    description: "Filtrado de CVs, entrevistas guiadas y matching por skills.",
    bullets: ["Rankeo de candidatos", "Entrevistas con IA", "Onboarding asistido"],
    href: "#contacto",
  },
  {
    icon: <ShieldCheck size={20} className="text-purple-600" />,
    title: "Seguridad & Cumplimiento",
    description: "Detección de EPP con visión por computadora y alertas en tiempo real.",
    bullets: ["Detección de casco/arnés", "Reglas por área", "Reportes automáticos"],
    href: "#contacto",
  },
  {
    icon: <Building size={20} className="text-purple-600" />,
    title: "Logística & Producción",
    description: "Ruteo óptimo, control de inventario y predicción de demanda.",
    bullets: ["Ruteo dinámico", "Automatización de reabastecimiento", "Forecast de demanda"],
    href: "#contacto",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

export default function UseCases() {
  return (
    <section id="cases" className="relative py-20 md:py-28">
      {/* Contenedor alineado con navbar */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block text-xs uppercase tracking-widest text-purple-700 bg-purple-600/10 border border-purple-600/20 rounded-full px-3 py-1 mb-3">
            Soluciones por Industria
          </span>
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-2 text-slate-900"
            style={{ lineHeight: 1.15 }}
          >
            Casos de Uso Reales
          </h2>
          <p className="text-slate-600">
            Implementaciones concretas listas para adaptarse a tu contexto y stack.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {CASES.map((c, i) => (
            <motion.div
              key={c.title}
              className="h-full"
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.45 } },
              }}
            >
              <MotionCard
                delayMs={i * 60}
                glow="purple"
                glass
                className="
                  h-full flex relative
                  rounded-2xl border border-slate-200 bg-white/80 backdrop-blur
                  shadow-[0_1px_3px_rgba(0,0,0,0.04)]
                  hover:shadow-[0_2px_6px_rgba(0,0,0,0.06)]
                  hover:border-purple-200 transition
                "
              >
                {/* Contenido */}
                <div className="relative z-10 p-6 md:p-7 flex flex-col grow text-left">
                  {/* Título + icono */}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="
                        inline-flex items-center justify-center h-11 w-11 rounded-xl
                        border border-purple-200
                        bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10
                        text-purple-700
                      "
                      aria-hidden
                    >
                      {c.icon}
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-slate-900">{c.title}</h3>
                  </div>

                  {/* Descripción */}
                  <p className="text-slate-600 leading-relaxed mb-3 text-sm md:text-base">
                    {c.description}
                  </p>

                  {/* Bullets */}
                  <ul className="space-y-1.5 text-slate-600 text-sm">
                    {c.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-purple-400 to-fuchsia-500" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA fijo abajo */}
                  {c.href && (
                    <div className="mt-auto pt-4">
                      <Link
                        href={c.href}
                        className="
                          inline-flex items-center gap-2 text-purple-700 hover:text-purple-900
                          font-medium transition
                        "
                        aria-label={`Más información sobre ${c.title}`}
                      >
                        Más información <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  )}
                </div>
              </MotionCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
