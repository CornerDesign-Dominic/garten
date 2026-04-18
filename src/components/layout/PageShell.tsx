import type { ReactNode } from "react";

interface PageShellProps {
  children: ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="mx-auto w-full max-w-[1200px] min-h-[calc(100dvh-7rem)] rounded-md border border-[var(--line-soft)] bg-[var(--paper)] px-6 pb-12 pt-6 shadow-[0_18px_44px_-28px_rgba(18,45,28,0.34),0_1px_0_rgba(18,45,28,0.08)] sm:px-10 sm:pb-14 sm:pt-7 lg:px-16 lg:pb-16 lg:pt-8">
      {children}
    </div>
  );
}
