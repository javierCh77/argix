"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import BrandLogo from "./BrandLogo";
import { Button } from "./Button";

const LINKS = [
  { href: "#features", label: "Servicios" },
  { href: "#cases", label: "Casos de Éxito" },
  { href: "#tech", label: "Sobre Nosotros" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50">
      {/* Glow superior */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

      <div
        className="
          bg-white/70 backdrop-blur-xl
          border-b border-white/40
          shadow-[0_8px_30px_rgba(6,182,212,0.08)]
          supports-[backdrop-filter]:bg-white/60
        "
      >
        <div className="container mx-auto max-w-7xl px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <BrandLogo />

            {/* Navegación desktop */}
            <nav className="hidden md:flex items-center gap-6 text-sm">
              {LINKS.map((l) => (
                <NavLink key={l.href} href={l.href}>
                  {l.label}
                </NavLink>
              ))}

              <Link href="#contact">
                <Button
                  variant="outline"
                  className="border-cyan-200/60 text-slate-700 hover:border-cyan-400 hover:text-slate-900 cursor-pointer"
                >
                  Contacto
                </Button>
              </Link>
             
            </nav>

            {/* Toggle menú móvil */}
            <button
              className="md:hidden inline-flex items-center justify-center rounded-xl p-2 ring-1 ring-cyan-200/50"
              onClick={() => setOpen((v) => !v)}
              aria-label="Abrir menú"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {open && (
          <div className="md:hidden border-t border-white/40 bg-white/60 backdrop-blur-lg">
            <div className="px-6 pb-4 pt-3 flex flex-col gap-2">
              {LINKS.map((l) => (
                <NavLink key={l.href} href={l.href} className="py-2 text-base">
                  {l.label}
                </NavLink>
              ))}

              <div className="mt-2 flex gap-2">
                <Link href="#contact" className="flex-1">
                  <Button variant="outline" className="w-full cursor-pointer">
                    Contacto
                  </Button>
                </Link>
                <Link href="#demo" className="flex-1">
                  <Button className="w-full bg-gradient-to-r from-cyan-400 to-purple-500">
                    Probar Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

/* =========================
   NavLink
========================= */
function NavLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const base =
    "relative font-medium text-slate-700 hover:text-slate-900 transition-colors";
  const deco =
    "after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:rounded-full " +
    "after:bg-gradient-to-r after:from-cyan-400 after:to-purple-400 " +
    "after:transition-[width] after:duration-300 hover:after:w-full";
  return (
    <Link href={href} className={`${base} ${deco} ${className}`}>
      {children}
    </Link>
  );
}
