import { CALENDAR_LEGEND_ITEMS } from "@/lib/calendar/timeline";

export function CalendarLegend() {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-xl border border-emerald-900/10 bg-white/60 px-4 py-3">
      {CALENDAR_LEGEND_ITEMS.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <span className="flex items-center gap-1" aria-hidden="true">
            {item.colors.map((color) => (
              <span
                key={`${item.label}-${color}`}
                className="inline-block h-2.5 w-5 rounded-full"
                style={{ backgroundColor: color }}
              />
            ))}
          </span>
          <span className="text-xs font-medium text-zinc-600">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
