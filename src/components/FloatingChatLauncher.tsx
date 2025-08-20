"use client";

import { useState, useEffect, useMemo } from "react";
import { MessageSquare, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

// Carga diferida para no penalizar LCP
const ChatArgix = dynamic(() => import("./ChatArgix"), { ssr: false });

export default function FloatingChatLauncher() {
  const [open, setOpen] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  // Evita scroll del body cuando el modal está abierto (mobile friendly)
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Observa el footer para mover el botón cuando esté a la vista
  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;

    const obs = new IntersectionObserver(
      (entries) => setFooterVisible(entries[0]?.isIntersecting ?? false),
      { root: null, threshold: 0 } // con que toque un poco el viewport alcanza
    );
    obs.observe(footer);
    return () => obs.disconnect();
  }, []);

  // Offset dinámico: se eleva cuando el footer está visible
  const bottomOffsetPx = useMemo(() => (footerVisible ? 120 : 20), [footerVisible]);
  // Respeta safe-area (iOS) + offset que calculamos
  const bottomStyle = useMemo(
    () => ({ bottom: `calc(env(safe-area-inset-bottom, 0px) + ${bottomOffsetPx}px)` }),
    [bottomOffsetPx]
  );

  return (
    <>
      {/* Botón flotante (con safe-area + ajuste por footer) */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Abrir chat de Argix"
        style={bottomStyle}
        className="fixed right-5 z-40 rounded-full px-4 py-3 shadow-lg
                   bg-gradient-to-br from-cyan-500 to-purple-500 text-white
                   hover:opacity-95 transition focus:outline-none focus:ring-2 focus:ring-cyan-300"
      >
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          <span className="hidden sm:inline text-sm font-medium">Preguntá a Argix</span>
        </div>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute bottom-0 left-0 right-0 mx-auto 
                         sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2
                         w-full max-w-4xl sm:max-w-5xl
                         rounded-2xl bg-white/90 backdrop-blur
                         border border-slate-200 shadow-2xl 
                         p-3 sm:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/70">
                <h4 className="text-slate-900 font-semibold">Chat con Argix</h4>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Cerrar"
                  className="rounded-full p-2 hover:bg-slate-100"
                >
                  <X className="h-5 w-5 text-slate-600" />
                </button>
              </div>
              <div className="pt-3">
                <ChatArgix />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
