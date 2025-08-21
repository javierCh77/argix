/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Cog,
  ArrowRight,
  MessageSquare,
  CheckCircle2,
  ShieldCheck,
  PlugZap,
  Workflow,
  Cpu,
  Users,
  FileText,
  NotebookPen,
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
   Demo de flujo (visual, sin gráficos de datos)
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
   Bloques de impacto (texto claro)
========================= */
function ImpactBlock({ title, lines }: { title: string; lines: string[] }) {
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
   Tabla simple Antes / Después
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
              <td className="px-4 py-2 text-slate-700">MTTR</td>
              <td className="px-4 py-2 text-slate-500">Horas o días</td>
              <td className="px-4 py-2 font-medium text-slate-900">Minutos con playbooks</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-slate-700">Errores manuales</td>
              <td className="px-4 py-2 text-slate-500">Frecuentes</td>
              <td className="px-4 py-2 font-medium text-slate-900">Menos por validaciones/QA</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-slate-700">Repetición de tareas</td>
              <td className="px-4 py-2 text-slate-500">Alta</td>
              <td className="px-4 py-2 font-medium text-slate-900">Baja con reglas y agentes</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-slate-700">Aprobaciones</td>
              <td className="px-4 py-2 text-slate-500">Lentas y difusas</td>
              <td className="px-4 py-2 font-medium text-slate-900">Human-in-the-loop trazable</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-slate-700">Escalabilidad</td>
              <td className="px-4 py-2 text-slate-500">Depende del equipo</td>
              <td className="px-4 py-2 font-medium text-slate-900">Orquestación multi-flujo</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-slate-500">
        Valores demostrativos; se ajustan según tus procesos y SLAs.
      </p>
    </div>
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
              Orquestá agentes, reglas y flujos para automatizar decisiones y acciones en toda tu operación—de forma segura, auditable y rápida.
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

        {/* Impacto — claro y sin gráficos */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <ImpactBlock
            title="Eficiencia Operativa"
            lines={[
              "Menos traspasos, ciclos más rápidos.",
              "SLA automáticos con escalado por prioridad.",
              "Automatización multi-equipo y multi-herramienta.",
            ]}
          />
          <ImpactBlock
            title="Calidad & Control"
            lines={[
              "Decisiones estandarizadas y explicables.",
              "Versionado de flujos y rollback inmediato.",
              "Logs de auditoría y permisos granulares.",
            ]}
          />
          <ImpactBlock
            title="Colaboración Híbrida"
            lines={[
              "Aprobaciones humanas con contexto y diffs.",
              "Notificaciones en Slack/Email con acciones.",
              "Asignaciones y colas inteligentes.",
            ]}
          />
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
                <span><strong>Operaciones de clientes</strong>: reembolsos, SLA, tickets, seguimientos proactivos.</span>
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

            <h3 className="mt-8 text-slate-900 font-semibold">Antes y después</h3>
            <p className="mt-2 text-slate-600">
              Vista comparativa para entender el salto operativo sin entrar en datos específicos.
            </p>
            <div className="mt-4">
              <BeforeAfterTable />
            </div>

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
              Desplegá automatizaciones listas para producción con revisión humana, logs de auditoría y permisos granulares.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge icon={MessageSquare} label="Slack / WhatsApp / Email" />
              <Badge icon={FileText} label="Zendesk · Jira · Sheets" />
              <Badge icon={Cpu} label="Funciones / Webhooks" />
              <Badge icon={NotebookPen} label="Base de conocimiento" />
            </div>

            <Link
               href="/#contact"
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
              a="Podés insertar revisión humana en cualquier paso. Los aprobadores ven contexto, comparan cambios y todo queda registrado."
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
