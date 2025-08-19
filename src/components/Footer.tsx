"use client";

import { Github, Linkedin, Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-200 bg-white/90 backdrop-blur">
      <div
        className="
          mx-auto w-full max-w-7xl px-6 py-14
          grid grid-cols-1 md:grid-cols-5 gap-10
          items-start
        "
      >
        {/* Branding + CTA */}
        <div className="md:col-span-2 flex flex-col">
          {/* Logo */}
          {/* <Link href="/" aria-label="Inicio" className="inline-flex items-center">
            <Image
              src="/images/logo.png"     // Recomendado: usar /logo.svg si lo tenés
              alt="Logo Argix"
              width={360}
              height={100}
              priority
              sizes="(min-width: 1024px) 220px, (min-width: 768px) 200px, 180px"
              className="w-auto h-16 md:h-18 lg:h-20 object-contain"
            />
          </Link> */}

          {/* Claim + CTA */}
          <div className="mt-6">
            <p className="text-xl md:text-2xl font-semibold text-slate-900">
              ¿Listo para potenciar tu negocio con IA?
            </p>

            <Link
              href="/contacto"
              className="mt-2 inline-flex text-purple-700 hover:text-purple-900 font-medium transition"
            >
              Hablemos →
            </Link>
          </div>

          {/* Contacto */}
          <div className="mt-5 text-sm space-y-2 text-slate-600">
            <p className="flex items-center gap-2">
              <Phone size={16} className="text-purple-600" />
              +54 9 11 5555 5555
            </p>
            <p className="flex items-center gap-2">
              <Mail size={16} className="text-purple-600" />
              contacto@argix.ai
            </p>
          </div>
        </div>

        {/* Columna: Compañía */}
        <div className="pt-2">
          <h4 className="font-semibold text-slate-900 mb-3">Compañía</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li><Link href="/nosotros" className="hover:text-purple-700">Nosotros</Link></li>
            <li><Link href="/blog" className="hover:text-purple-700">Blog</Link></li>
            <li><Link href="/carreras" className="hover:text-purple-700">Carreras</Link></li>
            <li><Link href="/contacto" className="hover:text-purple-700">Contacto</Link></li>
          </ul>
        </div>

        {/* Columna: Industrias */}
        <div className="pt-2">
          <h4 className="font-semibold text-slate-900 mb-3">Industrias</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>Salud</li>
            <li>Recursos Humanos</li>
            <li>Logística</li>
            <li>Producción</li>
          </ul>
        </div>

        {/* Columna: Servicios */}
        <div className="pt-2">
          <h4 className="font-semibold text-slate-900 mb-3">Servicios</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>Consultoría en IA</li>
            <li>Automatización</li>
            <li>Desarrollo a medida</li>
            <li>Integraciones</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-200 py-6 text-sm">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-center md:text-left">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-slate-900">Argix</span>. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            <SocialLink href="mailto:contacto@argix.ai" label="Email" icon={<Mail size={18} />} />
            <SocialLink href="https://github.com/argix" label="GitHub" icon={<Github size={18} />} />
            <SocialLink href="https://linkedin.com/company/argix" label="LinkedIn" icon={<Linkedin size={18} />} />
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-500 hover:text-purple-700 hover:border-purple-400 transition"
    >
      {icon}
    </Link>
  );
}
