export type FeatureDetail = {
  title: string;
  kicker: string;
  tagline: string;
  problem: string;
  solution: string;
  bullets: string[];
  metrics: { label: string; value: string }[];
  steps: string[];
  integrations: string[];
};

export const FEATURE_DATA: Record<"language"|"vision"|"automation"|"integrations", FeatureDetail> = {
  language: {
    title: "Procesamiento de Lenguaje",
    kicker: "Análisis, clasificación y generación de texto",
    tagline: "Convierte conversaciones y documentos en datos accionables: clasifica, resume y genera respuestas con contexto.",
    problem: "Volúmenes altos de tickets/chats sin estructura; respuestas lentas y poca trazabilidad.",
    solution: "Pipelines con LLM para intención/tono, resúmenes y respuestas automáticas alineadas a tu marca.",
    bullets: [
      "Clasificación multi-etiqueta (intención, prioridad, sentimiento)",
      "Extracción de entidades y resúmenes con contexto",
      "Respuesta sugerida / automática con guardrails",
    ],
    metrics: [
      { label: "↓ T. resolución", value: "−35%" },
      { label: "↑ CSAT", value: "+12%" },
      { label: "↓ Coste por ticket", value: "−28%" },
    ],
    steps: [
      "Ingesta de emails/chats/CRM.",
      "Normalización + embeddings.",
      "Clasificación, resumen y extracción.",
      "Respuesta sugerida, revisión y envío.",
    ],
    integrations: ["Zendesk/Freshdesk", "Slack/Teams", "PostgreSQL", "Webhooks"],
  },
  vision: {
    title: "Visión por Computadora",
    kicker: "Detección de personas/objetos y análisis en tiempo real",
    tagline: "Usá cámaras existentes para control de calidad, seguridad y automatización operativa.",
    problem: "Inspecciones manuales, incidentes de EPP y poca evidencia para auditorías.",
    solution: "Modelos de detección/seguimiento con reglas por zona/hora y alertas instantáneas.",
    bullets: [
      "Detección de EPP (casco/arnés/guantes)",
      "Control de calidad y conteo automático",
      "Alertas por webhook/ChatOps en segundos",
    ],
    metrics: [
      { label: "↓ Incidentes", value: "−41%" },
      { label: "Latencia alerta", value: "< 2 s" },
      { label: "Cobertura", value: "24/7" },
    ],
    steps: [
      "Conexión a RTSP o archivos.",
      "Inferencia por stream y eventos.",
      "Reglas por área (geocercas).",
      "Alertas y tablero de incidentes.",
    ],
    integrations: ["RTSP/ONVIF", "Kafka/Webhooks", "S3/GCS", "Grafana"],
  },
  automation: {
    title: "Automatización Inteligente",
    kicker: "Workflows con IA para procesos repetitivos",
    tagline: "Orquestá decisiones con LLMs y reglas para reducir errores y acelerar tus procesos.",
    problem: "Procesos manuales lentos (backoffice, validaciones, carga de datos) y alta tasa de error humano.",
    solution: "Bots y flujos con aprobaciones, políticas y trazabilidad de punta a punta.",
    bullets: [
      "Extracción/validación de datos (OCR + LLM)",
      "Rutas de aprobación y e-sign",
      "KPIs de SLA y auditoría",
    ],
    metrics: [
      { label: "↓ T. ciclo", value: "−45%" },
      { label: "↓ Errores", value: "−60%" },
      { label: "↑ Throughput", value: "+30%" },
    ],
    steps: [
      "Definir disparadores (form, webhook, cron).",
      "Enriquecimiento y validaciones.",
      "Aprobaciones y acciones (APIs).",
      "Registro y reportes.",
    ],
    integrations: ["n8n/Make", "Zapier", "DocuSign", "REST/GraphQL"],
  },
  integrations: {
    title: "Integraciones Empresariales",
    kicker: "IA conectada a tu stack de negocio",
    tagline: "Conectamos modelos y datos con tus APIs y sistemas para impacto real en operación.",
    problem: "Silos de información y fricción para exponer IA donde se usa día a día.",
    solution: "Capas de orquestación y conectores robustos con seguridad y observabilidad.",
    bullets: [
      "API gateway y malla de datos",
      "Funciones de inferencia escalables",
      "Observabilidad y trazas de prompts",
    ],
    metrics: [
      { label: "↑ Adopción", value: "+25%" },
      { label: "↑ Reuso de datos", value: "+32%" },
      { label: "↓ Time-to-value", value: "−40%" },
    ],
    steps: [
      "Mapeo de sistemas y permisos.",
      "Diseño de conectores/colas.",
      "Pruebas de carga y seguridad.",
      "Monitoreo y cost control.",
    ],
    integrations: ["PostgreSQL", "BigQuery/Redshift", "Kafka", "OpenTelemetry"],
  },
};
