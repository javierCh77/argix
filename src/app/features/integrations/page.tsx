/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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
  FileCode2,
  Settings2,
  Workflow,
  MessageSquare,
  Globe,
  Camera,
  CreditCard,
  CheckCircle2,
} from "lucide-react";

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
    { label: "WhatsApp", icon: MessageSquare },
    { label: "Facebook", icon: Globe },
    { label: "Instagram", icon: Camera },
    { label: "Mercado Pago", icon: CreditCard },
    { label: "PostgreSQL", icon: Database },
    { label: "REST / GraphQL", icon: FileCode2 },
    { label: "Webhooks", icon: Webhook },
    { label: "n8n", icon: Workflow },
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
              <th className="px-4 py-2 text-left">Sin IA/Orquestación</th>
              <th className="px-4 py-2 text-left">Con Integraciones Argix</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="px-4 py-2 text-slate-700">Tiempo de alta</td>
              <td className="px-4 py-2 text-slate-500">Semanas por entorno</td>
              <td className="px-4 py-2 font-medium text-slate-900">Minutos con conectores</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-slate-700">Mantenimiento</td>
              <td className="px-4 py-2 text-slate-500">Scripts frágiles</td>
              <td className="px-4 py-2 font-medium text-slate-900">Retries, DLQs y deduplicación</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-slate-700">Seguridad de credenciales</td>
              <td className="px-4 py-2 text-slate-500">Claves embebidas</td>
              <td className="px-4 py-2 font-medium text-slate-900">Vault + rotación + scopes mínimos</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-slate-700">Observabilidad</td>
              <td className="px-4 py-2 text-slate-500">Logs dispersos</td>
              <td className="px-4 py-2 font-medium text-slate-900">Métricas y alertas integradas</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-slate-700">Escalado</td>
              <td className="px-4 py-2 text-slate-500">Límites manuales</td>
              <td className="px-4 py-2 font-medium text-slate-900">Rate limits y backpressure</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-slate-500">
        Valores demostrativos para ilustrar el impacto; se ajustan a tu stack y volumen.
      </p>
    </div>
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
          <Link href="/" className="hover:underline">Inicio</Link>
          <span className="mx-2">/</span>
          <Link href="/#features" className="hover:underline">Características</Link>
        <span className="mx-2">/</span>
          <span className="text-slate-800 font-medium">Integraciones</span>
        </nav>

        {/* Hero + badges */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 mb-10">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-600/30 bg-gradient-to-br from-cyan-500/10 to-sky-500/10 text-cyan-700 shadow-[inset_0_0_0_1px_rgba(56,189,248,.18)]">
            <Plug className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">Integraciones</h1>
            <p className="text-slate-600 mt-2 max-w-2xl">
              Conectá tu stack en minutos: <strong>PostgreSQL</strong>, <strong>Webhooks</strong>,{" "}
              <strong>REST/GraphQL</strong>, <strong>n8n</strong> y canales como{" "}
              <strong>WhatsApp</strong>, <strong>Slack</strong>, <strong>Facebook</strong> e{" "}
              <strong>Instagram</strong>. Sumá cobros con <strong>Mercado Pago</strong>.
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

        {/* Impacto — claro y sin gráficos */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <ImpactBlock
            title="Velocidad de integración"
            lines={[
              "Alta por OAuth o claves + asistentes.",
              "Mapeos rápidos y templates reutilizables.",
              "Backfill inicial sin cortar servicios.",
            ]}
          />
          <ImpactBlock
            title="Confiabilidad & monitoreo"
            lines={[
              "Retries automáticos con backoff.",
              "Dead-letter queues y deduplicación.",
              "Alertas listas y métricas por conector.",
            ]}
          />
          <ImpactBlock
            title="Seguridad operativa"
            lines={[
              "Vault de secretos y rotación de tokens.",
              "Scopes mínimos y auditoría por rol.",
              "VPC peering y allowlists opcionales.",
            ]}
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
            <h2 className="text-xl font-semibold text-slate-900">Qué podés integrar</h2>
            <ul className="mt-4 grid sm:grid-cols-2 gap-3 text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-cyan-700" />
                <span><strong>Mensajería & Comunicación</strong>: Slack, WhatsApp (proveedores), Facebook/Instagram Messaging.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-cyan-700" />
                <span><strong>Workflows & Automatización</strong>: n8n, Webhooks, REST/GraphQL.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-cyan-700" />
                <span><strong>Datos</strong>: PostgreSQL.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-cyan-700" />
                <span><strong>Pagos</strong>: Mercado Pago.</span>
              </li>
            </ul>

            <h3 className="mt-8 text-slate-900 font-semibold">Cómo funciona</h3>
            <div className="mt-3 grid sm:grid-cols-3 gap-3">
              <div className="rounded-xl border border-cyan-200 bg-cyan-50/60 p-4">
                <div className="text-xs text-cyan-700 font-semibold mb-1">1 · Conectá</div>
                <div className="text-sm text-slate-800">OAuth o claves. Permisos mínimos y rotación de tokens.</div>
              </div>
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
                <div className="text-xs text-emerald-700 font-semibold mb-1">2 · Mapeá</div>
                <div className="text-sm text-slate-800">Mapeo visual o transformaciones JSON.</div>
              </div>
              <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4">
                <div className="text-xs text-amber-700 font-semibold mb-1">3 · Orquestá</div>
                <div className="text-sm text-slate-800">Dispará flujos con n8n, backfill y webhooks de retorno.</div>
              </div>
            </div>

            <h3 className="mt-8 text-slate-900 font-semibold">Antes y después</h3>
            <p className="mt-2 text-slate-600">Vista comparativa sin depender de métricas específicas.</p>
            <div className="mt-4">
              <BeforeAfterTable />
            </div>

            {/* Mini demo textual */}
            <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
              <div className="text-sm text-slate-500 mb-2">Webhook (ejemplo)</div>
              <pre className="text-xs text-slate-800 bg-white border border-slate-200 rounded-lg p-3 overflow-auto">
{`POST /webhooks/order_paid
{
  "event": "payment.succeeded",
  "provider": "mercado_pago",
  "data": {
    "order_id": "ORD-8921",
    "amount": 124.90,
    "currency": "ARS",
    "customer": { "email": "cliente@acme.com" }
  },
  "ts": "2025-08-20T14:22:31Z"
}

// n8n: enruta a Slack, actualiza Postgres y dispara factura`}
              </pre>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl bg-white border border-slate-200 p-6 shadow-[0_8px_22px_rgba(2,6,23,0.06)]"
          >
            <h3 className="text-slate-900 font-semibold">Listo para producción</h3>
            <p className="text-slate-600 mt-2">Conectores seguros, webhooks robustos y observabilidad desde el inicio.</p>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <Badge icon={Lock} label="Encriptación total" />
              <Badge icon={KeyRound} label="Rotación de claves" />
              <Badge icon={ServerCog} label="Retries & DLQs" />
              <Badge icon={Settings2} label="Rate limits" />
              <Badge icon={Network} label="VPC Peering" />
              <Badge icon={ShieldCheck} label="Auditoría & Roles" />
            </div>

            <Link
               href="/#contact"
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-cyan-600/30 bg-cyan-600/10 px-4 py-2 text-cyan-700 hover:bg-cyan-600/20 transition"
            >
              Hablar con Ventas <ArrowRight className="h-4 w-4" />
            </Link>

            {/* Testimonio adaptado */}
            <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50/50 p-4">
              <p className="text-sm text-slate-700 italic">
                “Integramos Slack, WhatsApp y PostgreSQL en un día—sin escribir código extra.”
              </p>
              <div className="mt-2 text-xs text-slate-500">VP Ingeniería · Empresa SaaS</div>
            </div>
          </motion.aside>
        </div>

        {/* FAQ & CTA final */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            <FAQItem
              q="¿Cómo manejan las credenciales?"
              a="Guardamos secretos en un vault, rotamos tokens automáticamente y aplicamos scopes mínimos. Podés traer tu propio KMS."
            />
            <FAQItem
              q="¿Puedo correrlo en mi VPC?"
              a="Sí—deploy gestionado en VPC o gateway autohospedado. Soporta redes privadas y allowlists."
            />
            <FAQItem
              q="¿Qué pasa con monitoreo y retries?"
              a="Métricas y alertas integradas. Retries con backoff, deduplicación y dead-letter queues."
            />
          </div>

          <div className="rounded-2xl border border-cyan-600/30 bg-gradient-to-br from-cyan-600/10 to-sky-500/10 p-6">
            <div className="text-slate-900 font-semibold">PoC sin riesgo</div>
            <p className="text-slate-700 mt-1 text-sm">
              Piloto de 5 días: 4 conectores (Slack, WhatsApp, PostgreSQL, Mercado Pago), 2 webhooks, 1 backfill.
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
