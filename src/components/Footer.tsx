"use client";

import { Linkedin, Mail, Instagram } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      id="site-footer"
      className="relative border-t border-slate-200 bg-white/90 backdrop-blur"
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Texto copyright */}
        <p className="text-slate-500 text-center md:text-left text-sm">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-slate-900">Argix</span>. Todos los
          derechos reservados.
        </p>

        {/* Links sociales */}
        <div className="flex gap-3">
          <SocialLink
            href="mailto:contacto@argix.ai"
            label="Email"
            icon={<Mail size={18} />}
          />
          <SocialLink
            href="https://instagram.com/argix"
            label="Instagram"
            icon={<Instagram size={18} />}
          />
          <SocialLink
            href="https://linkedin.com/company/argix"
            label="LinkedIn"
            icon={<Linkedin size={18} />}
          />
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
