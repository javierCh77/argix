'use client';

import { motion, type Variants, type Transition } from 'framer-motion';
import { UploadCloud, Sparkles, BarChart3 } from 'lucide-react';
import type { ReactNode } from 'react';

const EASE: Transition['ease'] = [0.16, 1, 0.3, 1]; // equivalente a easeOut-ish
// Alternativa: const EASE = cubicBezier(0.16, 1, 0.3, 1);

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

type Step = {
  icon: ReactNode;
  title: string;
  description: string;
};

const STEPS: Step[] = [
  {
    icon: <UploadCloud className="h-6 w-6" />,
    title: '1. Captura de Datos',
    description: 'Tus sistemas envían texto, imágenes o señales en tiempo real a Argix.',
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: '2. Procesamiento Inteligente',
    description: 'Aplicamos modelos de lenguaje, visión o lógica automática según el caso de uso.',
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: '3. Resultados e Integración',
    description: 'Devolvemos decisiones, reportes o acciones listas para integrarse en tus flujos.',
  },
];

export default function HowItWorks() {
  return (
    <section id="tech" className="relative py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block text-xs uppercase tracking-widest text-purple-700 bg-purple-600/10 border border-purple-600/20 rounded-full px-3 py-1 mb-4">
          Pipeline
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-slate-900">
          ¿Cómo funciona Argix?
        </h2>
        <p className="text-slate-600 mb-12">De datos en bruto a decisiones accionables en minutos.</p>

        <div className="relative">
          <div
            aria-hidden
            className="hidden md:block absolute top-1/2 left-[10%] right-[10%] -translate-y-1/2 h-px
                       bg-gradient-to-r from-transparent via-purple-400/20 to-transparent"
          />
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left"
          >
            {STEPS.map((s, i) => (
              <motion.article key={s.title} variants={item} className="group relative h-full">
                <div className="absolute inset-0 rounded-2xl ring-1 ring-purple-200/30 group-hover:ring-purple-300/40 transition" />
                <div
                  className="
                    relative z-10 h-full rounded-2xl overflow-hidden
                    border border-slate-200 bg-white/80 backdrop-blur
                    shadow-[0_4px_14px_rgba(2,6,23,0.04)]
                    hover:shadow-[0_8px_20px_rgba(2,6,23,0.08)]
                    transition
                  "
                >
                  {/* brillo diagonal hover */}
                  <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    initial={{ x: '-110%' }}
                    whileHover={{ x: '110%' }}
                    transition={{ duration: 0.9, ease: EASE }}  
                    style={{
                      background:
                        'linear-gradient(12deg, rgba(196,138,255,0) 35%, rgba(196,138,255,.15) 50%, rgba(196,138,255,0) 65%)',
                      filter: 'blur(8px)',
                    }}
                  />

                  <div className="p-6 flex flex-col items-center text-center gap-3 h-full">
                    <motion.div
                      whileHover={{ rotate: 6, scale: 1.05 }}
                      className="
                        inline-flex items-center justify-center h-12 w-12 rounded-xl
                        border border-purple-200
                        bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10
                        text-purple-700
                      "
                      aria-hidden
                    >
                      {s.icon}
                    </motion.div>

                    <h3 className="text-lg md:text-xl font-semibold text-slate-900">{s.title}</h3>
                    <p className="text-sm text-slate-600">{s.description}</p>

                    <motion.span
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="mt-auto inline-flex items-center gap-2 rounded-full border border-purple-200/60 bg-purple-50 px-3 py-1 text-[12px] text-purple-700"
                    >
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-purple-400 to-fuchsia-500" />
                      Paso {i + 1}
                    </motion.span>
                  </div>
                </div>

                <div
                  aria-hidden
                  className="hidden md:block absolute -bottom-3 left-1/2 -translate-x-1/2 h-6 w-6 rounded-full
                             bg-white border border-purple-100 shadow-[0_0_6px_rgba(168,85,247,.10)]"
                />
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
