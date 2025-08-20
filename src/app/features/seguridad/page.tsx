/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import {
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Gauge,
  MessageSquare,
  CheckCircle2,
  BarChart3,
  Zap,
  PlugZap,
  Headphones,
  FileText,
} from "lucide-react";
import { useEffect } from "react";

/* =========================
   Utils: CountUp & Sparkline
========================= */
function useCountUp(to: number, duration = 1.2) {
  const mv = useMotionValue(0);
  useEffect(() => {
    const controls = animate(mv, to, { duration, ease: "easeOut" });
    return controls.stop;
  }, [to, duration, mv]);
  return mv;
}

function Sparkline({ points = [5, 7, 6, 9, 12, 10, 14] }: { points?: number[] }) {
  const width = 120;
  const height = 36;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const norm = (v: number) =>
    (height - 6) * ((v - min) / (max - min || 1)) + 3;
  const step = width / (points.length - 1 || 1);

  const d = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${i * step} ${height - norm(p)}`)
    .join(" ");

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden>
      <path d={d} fill="none" stroke="currentColor" strokeWidth="2" opacity={0.9} />
    </svg>
  );
}

/* =========================
   Tarjetas de métricas
========================= */
function StatCard({
  title,
  value,
  suffix,
  trend,
  icon: Icon,
  spark = [4, 6, 5, 7, 9, 8, 12],
}: {
  title: string;
  value: number;
  suffix?: string;
  trend: "up" | "down";
  icon: any;
  spark?: number[];
}) {
  const mv = useCountUp(value, 1.1);
  const rounded = useTransform(mv, (v) => Math.round(v).toString());

  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-[0_8px_22px_rgba(2,6,23,0.06)]">
      <div className="flex items-center justify-between">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-600/30 bg-cyan-600/10 text-cyan-700">
          <Icon className="h-5 w-5" />
        </div>
        <div className={`text-xs font-semibold ${trend === "up" ? "text-emerald-600" : "text-rose-600"}`}>
          {trend === "up" ? "▲ Mejora" : "▼ Caída"}
        </div>
      </div>

      <div className="mt-3">
        <div className="text-sm text-slate-600">{title}</div>
        <div className="mt-1 flex items-baseline gap-1">
          <motion.span className="text-2xl font-bold tabular-nums text-slate-900">
            {rounded}
          </motion.span>
          {suffix ? <span className="text-slate-500">{suffix}</span> : null}
        </div>
      </div>

      <div className="mt-3 text-cyan-700/80">
        <Sparkline points={spark} />
      </div>
    </div>
  );
}

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
  const items = ["CONSTRUCCIÓN", "MANUFACTURA", "MINERÍA", "OIL & GAS", "LOGÍSTICA", "ENERGÍA"];
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
   Placeholder accesible para IMAGEN/VIDEO
========================= */
function MediaPlaceholder({ label }: { label: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className="aspect-video w-full overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_10px_24px_rgba(168,85,247,0.18)]"
    >
      <div className="h-full w-full grid place-content-center text-xs text-slate-500">
        {label}
      </div>
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
   Página: SEGURIDAD & CUMPLIMIENTO
========================= */
export default function SeguridadFeaturePage() {
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
          <span className="text-slate-800 font-medium">Seguridad &amp; Cumplimiento</span>
        </nav>

        {/* Hero + prueba social */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 mb-10">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-600/30 bg-gradient-to-br from-cyan-500/10 to-sky-500/10 text-cyan-700 shadow-[inset_0_0_0_1px_rgba(56,189,248,.18)]">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">Seguridad &amp; Cumplimiento</h1>
            <p className="text-slate-600 mt-2 max-w-2xl">
              Detección de EPP con visión por computadora, reglas por área y <em>alertas en tiempo real</em>.
              Reportes automáticos y evidencia para auditorías.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge icon={Zap} label="Tiempo a alerta &lt; 2s" />
              <Badge icon={PlugZap} label="Webhooks / ChatOps" />
              <Badge icon={FileText} label="Reportes mensuales" />
            </div>
          </div>
          <div className="w-full md:w-auto">
            <LogoCloud />
          </div>
        </div>

        {/* Media (placeholders: IMAGEN + VIDEO) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <MediaPlaceholder label="Imagen técnica — detección de casco/arnés y zonas (alt)" />
          <MediaPlaceholder label="Video demo — alertas en tiempo real y ticketing (alt)" />
        </div>

        {/* Métricas clave */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <StatCard title="Incidentes por EPP" value={41} suffix="%" trend="up" icon={TrendingUp} spark={[12,11,10,9,8,7,6]} />
          <StatCard title="Tiempo a alerta" value={2} suffix=" s" trend="up" icon={Gauge} spark={[6,5,4,3,3,2,2]} />
          <StatCard title="Cumplimiento EPP" value={92} suffix="%" trend="up" icon={BarChart3} spark={[70,75,80,85,88,90,92]} />
          <StatCard title="Automatización de reportes" value={100} suffix="%" trend="up" icon={MessageSquare} spark={[20,40,60,80,85,95,100]} />
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
                <span><strong>Detección de EPP</strong> (casco, arnés, chaleco) desde cámaras existentes.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-cyan-700" />
                <span><strong>Reglas por área/horario</strong> y geocercas con excepciones.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-cyan-700" />
                <span><strong>Alertas en segundos</strong> hacia Slack/Teams o webhook a tu SOC.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-cyan-700" />
                <span><strong>Ticketing y reportes</strong> con evidencia y métricas por sitio.</span>
              </li>
            </ul>

            <h3 className="mt-8 text-slate-900 font-semibold">Beneficios</h3>
            <ul className="mt-3 grid sm:grid-cols-2 gap-2 text-slate-700">
              <li>• Reducción de incidentes y near-miss.</li>
              <li>• Respuesta más rápida ante eventos.</li>
              <li>• Evidencia clara para auditorías.</li>
              <li>• Escalable a múltiples plantas y cámaras.</li>
            </ul>

            {/* Mini demo before/after */}
            <div className="mt-8 rounded-xl border border-slate-200 p-4 bg-slate-50/50">
              <div className="text-sm text-slate-500 mb-2">Ejemplo rápido</div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="rounded-lg bg-white border border-slate-200 p-3">
                  <div className="text-xs font-semibold text-slate-500 mb-1">ANTES</div>
                  <p className="text-sm text-slate-700">
                    “Inspección manual por rondas, sin registro centralizado.”
                  </p>
                  <div className="mt-2 text-xs text-slate-500">→ Detección tardía / sin trazabilidad</div>
                </div>
                <div className="rounded-lg bg-white border border-emerald-200 p-3 shadow-[0_0_0_1px_rgba(16,185,129,0.2)]">
                  <div className="text-xs font-semibold text-emerald-600 mb-1">DESPUÉS (IA)</div>
                  <p className="text-sm text-slate-700">
                    “Alerta automática por ausencia de casco en zona A — ticket creado y notificado al supervisor.”
                  </p>
                  <div className="mt-2 text-xs text-emerald-600">→ Respuesta en segundos + evidencia</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar con CTA */}
          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl bg-white border border-slate-200 p-6 shadow-[0_8px_22px_rgba(2,6,23,0.06)]"
          >
            <h3 className="text-slate-900 font-semibold">¿Listo para probar?</h3>
            <p className="text-slate-600 mt-2">
              Conectamos tus cámaras RTSP/ONVIF y enviamos alertas a Slack/Teams o webhooks en minutos.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge icon={Headphones} label="Canales: Slack / Teams" />
              <Badge icon={PlugZap} label="RTSP · Webhooks · Kafka" />
              <Badge icon={FileText} label="Dashboard / Grafana" />
            </div>

            <Link
              href="#contacto"
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-cyan-600/30 bg-cyan-600/10 px-4 py-2 text-cyan-700 hover:bg-cyan-600/20 transition"
            >
              Hablar con Ventas <ArrowRight className="h-4 w-4" />
            </Link>

            {/* Testimonio corto */}
            <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50/50 p-4">
              <p className="text-sm text-slate-700 italic">
                “Reducimos incidentes por EPP y ganamos trazabilidad completa para auditorías.”
              </p>
              <div className="mt-2 text-xs text-slate-500">HSE Manager · Planta Industrial</div>
            </div>
          </motion.aside>
        </div>

        {/* FAQ & CTA final */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            <FAQItem
              q="¿Qué hardware necesito?"
              a="Funciona con cámaras IP RTSP/ONVIF existentes. Para sitios con baja luz, recomendamos sensores con IR o mejor iluminación del área."
            />
            <FAQItem
              q="¿Cómo manejan privacidad/retención?"
              a="Encriptación en tránsito y reposo, retención configurable y desenfoque opcional. Podemos desplegar en tu nube o on-prem."
            />
            <FAQItem
              q="¿Cómo integro las alertas?"
              a="Webhooks, Slack/Teams y ticketing. También exportamos eventos a Kafka y dashboards (Grafana)."
            />
          </div>

          <div className="rounded-2xl border border-cyan-600/30 bg-gradient-to-br from-cyan-600/10 to-sky-500/10 p-6">
            <div className="text-slate-900 font-semibold">PoC sin riesgo</div>
            <p className="text-slate-700 mt-1 text-sm">
              Piloto de 7 días con 2 cámaras y reglas por zona. Métricas: tiempo a alerta, incidentes, cumplimiento.
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
