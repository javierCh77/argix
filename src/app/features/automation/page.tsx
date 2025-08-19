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
  Cog,
  ArrowRight,
  TrendingUp,
  MessageSquare,
  CheckCircle2,
  ShieldCheck,
  BarChart3,
  PlugZap,
  Workflow,
  Cpu,
  Users,
  FileText,
  Clock4,
  Layers,
  NotebookPen,
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
   Tarjetas métricas
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
  const items = ["SOPORTE", "FINANZAS", "OPERACIONES", "RRHH", "VENTAS", "IT"];
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
   Demo de flujo
========================= */
function FlowDemo() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4">
      <div className="text-sm text-slate-500 mb-3">Flujo de automatización (ejemplo)</div>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="rounded-xl border border-cyan-200 bg-cyan-50/60 p-3">
          <div className="text-xs text-cyan-700 font-semibold mb-1">Disparador</div>
          <div className="text-sm text-slate-800">Nuevo correo “reembolso”</div>
        </div>
        <div className="rounded-xl border border-fuchsia-200 bg-fuchsia-50/60 p-3">
          <div className="text-xs text-fuchsia-700 font-semibold mb-1">Clasificar</div>
          <div className="text-sm text-slate-800">Intención + política</div>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3">
          <div className="text-xs text-emerald-700 font-semibold mb-1">Acción</div>
          <div className="text-sm text-slate-800">Crear ticket + responder</div>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-3">
          <div className="text-xs text-amber-700 font-semibold mb-1">Notificar</div>
          <div className="text-sm text-slate-800">Post en Slack · SLA</div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-6 top-16 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
    </div>
  );
}

