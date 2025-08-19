"use client";

import Image from "next/image";
import Link from "next/link";

export default function BrandLogo() {
  return (
    <Link href="/" className="inline-flex items-center gap-3">
      {/* Contenedor del ícono */}
      <span
        className="
    relative block h-11 w-11 rounded-full overflow-hidden
    shadow-md backdrop-blur
  "
      >
        {/* aro degradado */}
        <span
          className="absolute inset-0 rounded-full p-[2px]"
          style={{
            background:
              "linear-gradient(135deg, var(--accentA), var(--accentB))",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {/* fondo translúcido */}
        <span className="absolute inset-[2px] rounded-2xl bg-white/80 dark:bg-white/10" />

        {/* logo */}
        <Image
          src="/images/logo_a.png"
          alt="Argix"
          fill
          className="object-contain p-1"
          priority
          sizes="44px"
        />
      </span>
    </Link>
  );
}
