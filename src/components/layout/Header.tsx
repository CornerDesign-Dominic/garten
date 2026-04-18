import Link from "next/link";

import { navigationItems } from "@/config/navigation";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-emerald-900/10 bg-[#f6fbf3]/92 shadow-[0_10px_26px_-24px_rgba(18,45,28,0.7)] backdrop-blur-md">
      <div className="mx-auto flex h-20 w-full max-w-[1200px] items-center justify-between px-6 sm:px-10">
        <Link href="/" className="text-lg font-semibold tracking-tight text-emerald-800">
          Kalender
        </Link>

        <nav aria-label="Hauptnavigation" className="flex items-center gap-6 sm:gap-8">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-zinc-700 transition-colors hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6fbf3]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
