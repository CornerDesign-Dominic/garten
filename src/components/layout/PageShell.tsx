import type { ReactNode } from "react";

interface PageShellProps {
  children: ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="mx-auto w-full max-w-[1200px] bg-[var(--paper)] px-6 py-12 shadow-[0_0_0_1px_rgba(12,41,23,0.06)] sm:px-10 md:min-h-[calc(100vh-8rem)] lg:px-16">
      {children}
    </div>
  );
}
