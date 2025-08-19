/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, User, MessageSquare, Loader2, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

type FormState = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '', company: '' });
  const [state, setState] = useState<FormState>('idle');
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [hp, setHp] = useState(''); // honeypot
  const [progress, setProgress] = useState(0);

  const maxChars = 600;
  const used = form.message.length;
  const pct = Math.min(100, Math.round((used / maxChars) * 100));

  const emailRe = useMemo(() => /\S+@\S+\.\S+/, []);

  const validate = () => {
    const e = {
      name: form.name.trim() ? '' : 'Ingresá tu nombre.',
      email: emailRe.test(form.email) ? '' : 'Correo electrónico inválido.',
      message: form.message.trim() ? '' : 'Escribí tu mensaje.',
    };
    setErrors(e);
    return !Object.values(e).some(Boolean);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '' as any }));
  };

  useEffect(() => {
    if (state !== 'sending') return;
    setProgress(0);
    const start = Date.now();
    const id = setInterval(() => {
      const elapsed = Date.now() - start;
      // curva suave hasta ~90%, completa al finalizar
      const p = Math.min(90, Math.round(100 * (1 - Math.exp(-elapsed / 700))));
      setProgress(p);
    }, 120);
    return () => clearInterval(id);
  }, [state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hp) return; // anti-bot
    if (!validate()) {
      setState('error');
      setTimeout(() => setState('idle'), 1500);
      return;
    }

    setState('sending');

    try {
      // TODO: reemplazar por tu endpoint real
      // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(form) })
      await new Promise((res) => setTimeout(res, 1200));
      setProgress(100);
      setState('sent');
      setForm({ name: '', email: '', message: '', company: '' });
      setTimeout(() => setState('idle'), 4000);
    } catch {
      setState('error');
      setTimeout(() => setState('idle'), 2000);
    }
  };

  return (
    // Sin fondos internos: el BackgroundFX global queda continuo
    <section id="contact" className="relative py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-600/20 bg-purple-600/10 px-3 py-1 text-xs tracking-widest text-purple-700 uppercase">
              <Sparkles className="h-3.5 w-3.5" /> Contacto
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-3 text-slate-900">Hablemos</h2>
            <p className="text-slate-600 mt-2">
              ¿Cómo puede <span className="text-purple-700 font-semibold">Argix</span> potenciar tu negocio? Reservá una demo.
            </p>
          </div>

          {/* Glass card (tema claro) con sombra reducida */}
          <div className="relative rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-md shadow-[0_2px_6px_rgba(2,6,23,0.04)] overflow-hidden">
            {/* brillo controlado mientras envía */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              initial={false}
              animate={{ x: state === 'sending' ? '110%' : '-110%' }}
              transition={{ duration: 1.2, ease: 'easeOut', repeat: state === 'sending' ? Infinity : 0 }}
              style={{
                background:
                  'linear-gradient(12deg, rgba(196,138,255,0) 35%, rgba(196,138,255,.12) 50%, rgba(196,138,255,0) 65%)',
                filter: 'blur(8px)',
              }}
            />

            {/* barra de progreso superior */}
            <div className="absolute left-0 top-0 h-1 w-full bg-slate-100">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-500"
                style={{ width: `${progress}%` }}
                animate={{ width: `${progress}%` }}
                transition={{ type: 'tween', ease: 'easeOut', duration: 0.3 }}
              />
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
              {/* honeypot (oculto) */}
              <input
                type="text"
                name="company"
                autoComplete="off"
                tabIndex={-1}
                value={hp}
                onChange={(e) => setHp(e.target.value)}
                className="hidden"
              />

              {/* Nombre */}
              <Field
                label="Nombre"
                name="name"
                type="text"
                placeholder="Tu nombre"
                value={form.name}
                error={errors.name}
                onChange={handleChange}
                icon={<User className="h-4.5 w-4.5" />}
              />

              {/* Email */}
              <Field
                label="Email"
                name="email"
                type="email"
                placeholder="vos@empresa.com"
                value={form.email}
                error={errors.email}
                onChange={handleChange}
                icon={<Mail className="h-4.5 w-4.5" />}
              />

              {/* Mensaje */}
              <div>
                <Label htmlFor="message">Mensaje</Label>
                <div
                  className={[
                    'group relative rounded-xl border bg-white text-slate-900',
                    errors.message ? 'border-red-400' : 'border-slate-300',
                    'focus-within:border-purple-400 focus-within:shadow-[0_0_0_3px_rgba(168,85,247,.16)] transition',
                  ].join(' ')}
                >
                  <div className="pointer-events-none absolute left-3 top-3 text-purple-700/70">
                    <MessageSquare className="h-4.5 w-4.5" />
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    maxLength={maxChars}
                    placeholder="Contanos brevemente tu caso de uso…"
                    value={form.message}
                    onChange={handleChange}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className="w-full resize-y rounded-xl bg-transparent pl-10 pr-3 py-3.5 placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
                <div className="mt-1.5 flex items-center justify-between text-xs">
                  <span id="message-error" className="text-red-500">
                    {errors.message}
                  </span>
                  <span className={`tabular-nums ${pct > 90 ? 'text-amber-600' : 'text-slate-500'}`}>
                    {used}/{maxChars}
                  </span>
                </div>
              </div>

              {/* Nota de privacidad */}
              <p className="flex items-center gap-2 text-xs text-slate-600">
                <ShieldCheck className="h-4 w-4 text-purple-700" />
                Cuidamos tus datos. No compartimos tu información con terceros.
              </p>

              {/* Botón enviar (sombra reducida en hover) */}
              <motion.button
                type="submit"
                disabled={state === 'sending'}
                whileTap={{ scale: state === 'sending' ? 1 : 0.98 }}
                className={[
                  'w-full inline-flex items-center justify-center gap-2 rounded-xl cursor-pointer',
                  'bg-gradient-to-r from-purple-600 to-fuchsia-600',
                  'px-4 py-3.5 font-semibold text-white',
                  'enabled:hover:shadow-[0_6px_18px_rgba(196,138,255,.20)] enabled:hover:-translate-y-[1px]',
                  'transition disabled:opacity-60',
                ].join(' ')}
              >
                <AnimatePresence initial={false} mode="wait">
                  {state === 'sending' ? (
                    <motion.span
                      key="sending"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      className="inline-flex items-center gap-2"
                    >
                      <Loader2 className="h-4.5 w-4.5 animate-spin" />
                      Enviando…
                    </motion.span>
                  ) : state === 'sent' ? (
                    <motion.span
                      key="sent"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      className="inline-flex items-center gap-2"
                    >
                      <CheckCircle2 className="h-5 w-5" />
                      ¡Mensaje enviado!
                    </motion.span>
                  ) : state === 'error' ? (
                    <motion.span
                      key="error"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      className="inline-flex items-center gap-2"
                    >
                      Ocurrió un error
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      className="inline-flex items-center gap-2"
                    >
                      Enviar mensaje
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>

            {/* Overlay de éxito */}
            <AnimatePresence>
              {state === 'sent' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px]"
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.96, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                    className="rounded-2xl border border-slate-200 bg-white/90 px-6 py-4 text-center shadow-[0_4px_14px_rgba(2,6,23,0.08)]"
                  >
                    <div className="mx-auto mb-2 h-10 w-10 text-purple-700">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <p className="text-slate-900 font-semibold">¡Mensaje enviado con éxito!</p>
                    <p className="text-slate-600 text-sm">Te contactaremos a la brevedad.</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Subcomponentes ---------- */

function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-slate-700">
      {children}
    </label>
  );
}

function Field({
  label,
  name,
  type,
  placeholder,
  value,
  error,
  onChange,
  icon,
}: {
  label: string;
  name: 'name' | 'email';
  type: 'text' | 'email';
  placeholder: string;
  value: string;
  error: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ReactNode;
}) {
  const id = name;
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <div
        className={[
          'group relative rounded-xl border bg-white text-slate-900',
          error ? 'border-red-400' : 'border-slate-300',
          'focus-within:border-purple-400 focus-within:shadow-[0_0_0_3px_rgba(168,85,247,.16)] transition',
        ].join(' ')}
      >
        <div className="pointer-events-none absolute left-3 top-3 text-purple-700/70">{icon}</div>
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className="w-full rounded-xl bg-transparent pl-10 pr-3 py-3.5 placeholder:text-slate-400 focus:outline-none"
          autoComplete={name === 'email' ? 'email' : 'name'}
        />
      </div>
      <div id={`${id}-error`} className="mt-1.5 text-xs text-red-500">
        {error}
      </div>
    </div>
  );
}