/* =========================
   FAQ
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
   Feature: Automatización Inteligente
========================= */
export default function IntelligenceAutomationFeaturePage() {
  return (
    <section className="relative py-16 md:py-24">
      {/* Fondo sutil */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.12)_1px,transparent_1.6px)] [background-size:22px_22px]" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(56,189,248,0.10),transparent_55%)]" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Migas de pan */}
        <nav className="text-sm mb-6 text-slate-600">
          <Link href="/" className="hover:underline">Inicio</Link>
          <span className="mx-2">/</span>
          <Link href="/#features" className="hover:underline">Características</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800 font-medium">Automatización Inteligente</span>
        </nav>

        {/* Hero */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 mb-10">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-600/30 bg-gradient-to-br from-cyan-500/10 to-sky-500/10 text-cyan-700 shadow-[inset_0_0_0_1px_rgba(56,189,248,.18)]">
            <Cog className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">Automatización Inteligente</h1>
            <p className="text-slate-600 mt-2 max-w-2xl">
              Orquesta agentes, reglas y flujos para automatizar decisiones y acciones en toda tu operación—de forma segura, auditable y rápida.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge icon={Workflow} label="Motor de orquestación" />
              <Badge icon={Users} label="Humano en el loop" />
              <Badge icon={ShieldCheck} label="Auditoría y permisos" />
              <Badge icon={PlugZap} label="API · Webhooks · BD" />
            </div>
          </div>
          <div className="w-full md:w-auto">
            <LogoCloud />
          </div>
        </div>

        {/* Métricas */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <StatCard title="Tareas automatizadas" value={72} suffix="%" trend="up" icon={Layers} spark={[18,24,32,45,55,65,72]} />
          <StatCard title="Reducción de MTTR" value={44} suffix="%" trend="up" icon={Clock4} spark={[8,12,18,26,34,39,44]} />
          <StatCard title="Tasa de error" value={37} suffix="%" trend="down" icon={BarChart3} spark={[22,20,18,16,13,11,9]} />
          <StatCard title="Horas ahorradas" value={280} suffix="/mes" trend="up" icon={TrendingUp} spark={[40,80,120,160,200,240,280]} />
        </motion.div>

        {/* Contenido + Sidebar */}
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
                <span><strong>Operaciones de clientes</strong>: gestión de reembolsos, SLA, tickets, seguimientos proactivos.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-cyan-700" />
                <span><strong>Operaciones de ingresos</strong>: asignación de leads, alertas de uso, borradores de cotización.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-cyan-700" />
                <span><strong>Back office</strong>: codificación de facturas, validación de compras, onboarding de proveedores.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-cyan-700" />
                <span><strong>IT / Seguridad</strong>: accesos, runbooks de incidentes, aprobaciones de cambios, logs.</span>
              </li>
            </ul>

            <h3 className="mt-8 text-slate-900 font-semibold">Beneficios</h3>
            <ul className="mt-3 grid sm:grid-cols-2 gap-2 text-slate-700">
              <li>• Menos traspasos, ciclos más rápidos.</li>
              <li>• Decisiones estandarizadas y explicables.</li>
              <li>• Pasos de aprobación humana donde sea necesario.</li>
              <li>• Flujos versionados con rollback.</li>
            </ul>

            {/* Mini demos */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <FlowDemo />
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                <div className="text-sm text-slate-500 mb-2">Workflow (ejemplo YAML)</div>
                <pre className="text-xs text-slate-800 bg-white border border-slate-200 rounded-lg p-3 overflow-auto">
{`name: refund_flow
trigger:
  type: email
  match: subject ~ "(refund|chargeback)"
steps:
  - id: classify
    uses: llm.intent
    out: intent, confidence
  - if: intent == "refund" && confidence > 0.75
    then:
      - uses: kb.retrieve
        with: policy: "refund_policy_v3"
        out: policy
      - uses: llm.generate
        with:
          template: "reply_refund"
          vars: { policy, email_body }
        out: reply
      - uses: jira.create_issue
        with: project: "SUP", summary: "Refund request", fields: { priority: "High" }
        out: ticket
      - uses: slack.post
        with: channel: "#ops", text: "Refund flow triggered: {{ticket.key}}"
      - uses: mail.send
        with: to: sender, subject: "Re: Su reembolso", body: reply
  - else:
      - uses: route.manual
        with: queue: "Soporte/Otros"`}
                </pre>
                <div className="mt-3 text-xs text-slate-600">
                  Controles: umbrales de confianza, límites de tasa, reintentos y pasos de aprobación.
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
            <h3 className="text-slate-900 font-semibold">¿Listo para automatizar?</h3>
            <p className="text-slate-600 mt-2">
              Despliega automatizaciones listas para producción con revisión humana, logs de auditoría y permisos granulares.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge icon={MessageSquare} label="Slack / WhatsApp / Email" />
              <Badge icon={FileText} label="Zendesk · Jira · Sheets" />
              <Badge icon={Cpu} label="Funciones / Webhooks" />
              <Badge icon={NotebookPen} label="Base de conocimiento" />
            </div>

            <Link
              href="#contacto"
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-cyan-600/30 bg-cyan-600/10 px-4 py-2 text-cyan-700 hover:bg-cyan-600/20 transition"
            >
              Hablar con ventas <ArrowRight className="h-4 w-4" />
            </Link>

            {/* Testimonio */}
            <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50/50 p-4">
              <p className="text-sm text-slate-700 italic">
                “Nuestros playbooks pasaron de Confluence a automatizaciones vivas—el tiempo de ciclo bajó 46%.”
              </p>
              <div className="mt-2 text-xs text-slate-500">Head of Ops · SaaS Scaleup</div>
            </div>
          </motion.aside>
        </div>

        {/* FAQ */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            <FAQItem
              q="¿Cómo funcionan las aprobaciones?"
              a="Puedes insertar revisión humana en cualquier paso. Los aprobadores ven contexto, comparan cambios y todo queda registrado."
            />
            <FAQItem
              q="¿Puedo versionar flujos?"
              a="Sí—cada cambio queda versionado. Rollback instantáneo, diffs y experimentación con ramas."
            />
            <FAQItem
              q="¿Cómo se manejan los fallos?"
              a="Reintentos con backoff exponencial, colas de errores y alertas. Llaves idempotentes evitan duplicados."
            />
          </div>

          <div className="rounded-2xl border border-cyan-600/30 bg-gradient-to-br from-cyan-600/10 to-sky-500/10 p-6">
            <div className="text-slate-900 font-semibold">PoC sin riesgo</div>
            <p className="text-slate-700 mt-1 text-sm">
              Piloto de 10 días: 3 flujos, 5 integraciones, métricas claras (MTTR, tasa de éxito, horas ahorradas).
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
