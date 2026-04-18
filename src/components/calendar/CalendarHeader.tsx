import { CALENDAR_MONTHS } from "@/lib/calendar/timeline";

type CalendarHeaderProps = {
  year: number;
};

export function CalendarHeader({ year }: CalendarHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="inline-flex items-center rounded-full border border-emerald-900/10 bg-white/70 px-4 py-2 text-sm font-semibold text-zinc-700">
        Jahr {year}
      </div>

      <div className="grid grid-cols-[11rem_1fr] gap-4 border-b border-emerald-900/10 pb-3">
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

