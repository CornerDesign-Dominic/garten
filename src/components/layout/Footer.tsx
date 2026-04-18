import Link from "next/link";

const legalLinks = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/agb", label: "AGB" },
] as const;

export function Footer() {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-50 border-t border-emerald-900/10 bg-[#f6fbf3]/92 shadow-[0_-10px_26px_-24px_rgba(18,45,28,0.7)] backdrop-blur-md">
      <div className="mx-auto flex h-11 w-full max-w-[1200px] items-center justify-center gap-6 px-6 sm:justify-end sm:px-10">
        {legalLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-xs font-medium text-zinc-600 transition-colors hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6fbf3]"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </footer>
  );
}
