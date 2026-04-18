import { CALENDAR_MONTHS } from "@/lib/calendar/timeline";

export function CalendarHeader() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-[12rem_1fr] gap-4 border-b border-emerald-900/10 pb-3">
        <div className="text-xs font-semibold uppercase tracking-[0.11em] text-zinc-500">
          Pflanzen
        </div>
        <div className="grid grid-cols-12 gap-0">
          {CALENDAR_MONTHS.map((month) => (
            <div
              key={month.index}
              className="border-l border-emerald-900/10 px-1 text-center text-xs font-medium text-zinc-500 first:border-l-0"
            >
              {month.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
