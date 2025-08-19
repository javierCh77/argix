/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { Brain, Bot, Eye, Settings2 } from "lucide-react";
import { motion, useReducedMotion, type Variants, type Transition } from "framer-motion";
import { useCallback } from "react";
import styles from "./Features.module.css";

const features = [
  { icon: <Bot className="h-6 w-6" />, title: "Procesamiento de Lenguaje", description: "Extraemos valor del texto: analizamos conversaciones, clasificamos mensajes y generamos contenido automático para mejorar la atención al cliente y la productividad.", href: "/features/language" },
  { icon: <Eye className="h-6 w-6" />, title: "Visión por Computadora", description: "Detectamos personas, objetos y comportamientos en imágenes o video en tiempo real, ayudando en seguridad, control de calidad y monitoreo automatizado.", href: "/features/vision" },
  { icon: <Settings2 className="h-6 w-6" />, title: "Automatización Inteligente", description: "Digitalizamos procesos repetitivos con modelos de IA para incrementar la eficiencia operativa y reducir errores humanos.", href: "/features/automation" },
  { icon: <Brain className="h-6 w-6" />, title: "Integraciones Empresariales", description: "Conectamos tu infraestructura con modelos de IA, APIs externas y sistemas internos para potenciar tus operaciones con tecnología inteligente.", href: "/features/integrations" },
];

// --- Variants tipados ---
type ContainerCustom = { reduce: boolean };
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: ({ reduce }: ContainerCustom) => ({
    opacity: 1,
    transition: reduce
      ? ({ duration: 0.2 } as Transition)
      : ({ staggerChildren: 0.12, delayChildren: 0.08 } as Transition),
  }),
};

type CardCustom = { i: number; reduce: boolean };
const cardVariants: Variants = {
  hidden: ({ reduce }: CardCustom) =>
    reduce
      ? ({ opacity: 0 } as any)
      : ({ opacity: 0, y: 24, scale: 0.98, filter: "blur(6px)" } as any),

  show: ({ i, reduce }: CardCustom) =>
    reduce
      ? ({ opacity: 1, transition: { duration: 0.2 } as Transition } as any)
      : ({
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: {
            type: "spring" as const,
            stiffness: 260,
            damping: 26,
            mass: 0.8,
            delay: i * 0.06,
          } as Transition,
        } as any),
};

export default function Features() {
  const reduce = useReducedMotion();

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (reduce) return;
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const px = x / rect.width;
      const py = y / rect.height;
      const rx = (py - 0.5) * -10;
      const ry = (px - 0.5) * 10;
      el.style.setProperty("--mx", px.toString());
      el.style.setProperty("--my", py.toString());
      el.style.setProperty("--rx", `${rx}deg`);
      el.style.setProperty("--ry", `${ry}deg`);
    },
    [reduce]
  );

  const handleLeave = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    el.style.removeProperty("--mx");
    el.style.removeProperty("--my");
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }, []);

  return (
    <section id="features" className="relative -mt-10 pt-12 pb-20 md:pt-16 md:pb-28">
      {/* Fondo patrón sutil + halo */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.10)_1px,transparent_1.6px)] [background-size:22px_22px]"
          style={{
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0, black 24px)",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0, black 24px)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(56,189,248,0.12),transparent_55%)]" />
      </div>

      {/* CONTENEDOR ALINEADO CON NAVBAR */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block text-xs uppercase tracking-widest text-cyan-700 bg-cyan-600/10 border border-cyan-600/20 rounded-full px-3 py-1 mb-4">
            Capacidades
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-slate-900">¿Qué hacemos en Argix?</h2>
          <p className="text-slate-600 mb-12">Soluciones impulsadas por IA listas para integrarse en tu negocio.</p>
        </div>

        <motion.div
          variants={containerVariants}
          custom={{ reduce }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              custom={{ i, reduce }}
              whileHover={reduce ? undefined : { y: -2, scale: 1.02 }}
              className="group relative h-full"
            >
              <Link
                href={feature.href}
                onMouseMove={handleMove}
                onMouseLeave={handleLeave}
                className={`${styles.holoCard} relative z-10 h-full rounded-2xl overflow-hidden
                  bg-white border border-slate-200
                  shadow-[0_8px_22px_rgba(2,6,23,0.06)]
                  flex flex-col items-center text-center p-6 transition
                  hover:shadow-[0_16px_32px_rgba(2,6,23,0.10)] focus:outline-none`}
                aria-label={feature.title}
              >
                <span aria-hidden className={styles.holoBorder} />
                {!reduce && <span aria-hidden className={styles.holoSheen} />}
                <span aria-hidden className={styles.holoScanlines} />

                <div
                  className="
                    inline-flex items-center justify-center h-12 w-12 rounded-xl
                    border border-cyan-600/30
                    bg-gradient-to-br from-cyan-500/10 to-sky-500/10
                    text-cyan-700 shadow-[inset_0_0_0_1px_rgba(56,189,248,.18)]
                    mb-4
                  "
                >
                  {feature.icon}
                </div>

                <h3
                  className="
                    text-lg md:text-xl font-semibold text-slate-900
                    transition-[filter,transform,text-shadow] duration-300
                    group-hover:[text-shadow:_0_0_10px_rgba(56,189,248,.35)]
                  "
                >
                  {feature.title}
                </h3>

                <p className="text-slate-600 text-sm mt-2">{feature.description}</p>

                <span className="sr-only">Ir a {feature.title}</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
