import type { ReactNode } from "react";

interface PageShellProps {
  children: ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="mx-auto w-full max-w-[1200px] min-h-[calc(100dvh-7rem)] rounded-[2px] bg-[var(--paper)] px-6 pb-12 pt-6 shadow-[0_14px_40px_-24px_rgba(18,45,28,0.32),0_1px_0_rgba(18,45,28,0.08)] sm:px-10 sm:pb-14 sm:pt-7 lg:px-16 lg:pb-16 lg:pt-8">
      {children}
    </div>
  );
}
