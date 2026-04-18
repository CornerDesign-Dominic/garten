import { TRACK_COLORS } from "@/lib/calendar/timeline";

const legendItems = [
  { label: "Vorzucht / Aussaat", color: TRACK_COLORS.aussaat },
  { label: "Duengen", color: TRACK_COLORS.duengen },
  { label: "Ernte", color: TRACK_COLORS.ernte },
];

export function CalendarLegend() {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-xl border border-emerald-900/10 bg-white/60 px-4 py-3">
      {legendItems.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="inline-block h-2.5 w-7 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-xs font-medium text-zinc-600">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
