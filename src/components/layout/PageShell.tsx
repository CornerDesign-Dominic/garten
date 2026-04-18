import type { ReactNode } from "react";

interface PageShellProps {
  children: ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="mx-auto w-full max-w-[1200px] min-h-[calc(100dvh-7rem)] rounded-[2px] bg-[var(--paper)] px-6 py-12 shadow-[0_14px_40px_-24px_rgba(18,45,28,0.32),0_1px_0_rgba(18,45,28,0.08)] sm:px-10 sm:py-14 lg:px-16 lg:py-16">
      {children}
    </div>
  );
}
