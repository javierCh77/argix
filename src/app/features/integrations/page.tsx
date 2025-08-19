/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import {
  Plug,
  PlugZap,
  ArrowRight,
  ShieldCheck,
  Webhook,
  Database,
  ServerCog,
  Network,
  KeyRound,
  Lock,
  Boxes,
  BarChart3,
  Gauge,
  CheckCircle2,
  FileCode2,
  Settings2,
  Workflow,
  MessageSquare,
  Globe,
  Camera,
  CreditCard,
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

function Sparkline({
  points = [5, 7, 6, 9, 12, 10, 14],
}: {
  points?: number[];
}) {
  const width = 120;
  const height = 36;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const norm = (v: number) => (height - 6) * ((v - min) / (max - min || 1)) + 3;
  const step = width / (points.length - 1 || 1);

  const d = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${i * step} ${height - norm(p)}`)
    .join(" ");

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden
    >
      <path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity={0.9}
      />
    </svg>
  );
}

/* =========================
   Metric Cards
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
        <div
          className={`text-xs font-semibold ${
            trend === "up" ? "text-emerald-600" : "text-rose-600"
          }`}
        >
          {trend === "up" ? "▲ Mejora" : "▼ Baja"}
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
   Simple Badge
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
   Grid de conectores (solo lo que manejás)
========================= */
function ConnectorGrid() {
  const items = [
    { label: "Slack", icon: MessageSquare },
    { label: "Mercado Pago", icon: CreditCard, hint: "LATAM" },
    { label: "PostgreSQL", icon: Database },
    { label: "Webhooks", icon: Webhook },
    { label: "REST / GraphQL", icon: FileCode2 },
    { label: "n8n", icon: Workflow },
    { label: "WhatsApp", icon: MessageSquare },
    { label: "Facebook", icon: Globe },
    { label: "Instagram", icon: Camera },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
      {items.map(({ label, icon: Icon }) => (
        <div
          key={label}
          className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-3 text-center text-xs font-medium text-slate-700 shadow-sm inline-flex items-center justify-center gap-2"
        >
          <Icon className="h-4 w-4 text-slate-600" />
          {label}
        </div>
      ))}
    </div>
  );
}

/* =========================
   FAQ item
========================= */
function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <summary className="cursor-pointer list-none font-semibold text-slate-900 flex items-center justify-between">
        <span>{q}</span>
        <span className="text-slate-400 group-open:rotate-180 transition">
          ⌄
        </span>
      </summary>
      <p className="mt-2 text-slate-600">{a}</p>
    </details>
  );
}

/* =========================
   Página Feature Integraciones (ADAPTADA)
========================= */
export default function IntegrationFeaturePage() {
  return (
    <section className="relative py-16 md:py-24">
      {/* Fondo sutil */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.12)_1px,transparent_1.6px)] [background-size:22px_22px]" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(56,189,248,0.10),transparent_55%)]" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-sm mb-6 text-slate-600">
          <Link href="/" className="hover:underline">
            Inicio
          </Link>
          <span className="mx-2">/</span>
          <Link href="/#features" className="hover:underline">
            Features
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800 font-medium">Integraciones</span>
        </nav>

        {/* Hero + badges */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 mb-10">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-600/30 bg-gradient-to-br from-cyan-500/10 to-sky-500/10 text-cyan-700 shadow-[inset_0_0_0_1px_rgba(56,189,248,.18)]">
            <Plug className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
              Integraciones
            </h1>
            <p className="text-slate-600 mt-2 max-w-2xl">
              Conecta tu stack en minutos:{" "}
              <strong>PostgreSQL</strong>, <strong>Webhooks</strong>,{" "}
              <strong>REST/GraphQL</strong>, <strong>n8n</strong> y canales de
              comunicación como <strong>WhatsApp</strong>,{" "}
              <strong>Slack</strong>, <strong>Facebook</strong> e{" "}
              <strong>Instagram</strong>. Sumá cobros con{" "}
              <strong>Mercado Pago</strong>.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge icon={PlugZap} label="Conectores preconstruidos" />
              <Badge icon={Webhook} label="Webhooks entrantes/salientes" />
              <Badge icon={Database} label="SQL (PostgreSQL)" />
              <Badge icon={ShieldCheck} label="OAuth2 · RBAC · Auditoría" />
            </div>
          </div>
          <div className="w-full md:w-auto">
            <ConnectorGrid />
          </div>
        </div>

        {/* Métricas (alineadas a lo que ofrecés) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <StatCard
            title="Conectores disponibles"
            value={9} // Slack, MP, Postgres, Webhooks, REST, GraphQL, n8n, WhatsApp, FB, IG (si contás REST/GraphQL como 1, ajustá a 10)
            trend="up"
            icon={Boxes}
            spark={[2, 3, 4, 6, 7, 8, 9]}
          />
          <StatCard
            title="Tiempo de setup"
            value={9}
            suffix=" min"
            trend="down"
            icon={Gauge}
            spark={[24, 20, 18, 15, 12, 10, 9]}
          />
          <StatCard
            title="Fiabilidad de sync"
            value={99}
            suffix=".9%"
            trend="up"
            icon={ShieldCheck}
            spark={[97, 98, 99, 99, 99, 99, 100]}
          />
          <StatCard
            title="Velocidad de backfill"
            value={2}
            suffix="x"
            trend="up"
            icon={BarChart3}
            spark={[1, 1, 1, 1.2, 1.4, 1.7, 2]}
          />
        </motion.div>

        {/* Contenido + sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 rounded-2xl bg-white border border-slate-200 p-6 shadow-[0_8px_22px_rgba(2,6,23,0.06)]"
          >
            <h2 className="text-xl font-semibold text-slate-900">
              Qué puedes integrar
            </h2>
            <ul className="mt-4 grid sm:grid-cols-2 gap-3 text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-cyan-700" />
                <span>
                  <strong>Mensajería & Comunicación</strong>: Slack, WhatsApp
                  (proveedores), Facebook/Instagram Messaging.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-cyan-700" />
                <span>
                  <strong>Workflows & Automatización</strong>: n8n, Webhooks,
                  REST/GraphQL.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-cyan-700" />
                <span>
                  <strong>Datos</strong>: PostgreSQL.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-cyan-700" />
                <span>
                  <strong>Pagos</strong>: Mercado Pago.
                </span>
              </li>
            </ul>

            <h3 className="mt-8 text-slate-900 font-semibold">Cómo funciona</h3>
            <div className="mt-3 grid sm:grid-cols-3 gap-3">
              <div className="rounded-xl border border-cyan-200 bg-cyan-50/60 p-4">
                <div className="text-xs text-cyan-700 font-semibold mb-1">
                  1 · Conecta
                </div>
                <div className="text-sm text-slate-800">
                  OAuth o claves. Permisos mínimos y rotación de tokens.
                </div>
              </div>
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
                <div className="text-xs text-emerald-700 font-semibold mb-1">
                  2 · Mapea
                </div>
                <div className="text-sm text-slate-800">
                  Mapeo visual o transformaciones JSON.
                </div>
              </div>
              <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4">
                <div className="text-xs text-amber-700 font-semibold mb-1">
                  3 · Orquesta
                </div>
                <div className="text-sm text-slate-800">
                  Dispara flujos con n8n, backfill de datos y webhooks
                  de retorno.
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl bg-white border border-slate-200 p-6 shadow-[0_8px_22px_rgba(2,6,23,0.06)]"
          >
            <h3 className="text-slate-900 font-semibold">
              Listo para producción
            </h3>
            <p className="text-slate-600 mt-2">
              Conectores seguros, webhooks robustos y observabilidad desde el
              inicio.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <Badge icon={Lock} label="Encriptación total" />
              <Badge icon={KeyRound} label="Rotación de claves" />
              <Badge icon={ServerCog} label="Retries & DLQs" />
              <Badge icon={Settings2} label="Rate limits" />
              <Badge icon={Network} label="VPC Peering" />
              <Badge icon={ShieldCheck} label="Auditoría & Roles" />
            </div>

            <Link
              href="#contacto"
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-cyan-600/30 bg-cyan-600/10 px-4 py-2 text-cyan-700 hover:bg-cyan-600/20 transition"
            >
              Hablar con Ventas <ArrowRight className="h-4 w-4" />
            </Link>

            {/* Testimonio adaptado */}
            <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50/50 p-4">
              <p className="text-sm text-slate-700 italic">
                “Integramos Slack, WhatsApp y PostgreSQL en un día—sin escribir
                código extra.”
              </p>
              <div className="mt-2 text-xs text-slate-500">
                VP Ingeniería · Empresa SaaS
              </div>
            </div>
          </motion.aside>
        </div>

        {/* FAQ & CTA final */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            <FAQItem
              q="¿Cómo manejan las credenciales?"
              a="Almacenamos secretos en un vault, rotamos tokens automáticamente y aplicamos scopes mínimos. Puedes traer tu propio KMS."
            />
            <FAQItem
              q="¿Puedo correrlo en mi VPC?"
              a="Sí—deploy gestionado en VPC o gateway autohospedado. Soporte para redes privadas y allowlists."
            />
            <FAQItem
              q="¿Qué pasa con monitoreo y retries?"
              a="Métricas y alertas integradas. Retries automáticos con backoff, deduplicación y dead-letter queues."
            />
          </div>

          <div className="rounded-2xl border border-cyan-600/30 bg-gradient-to-br from-cyan-600/10 to-sky-500/10 p-6">
            <div className="text-slate-900 font-semibold">PoC sin riesgo</div>
            <p className="text-slate-700 mt-1 text-sm">
              Piloto de 5 días: 4 conectores (Slack, WhatsApp, PostgreSQL,
              Mercado Pago), 2 webhooks, 1 backfill. KPIs: tiempo de setup,
              fiabilidad, throughput.
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
