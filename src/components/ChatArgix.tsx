/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles, ShieldCheck, PenBox } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

// ====== Ajustes ======
const BASE_DELAY_MS = 25;
const PUNCTUATION_EXTRA_MS = 180;
const PUNCTUATION_REGEX = /[.,;:!?。\n]/;

// Límite y umbral de aviso
const MAX_CHARS = 300;
const WARN_THRESHOLD = 150;

export default function ChatArgix() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "¡Hola! Soy el agente de Argix. Preguntame sobre nuestros servicios de IA (RRHH, logística, salud, seguridad), integraciones y cómo podemos ayudarte.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const activeAbortRef = useRef<AbortController | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      activeAbortRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    const el = logRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const withinLimit = input.length <= MAX_CHARS;
  const canSend = input.trim().length > 0 && !loading && withinLimit;

  async function onSend() {
    if (!canSend) return;

    // Validación por si acaso (seguridad extra)
    if (input.length > MAX_CHARS) {
      // Podés cambiar alert por un toast si tenés uno
      alert(`El mensaje no puede superar los ${MAX_CHARS} caracteres.`);
      return;
    }

    // Cancelá cualquier stream activo
    activeAbortRef.current?.abort();
    const controller = new AbortController();
    activeAbortRef.current = controller;

    const userMsg: Msg = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // Burbuja vacía del asistente para ir completando en vivo
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      const res = await fetch("/api/argix-chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          messages: [
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            { role: "user", content: userMsg.content },
          ],
        }),
      });

      if (!res.ok || !res.body) throw new Error("No stream");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let buffer = "";
      let acc = ""; // acumulado visible

      const typeChar = async (ch: string) => {
        if (!mountedRef.current) return;

        acc += ch;
        setMessages((prev) => {
          const next = [...prev];
          const lastIndex = next.length - 1;
          if (lastIndex >= 0 && next[lastIndex].role === "assistant") {
            next[lastIndex] = { role: "assistant", content: acc };
          }
          return next;
        });

        const extra = PUNCTUATION_REGEX.test(ch) ? PUNCTUATION_EXTRA_MS : 0;
        await new Promise((r) => setTimeout(r, BASE_DELAY_MS + extra));
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        for (const ch of buffer) {
          if (controller.signal.aborted) break;
          await typeChar(ch);
        }
        buffer = "";
      }
    } catch (err) {
      if ((err as any)?.name === "AbortError") {
        // abortado al enviar otra consulta
      } else {
        setMessages((prev) => {
          const next = [...prev];
          const lastIndex = next.length - 1;
          if (
            lastIndex >= 0 &&
            next[lastIndex].role === "assistant" &&
            next[lastIndex].content === ""
          ) {
            next[lastIndex] = {
              role: "assistant",
              content: "Error de conexión. Probá nuevamente en unos segundos.",
            };
          } else {
            next.push({
              role: "assistant",
              content: "Error de conexión. Probá nuevamente en unos segundos.",
            });
          }
          return next;
        });
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
        inputRef.current?.focus();
      }
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      onSend();
    } else if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  }

  const remaining = Math.max(0, MAX_CHARS - input.length);
  const nearLimit = input.length >= WARN_THRESHOLD && input.length <= MAX_CHARS;
  const overLimit = input.length > MAX_CHARS;

  return (
    <section aria-label="Chat Argix" className="relative mx-auto w-full max-w-4xl">
      {/* Halo / fondo suave */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -inset-10 blur-3xl opacity-50 bg-gradient-to-tr from-cyan-300/20 via-purple-300/20 to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="rounded-2xl border border-slate-200/60 bg-white/80 backdrop-blur shadow-[0_12px_40px_rgba(6,182,212,0.12)]"
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200/60">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-400 grid place-items-center text-white shadow-md">
            <PenBox className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-slate-900 font-semibold leading-tight">Probá el agente de Argix</h3>
            <p className="text-sm text-slate-600">Consultas sobre nuestros servicios de IA e integraciones.</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-600">
            <ShieldCheck className="h-4 w-4 text-cyan-500" />
            <span>Respuestas acotadas al ámbito de Argix</span>
          </div>
        </div>

        {/* Chat log */}
        <div
          ref={logRef}
          aria-live="polite"
          className="h-[420px] overflow-y-auto px-5 py-4 space-y-4 overscroll-contain [scrollbar-gutter:stable]"
        >
          {messages.map((m, idx) => (
            <Bubble key={idx} role={m.role} content={m.content} />
          ))}
          {loading && <Typing />}
        </div>

        {/* Input */}
        <div className="px-5 pb-5">
          <div
            className={[
              "flex items-center gap-2 rounded-xl border bg-white/70 backdrop-blur px-3 py-2 focus-within:ring-2",
              overLimit
                ? "border-red-300 focus-within:ring-red-300/60"
                : nearLimit
                ? "border-amber-300 focus-within:ring-amber-300/60"
                : "border-slate-200/70 focus-within:ring-cyan-300/50",
            ].join(" ")}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={`Escribí tu consulta (máx. ${MAX_CHARS} caracteres)…`}
              className="w-full bg-transparent outline-none text-slate-900 placeholder:text-slate-400"
              aria-label="Escribir mensaje"
              maxLength={MAX_CHARS}
            />
            <button
              onClick={onSend}
              disabled={!canSend}
              className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium text-white
                         bg-gradient-to-br from-cyan-500 to-purple-500 disabled:opacity-50 shadow hover:opacity-95 transition"
              aria-label="Enviar"
            >
              <Send className="h-4 w-4" />
              Enviar
            </button>
          </div>

          {/* Barra de estado / contador */}
          <div className="mt-2 text-[11px] flex items-center justify-between">
            <div className="flex items-center gap-1 text-slate-500">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Streaming con tipeo humano. Tu API Key permanece segura en el servidor.</span>
            </div>
            <div
              className={[
                "tabular-nums",
                overLimit ? "text-red-600" : nearLimit ? "text-amber-600" : "text-slate-500",
              ].join(" ")}
              aria-live="polite"
            >
              {input.length}/{MAX_CHARS} {overLimit ? "• Límite superado" : nearLimit ? "• Cerca del límite" : ""}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Bubble({ role, content }: { role: "user" | "assistant"; content: string }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={[
          "max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-relaxed whitespace-pre-wrap",
          isUser
            ? "bg-gradient-to-br from-cyan-500 to-purple-500 text-white shadow"
            : "bg-white/80 border border-slate-200/70 text-slate-800 shadow-sm",
        ].join(" ")}
      >
        {content}
      </div>
    </div>
  );
}

function Typing() {
  return (
    <div className="flex items-center gap-2 text-slate-500">
      <div className="h-2 w-2 rounded-full bg-slate-300 animate-bounce" />
      <div className="h-2 w-2 rounded-full bg-slate-300 animate-bounce [animation-delay:120ms]" />
      <div className="h-2 w-2 rounded-full bg-slate-300 animate-bounce [animation-delay:240ms]" />
      <span className="ml-2 text-xs">Redactando…</span>
    </div>
  );
}
