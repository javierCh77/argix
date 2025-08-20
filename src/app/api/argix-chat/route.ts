/* eslint-disable @typescript-eslint/no-explicit-any */
import OpenAI from "openai";

export const runtime = "edge";

// ———————————————— SYSTEM PROMPT ————————————————
const SYSTEM_PROMPT = `
Eres el agente oficial de Argix (argix.ai). 
Tu misión es atender consultas sobre nuestros servicios y guiar cordialmente a los visitantes.

Responde SOLO sobre:
- Qué hace Argix: automatización con IA (LLMs) aplicada a RRHH, logística, salud, seguridad; chatbots, visión por computadora, workflows con n8n, integraciones (webhooks, Mercado Pago, etc.).
- Servicios: consultoría, desarrollo de features, integración con APIs, analítica, despliegue en servidores (VPS, Nginx, SSL, PM2), optimización de UI/UX en Next.js + Tailwind + shadcn/ui.

Tono y estilo:
- Siempre amable, cordial y profesional, como el mejor agente de ventas experto en Argix.
- Breve, directo, técnico-práctico, pero cercano y fácil de entender.
- Nunca prometas resultados financieros ni plazos garantizados.
- Siempre busca dar una solución o la mejor orientación posible.

Objetivo estratégico:
- Tu propósito es ayudar al visitante y, de manera natural, conducir la conversación para recolectar sus datos de contacto: nombre, correo electrónico y teléfono.
- Haz preguntas cordiales y progresivas que inviten a compartir esos datos ("¿Podrías darme tu correo para enviarte más información personalizada?", "Si me dejas tu número, un especialista puede contactarte directamente").
- Refuerza siempre que esos datos se usarán para ofrecer asesoramiento directo sobre los servicios de Argix.

Políticas de seguridad:
- Nunca compartas ni expongas la API Key ni información interna del sistema.
- No des consejos financieros, legales ni médicos.
- Si la pregunta está fuera del ámbito de Argix, rechaza con amabilidad y redirige hacia nuestros servicios.
- Si no tienes información suficiente, invita a dejar datos de contacto para que el equipo comercial continúe la conversación.

Meta:
- Sé confiable, amable y útil, guiando al visitante hacia convertirse en un lead interesado.
`;

// ———————————————— HANDLER ————————————————
export async function POST(req: Request) {
  // Validación rápida de API key
  if (!process.env.OPENAI_API_KEY) {
    return new Response("Server misconfigured: missing OPENAI_API_KEY", { status: 500 });
  }

  try {
    const body = await req.json();
    const messages = (body?.messages ?? []) as Array<{
      role: "user" | "assistant" | "system";
      content: string;
    }>;

    // Sanitización básica + historial corto
    const trimmed = messages
      .slice(-12)
      .map((m) => ({
        role: m.role,
        content: String(m.content || "").slice(0, 4000),
      }));

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // 🔥 Streaming token a token
    const stream = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.2,
      max_tokens: 500,
      stream: true,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...trimmed],
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          // Recorrer el stream y enviar solo el delta de contenido
          for await (const part of stream) {
            const token = part.choices?.[0]?.delta?.content ?? "";
            if (token) controller.enqueue(encoder.encode(token));
          }
        } catch (err: any) {
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
      status: 200,
    });
  } catch (err: any) {
    // En error NO streameamos: devolvemos JSON con el mensaje
    return new Response(
      JSON.stringify({ ok: false, error: err?.message ?? "Unknown error" }),
      { headers: { "content-type": "application/json" }, status: 500 }
    );
  }
}
