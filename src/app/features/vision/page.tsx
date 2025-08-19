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
  ArrowRight,
  TrendingUp,
  Gauge,
  CheckCircle2,
  ShieldCheck,
  BarChart3,
  Zap,
  PlugZap,
  Camera,
  Cpu,
  CloudUpload,
  Video,
  Bell,
  ServerCog,
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
   Tarjetas de Métricas
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
   Nube de logos (placeholder)
========================= */
function LogoCloud() {
  const items = ["MANUFACTURA", "RETAIL", "SALUD", "LOGÍSTICA", "SEGURIDAD", "CIUDAD INTELIGENTE"];
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
   Demo de overlay de cámara (SVG)
========================= */
function CameraOverlayDemo() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-900/90 p-3">
      <div className="text-xs text-slate-300 mb-2">Detección en tiempo real (demo)</div>
      <div className="relative h-48 w-full rounded-md bg-[linear-gradient(135deg,rgba(14,165,233,0.15),rgba(99,102,241,0.15))]">
        {/* esquinas del marco */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-2 top-2 h-6 w-6 border-t-2 border-l-2 border-cyan-400/70 rounded-tl"></div>
          <div className="absolute right-2 top-2 h-6 w-6 border-t-2 border-r-2 border-cyan-400/70 rounded-tr"></div>
          <div className="absolute left-2 bottom-2 h-6 w-6 border-b-2 border-l-2 border-cyan-400/70 rounded-bl"></div>
          <div className="absolute right-2 bottom-2 h-6 w-6 border-b-2 border-r-2 border-cyan-400/70 rounded-br"></div>
        </div>
        {/* cajas de detección */}
        <div className="absolute left-[12%] top-[24%] border-2 border-emerald-400/90 rounded-md px-1 text-[10px] text-emerald-200 bg-emerald-900/30">
          defecto 0.91
          <div className="h-14 w-24" />
        </div>
        <div className="absolute right-[14%] bottom-[18%] border-2 border-cyan-300/90 rounded-md px-1 text-[10px] text-cyan-100 bg-cyan-900/30">
          persona 0.97
          <div className="h-12 w-20" />
        </div>
        <div className="absolute left-[36%] bottom-[30%] border-2 border-fuchsia-300/90 rounded-md px-1 text-[10px] text-fuchsia-100 bg-fuchsia-900/30">
          casco 0.88
          <div className="h-10 w-16" />
        </div>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-2 text-[10px] text-slate-300">
        <div>FPS: <span className="text-white">60</span></div>
        <div>Latencia: <span className="text-white">&lt;80ms</span></div>
        <div>Stream: <span className="text-white">RTSP</span></div>
      </div>
    </div>
  );
}

