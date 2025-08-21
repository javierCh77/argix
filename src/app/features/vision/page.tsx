/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
  PlugZap,
  Camera,
  Cpu,
  CloudUpload,
  Video,
  ServerCog,
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
   Demo de overlay de cámara (visual, no gráfico)
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
              <td className="px-4 py-2 text-slate-700">Falsos positivos</td>
              <td className="px-4 py-2 text-slate-500">Altos y variables</td>
              <td className="px-4 py-2 font-medium text-slate-900">Reducción con QA continuo y umbrales</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-slate-700">Tiempo de inspección</td>
              <td className="px-4 py-2 text-slate-500">Segundos por ítem</td>
              <td className="px-4 py-2 font-medium text-slate-900">Milisegundos por cuadro</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-slate-700">Cobertura</td>
              <td className="px-4 py-2 text-slate-500">Turnos limitados</td>
              <td className="px-4 py-2 font-medium text-slate-900">Monitoreo 24/7 con alertas</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-slate-700">Escalabilidad</td>
              <td className="px-4 py-2 text-slate-500">Agregar personal</td>
              <td className="px-4 py-2 font-medium text-slate-900">Agregar cámaras/nodos edge</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-slate-500">
        Valores demostrativos para ilustrar el impacto; se ajustan según tu entorno y KPIs.
      </p>
    </div>
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

        {/* Impacto — claro y sin gráficos */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <ImpactBlock
            title="Seguridad & cumplimiento"
            lines={[
              "Detección de EPP y zonas restringidas.",
              "Alertas automáticas ante caídas o intrusiones.",
              "Registro y evidencia para auditorías.",
            ]}
          />
          <ImpactBlock
            title="Calidad en línea"
            lines={[
              "Defectos superficiales y verificación de ensamblaje.",
              "OCR de etiquetas y seriales.",
              "Trazabilidad por lote y estación.",
            ]}
          />
          <ImpactBlock
            title="Operaciones & retail"
            lines={[
              "Afluencia y tiempos de permanencia.",
              "Disponibilidad en góndola y planogramas.",
              "Conteo de pallets y ocupación de docks.",
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

            <h3 className="mt-8 text-slate-900 font-semibold">Antes y después</h3>
            <p className="mt-2 text-slate-600">
              Vista comparativa para entender el salto operativo sin entrar en datos específicos.
            </p>
            <div className="mt-4">
              <BeforeAfterTable />
            </div>

            {/* Mini demo (visual) */}
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
               href="/#contact"
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
              a="Sí — puede desplegarse en gateways/IPC locales con sincronización periódica. Las alertas se almacenan y se reenvían cuando vuelve la conectividad."
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
