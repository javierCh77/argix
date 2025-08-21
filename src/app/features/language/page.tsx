/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bot,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
  PlugZap,
  Headphones,
  FileText,
} from "lucide-react";

/* =========================
   Badges simples
========================= */
function Badge({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 shadow-sm">
      <Icon className="h-4 w-4 text-slate-700" />
      {label}
    </div>
  );
}

/* =========================
   Logo Cloud (placeholder)
========================= */
function LogoCloud() {
  const items = ["SALUD", "RETAIL", "FINTECH", "EDTECH", "LOGÍSTICA", "PÚBLICO"];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
      {items.map((t) => (
        <div
          key={t}
          className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-3 text-center text-xs font-medium text-slate-600 shadow-sm"
        >
          {t}
        </div>
      ))}
    </div>
  );
}

/* =========================
   Item de FAQ
========================= */
function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <summary className="cursor-pointer list-none font-semibold text-slate-900 flex items-center justify-between">
        <span>{q}</span>
        <span className="text-slate-400 group-open:rotate-180 transition">⌄</span>
      </summary>
      <p className="mt-2 text-slate-600">{a}</p>
    </details>
  );
}

/* =========================
   Bloques de impacto (texto claro)
========================= */
function ImpactBlock({
  title,
  lines,
}: {
  title: string;
  lines: string[];
}) {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-[0_8px_22px_rgba(2,6,23,0.06)]">
      <div className="text-sm font-semibold text-slate-900">{title}</div>
      <ul className="mt-3 space-y-2 text-slate-700">
        {lines.map((l, i) => (
          <li key={i} className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-5 w-5 text-cyan-700" />
            <span>{l}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* =========================
   Tabla simple Antes / Después (texto)
========================= */
function BeforeAfterTable() {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-[0_8px_22px_rgba(2,6,23,0.06)]">
      <div className="text-sm font-semibold text-slate-900">Antes vs Después</div>
      <div className="mt-3 overflow-hidden rounded-lg border border-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr className="text-slate-600">
              <th className="px-4 py-2 text-left">Indicador</th>
              <th className="px-4 py-2 text-left">Sin IA</th>
              <th className="px-4 py-2 text-left">Con IA</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="px-4 py-2 text-slate-700">Tiempo de respuesta</td>
              <td className="px-4 py-2 text-slate-500">Lento y variable</td>
              <td className="px-4 py-2 font-medium text-slate-900">Respuestas consistentes en segundos</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-slate-700">Costo por interacción</td>
              <td className="px-4 py-2 text-slate-500">Alto por volumen manual</td>
              <td className="px-4 py-2 font-medium text-slate-900">Menor costo por automatización</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-slate-700">% de resolución</td>
              <td className="px-4 py-2 text-slate-500">Inconsistente</td>
              <td className="px-4 py-2 font-medium text-slate-900">Mayor resolución en primer contacto</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-slate-700">Escalabilidad</td>
              <td className="px-4 py-2 text-slate-500">Limitada por equipo</td>
              <td className="px-4 py-2 font-medium text-slate-900">Escala sin aumentar headcount</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-slate-500">
        Valores demostrativos para ilustrar el impacto; se ajustan según tu volumen y canal.
      </p>
    </div>
  );
}

/* =========================
   Página
========================= */
export default function LanguageFeaturePage() {
  return (
    <section className="relative py-16 md:py-24">
      {/* Fondo acorde a la paleta */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.12)_1px,transparent_1.6px)] [background-size:22px_22px]" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(56,189,248,0.10),transparent_55%)]" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-sm mb-6 text-slate-600">
          <Link href="/" className="hover:underline">Inicio</Link>
          <span className="mx-2">/</span>
          <Link href="/#features" className="hover:underline">Funcionalidades</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800 font-medium">Procesamiento de Lenguaje</span>
        </nav>

        {/* Hero + prueba social */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 mb-10">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-600/30 bg-gradient-to-br from-cyan-500/10 to-sky-500/10 text-cyan-700 shadow-[inset_0_0_0_1px_rgba(56,189,248,.18)]">
            <Bot className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">Procesamiento de Lenguaje</h1>
            <p className="text-slate-600 mt-2 max-w-2xl">
              Analítica de conversaciones, clasificación de mensajes y generación asistida de contenido para
              potenciar la calidad de soporte y la productividad en todos los canales.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge icon={ShieldCheck} label="Privacidad por diseño" />
              <Badge icon={Zap} label="Latencia &lt; 1s" />
              <Badge icon={PlugZap} label="API & Webhooks" />
            </div>
          </div>
          <div className="w-full md:w-auto">
            <LogoCloud />
          </div>
        </div>

        {/* Impacto — claro y sin gráficos */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <ImpactBlock
            title="Eficiencia operativa"
            lines={[
              "Menos tiempo en preguntas repetitivas.",
              "Disponibilidad 24/7 sin aumentar headcount.",
              "Escalado automático en picos de demanda.",
            ]}
          />
          <ImpactBlock
            title="Calidad y consistencia"
            lines={[
              "Respuestas estandarizadas con contexto.",
              "Mejor control de tono y cumplimiento.",
              "Trazabilidad para auditorías y QA.",
            ]}
          />
          <ImpactBlock
            title="Insights accionables"
            lines={[
              "Detección de temas y sentimiento en tiempo real.",
              "Hallazgos para entrenamiento y mejoras de CX.",
              "Alertas tempranas ante incidencias.",
            ]}
          />
        </motion.div>

        {/* Contenido principal + sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 rounded-2xl bg-white border border-slate-200 p-6 shadow-[0_8px_22px_rgba(2,6,23,0.06)]"
          >
            <h2 className="text-xl font-semibold text-slate-900">Casos de uso</h2>
            <ul className="mt-4 grid sm:grid-cols-2 gap-3 text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-cyan-700" />
                <span><strong>Análisis de sentimiento y temas</strong> en tiempo real.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-cyan-700" />
                <span><strong>Resúmenes automáticos</strong> de chats, emails y tickets.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-cyan-700" />
                <span><strong>Triage y enrutamiento inteligente</strong> de consultas.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-cyan-700" />
                <span><strong>Generación asistida</strong> de respuestas y documentación.</span>
              </li>
            </ul>

            <h3 className="mt-8 text-slate-900 font-semibold">Antes y después</h3>
            <p className="mt-2 text-slate-600">
              Vista comparativa para entender el salto operativo sin entrar en datos específicos.
            </p>
            <div className="mt-4">
              <BeforeAfterTable />
            </div>

            {/* Mini demo textual */}
            <div className="mt-8 rounded-xl border border-slate-200 p-4 bg-slate-50/50">
              <div className="text-sm text-slate-500 mb-2">Ejemplo rápido</div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="rounded-lg bg-white border border-slate-200 p-3">
                  <div className="text-xs font-semibold text-slate-500 mb-1">ANTES</div>
                  <p className="text-sm text-slate-700">
                    “Necesito reprogramar mi turno, ¿hay algo disponible mañana?”
                  </p>
                  <div className="mt-2 text-xs text-slate-500">→ Humano espera 12–18 min</div>
                </div>
                <div className="rounded-lg bg-white border border-emerald-200 p-3 shadow-[0_0_0_1px_rgba(16,185,129,0.2)]">
                  <div className="text-xs font-semibold text-emerald-600 mb-1">DESPUÉS (IA)</div>
                  <p className="text-sm text-slate-700">
                    “Claro — mañana tengo 10:30, 12:00 y 16:15 disponibles. ¿Cuál preferís?”
                  </p>
                  <div className="mt-2 text-xs text-emerald-600">→ Respuesta y reprogramación instantánea</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar con CTA */}
          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="rounded-2xl bg-white border border-slate-200 p-6 shadow-[0_8px_22px_rgba(2,6,23,0.06)]"
          >
            <h3 className="text-slate-900 font-semibold">¿Listo para probar?</h3>
            <p className="text-slate-600 mt-2">
              Nos integramos con tus canales actuales (web, WhatsApp, helpdesk) en días, no meses.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge icon={Headphones} label="WhatsApp / Voz" />
              <Badge icon={FileText} label="Email / Tickets" />
              <Badge icon={PlugZap} label="Zendesk · Slack · API" />
            </div>

            <Link
              href="/#contact"
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-cyan-600/30 bg-cyan-600/10 px-4 py-2 text-cyan-700 hover:bg-cyan-600/20 transition"
            >
              Hablar con Ventas <ArrowRight className="h-4 w-4" />
            </Link>

            {/* Testimonio corto */}
            <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50/50 p-4">
              <p className="text-sm text-slate-700 italic">
                “Reducimos tiempos de respuesta en 40% en tres semanas, y subió el CSAT.”
              </p>
              <div className="mt-2 text-xs text-slate-500">CTO · Empresa de Salud Regional</div>
            </div>
          </motion.aside>
        </div>

        {/* FAQ & CTA final */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            <FAQItem
              q="¿Cómo manejan los datos sensibles?"
              a="Aplicamos seudonimización, retención configurable y encriptación en tránsito y en reposo. Podemos desplegar en tu nube si lo requerís."
            />
            <FAQItem
              q="¿Qué idiomas soportan?"
              a="Español, inglés y portugués nativamente. Otros bajo pedido."
            />
            <FAQItem
              q="¿Cómo se integra con mis sistemas?"
              a="Conectores para WhatsApp, Zendesk, Slack y webhooks REST. También integramos bases de conocimiento y FAQs."
            />
          </div>

          <div className="rounded-2xl border border-cyan-600/30 bg-gradient-to-br from-cyan-600/10 to-sky-500/10 p-6">
            <div className="text-slate-900 font-semibold">PoC sin riesgo</div>
            <p className="text-slate-700 mt-1 text-sm">
              Piloto de 7 días con 1 canal y métricas claras: TTR, CSAT, % de automatización.
            </p>
            <Link
              href="#contacto"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-4 py-2 text-white hover:bg-cyan-700 transition"
            >
              Iniciar PoC <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