/* =========================
   Ítem de Preguntas Frecuentes
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
   Página de Feature de Visión
========================= */
export default function VisionFeaturePage() {
  return (
    <section className="relative py-16 md:py-24">
      {/* Fondo sutil alineado a tu paleta */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.12)_1px,transparent_1.6px)] [background-size:22px_22px]" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(56,189,248,0.10),transparent_55%)]" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-sm mb-6 text-slate-600">
          <Link href="/" className="hover:underline">Inicio</Link>
          <span className="mx-2">/</span>
          <Link href="/#features" className="hover:underline">Características</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800 font-medium">Visión por Computadora</span>
        </nav>

        {/* Hero + social proof */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 mb-10">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-600/30 bg-gradient-to-br from-cyan-500/10 to-sky-500/10 text-cyan-700 shadow-[inset_0_0_0_1px_rgba(56,189,248,.18)]">
            <Camera className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">Visión por Computadora</h1>
            <p className="text-slate-600 mt-2 max-w-2xl">
              Detectá personas, objetos y comportamientos en imágenes o video en tiempo real para mejorar la seguridad,
              el control de calidad y la supervisión automatizada.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge icon={ShieldCheck} label="Despliegue en edge o nube" />
              <Badge icon={Zap} label="Inferencia &lt;100ms" />
              <Badge icon={PlugZap} label="RTSP · ONVIF · Webhooks" />
            </div>
          </div>
          <div className="w-full md:w-auto">
            <LogoCloud />
          </div>
        </div>

        {/* Métricas clave */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <StatCard title="Aumento de precisión" value={23} suffix=" pts" trend="up" icon={TrendingUp} spark={[5,6,7,9,11,13,14]} />
          <StatCard title="Rendimiento" value={60} suffix=" fps" trend="up" icon={Gauge} spark={[20,28,32,40,48,55,60]} />
          <StatCard title="Falsos positivos" value={42} suffix="%" trend="down" icon={BarChart3} spark={[14,13,11,9,8,7,6]} />
          <StatCard title="Tiempo de respuesta" value={35} suffix="%" trend="down" icon={Bell} spark={[12,11,10,9,8,7,6]} />
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
                <span><strong>Inspección de calidad</strong>: defectos superficiales, verificación de ensamblaje, OCR de etiquetas.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-cyan-700" />
                <span><strong>Seguridad y cumplimiento</strong>: detección de EPP, zonas restringidas, detección de caídas.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-cyan-700" />
                <span><strong>Analítica retail</strong>: afluencia, tiempo de permanencia, disponibilidad en góndola.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-cyan-700" />
                <span><strong>Logística</strong>: conteo de pallets, códigos de barras/QR, ocupación de carriles.</span>
              </li>
            </ul>

            <h3 className="mt-8 text-slate-900 font-semibold">Beneficios</h3>
            <ul className="mt-3 grid sm:grid-cols-2 gap-2 text-slate-700">
              <li>• Decisiones en tiempo real con menos falsos positivos.</li>
              <li>• Alertas y flujos automáticos.</li>
              <li>• Escalable entre sitios y cámaras.</li>
              <li>• Despliegue en edge o en tu nube.</li>
            </ul>

            {/* Mini demo */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <CameraOverlayDemo />
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                <div className="text-sm text-slate-500 mb-2">Carga de alerta (ejemplo)</div>
                <pre className="text-xs text-slate-800 bg-white border border-slate-200 rounded-lg p-3 overflow-auto">
{`{
  "event": "ppe_missing",
  "camera_id": "dock-07",
  "timestamp": "2025-08-18T14:22:31Z",
  "objects": [
    { "type": "person", "confidence": 0.97, "bbox": [412,188,96,210] },
    { "type": "helmet", "confidence": 0.42, "bbox": [430,160,70,48] }
  ],
  "actions": ["notify_slack", "webhook:/ops/ppe"]
}`}
                </pre>
                <div className="mt-3 text-xs text-slate-600">
                  Enrutá a Slack, webhooks o tu MES/WMS. Incluye limitación de frecuencia y desduplicación.
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar con CTA e integraciones */}
          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl bg-white border border-slate-200 p-6 shadow-[0_8px_22px_rgba(2,6,23,0.06)]"
          >
            <h3 className="text-slate-900 font-semibold">¿Listo para probar?</h3>
            <p className="text-slate-600 mt-2">
              Conectá tus cámaras, configurá zonas y clases, y salí en vivo en días—no meses.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge icon={Video} label="RTSP / ONVIF" />
              <Badge icon={CloudUpload} label="Ingesta S3 · GCS" />
              <Badge icon={ServerCog} label="Kafka · Webhooks" />
              <Badge icon={Cpu} label="Edge NVIDIA/Intel" />
            </div>

            <Link
              href="#contact"
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-cyan-600/30 bg-cyan-600/10 px-4 py-2 text-cyan-700 hover:bg-cyan-600/20 transition"
            >
              Hablar con Ventas <ArrowRight className="h-4 w-4" />
            </Link>

            {/* Testimonio corto */}
            <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50/50 p-4">
              <p className="text-sm text-slate-700 italic">
                “La tasa de escapes de defectos bajó un 31% en el primer mes en 5 líneas.”
              </p>
              <div className="mt-2 text-xs text-slate-500">Director de Operaciones · Fabricante Tier-1</div>
            </div>
          </motion.aside>
        </div>

        {/* FAQ y CTA final */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            <FAQItem
              q="¿Funciona offline en el edge?"
              a="Sí — puede desplegarse en gateways/IPC locales con sincronización periódica. Las alertas se almacenan y reenvían cuando se restablece la conectividad."
            />
            <FAQItem
              q="¿Cómo manejan la privacidad?"
              a="Desenfoque o redacción de PII on-device, retención configurable y acceso basado en roles. Cifrado en tránsito y en reposo."
            />
            <FAQItem
              q="¿Cómo integro las alertas?"
              a="Conectores nativos para Slack y webhooks. Enviá eventos a Kafka, MQTT o tus endpoints REST."
            />
          </div>

          <div className="rounded-2xl border border-cyan-600/30 bg-gradient-to-br from-cyan-600/10 to-sky-500/10 p-6">
            <div className="text-slate-900 font-semibold">PoC sin riesgo</div>
            <p className="text-slate-700 mt-1 text-sm">
              Piloto de 7 días: 2 cámaras, 3 clases, KPIs medibles (precisión, FPS, calidad de alertas).
            </p>
            <Link
              href="#contact"
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
