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
  Truck,
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
  const items = ["RETAIL", "E-COMMERCE", "CPG", "3PL", "FARMACIA", "MANUFACTURA"];
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
   Página: LOGÍSTICA & PRODUCCIÓN
========================= */
export default function LogisticaFeaturePage() {
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
          <span className="text-slate-800 font-medium">Logística &amp; Producción</span>
        </nav>

        {/* Hero + prueba social */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 mb-10">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-600/30 bg-gradient-to-br from-cyan-500/10 to-sky-500/10 text-cyan-700 shadow-[inset_0_0_0_1px_rgba(56,189,248,.18)]">
            <Truck className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">Logística &amp; Producción</h1>
            <p className="text-slate-600 mt-2 max-w-2xl">
              Ruteo óptimo, control de inventario y <em>forecast</em> por tienda/SKU.
              Ejecutá reabastecimiento automático y baja costos de última milla.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge icon={PlugZap} label="ERP/WMS · APIs" />
              <Badge icon={Zap} label="Optimización multi-constraint" />
              <Badge icon={FileText} label="OTIF · KPIs en vivo" />
            </div>
          </div>
          <div className="w-full md:w-auto">
            <LogoCloud />
          </div>
        </div>

        {/* Media (placeholders: IMAGEN + VIDEO) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <MediaPlaceholder label="Imagen técnica — ruteo con ventanas y capacidad (alt)" />
          <MediaPlaceholder label="Video demo — forecast y reabastecimiento automático (alt)" />
        </div>

        {/* Métricas clave */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <StatCard title="Reducción de km" value={15} suffix="%" trend="up" icon={Gauge} spark={[18,17,16,15,15,14,14]} />
          <StatCard title="Quiebres de stock" value={22} suffix="%" trend="up" icon={TrendingUp} spark={[30,28,26,24,23,22,22]} />
          <StatCard title="OTIF" value={9} suffix=" pts" trend="up" icon={BarChart3} spark={[2,3,5,6,7,8,9]} />
          <StatCard title="Tiempo de planificación" value={40} suffix="%" trend="up" icon={MessageSquare} spark={[50,45,44,43,42,41,40]} />
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
                <span><strong>Ruteo dinámico</strong> con ventanas horarias, capacidad y restricciones.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-cyan-700" />
                <span><strong>Reabastecimiento automático</strong> por probabilidad de rotura y lead time.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-cyan-700" />
                <span><strong>Forecast de demanda</strong> jerárquico por tienda/SKU con señales externas.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-cyan-700" />
                <span><strong>Seguimiento en vivo</strong> y KPIs (OTIF, SLA, cumplimiento de ruta).</span>
              </li>
            </ul>

            <h3 className="mt-8 text-slate-900 font-semibold">Beneficios</h3>
            <ul className="mt-3 grid sm:grid-cols-2 gap-2 text-slate-700">
              <li>• Menos km y tiempo ocioso.</li>
              <li>• Menos quiebres y sobrestock.</li>
              <li>• Mejor nivel de servicio (OTIF).</li>
              <li>• Planificación más rápida y trazable.</li>
            </ul>

            {/* Mini demo before/after */}
            <div className="mt-8 rounded-xl border border-slate-200 p-4 bg-slate-50/50">
              <div className="text-sm text-slate-500 mb-2">Ejemplo rápido</div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="rounded-lg bg-white border border-slate-200 p-3">
                  <div className="text-xs font-semibold text-slate-500 mb-1">ANTES</div>
                  <p className="text-sm text-slate-700">
                    “Planillas manuales y ruteo fijo; quiebres en tiendas con alta variabilidad.”
                  </p>
                  <div className="mt-2 text-xs text-slate-500">→ Costos altos y OTIF bajo</div>
                </div>
                <div className="rounded-lg bg-white border border-emerald-200 p-3 shadow-[0_0_0_1px_rgba(16,185,129,0.2)]">
                  <div className="text-xs font-semibold text-emerald-600 mb-1">DESPUÉS (IA)</div>
                  <p className="text-sm text-slate-700">
                    “Rutas óptimas con ventanas y capacidad; reabastecimiento automático según riesgo.”
                  </p>
                  <div className="mt-2 text-xs text-emerald-600">→ −15% km · −22% quiebres · +9 pts OTIF</div>
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
              Integramos ERP/WMS/TMS y fuentes de demanda. KPIs en vivo por tienda y flota.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge icon={PlugZap} label="ERP / WMS / TMS" />
              <Badge icon={Headphones} label="Canales: Slack / Email" />
              <Badge icon={FileText} label="Reportes OTIF" />
            </div>

            <Link
              href="#contacto"
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-cyan-600/30 bg-cyan-600/10 px-4 py-2 text-cyan-700 hover:bg-cyan-600/20 transition"
            >
              Hablar con Ventas <ArrowRight className="h-4 w-4" />
            </Link>

            <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50/50 p-4">
              <p className="text-sm text-slate-700 italic">
                “Bajamos un 17% los kilómetros y recuperamos OTIF en 60 días.”
              </p>
              <div className="mt-2 text-xs text-slate-500">COO · Retail nacional</div>
            </div>
          </motion.aside>
        </div>

        {/* FAQ & CTA final */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            <FAQItem
              q="¿Qué datos necesitan?"
              a="Órdenes históricas, catálogo y stocks, tiempos y capacidades, restricciones (ventanas, zonas, flota)."
            />
            <FAQItem
              q="¿Cómo se actualizan las rutas?"
              a="Re-optimización ante nuevas órdenes o incidencias. Exponemos APIs y webhooks para sincronizar con tu TMS."
            />
            <FAQItem
              q="¿Cómo se calcula el forecast?"
              a="Modelos jerárquicos por tienda/SKU con estacionalidad, promociones y señales externas (clima, eventos)."
            />
          </div>

          <div className="rounded-2xl border border-cyan-600/30 bg-gradient-to-br from-cyan-600/10 to-sky-500/10 p-6">
            <div className="text-slate-900 font-semibold">PoC sin riesgo</div>
            <p className="text-slate-700 mt-1 text-sm">
              Piloto de 14 días con 1 región. Métricas: km, quiebres, OTIF, tiempo de planificación.
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
