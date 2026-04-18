import type { CalendarRowData } from "@/lib/calendar/timeline";

type CalendarRowProps = {
  row: CalendarRowData;
};

export function CalendarRow({ row }: CalendarRowProps) {
  return (
    <div className="grid grid-cols-[11rem_1fr] gap-4 py-3">
      <div className="flex items-center">
        <p className="text-sm font-semibold text-zinc-800">{row.plantName}</p>
      </div>

      <div className="relative h-14 overflow-hidden rounded-xl border border-emerald-900/10 bg-emerald-50/30">
        <div className="pointer-events-none absolute inset-0 grid grid-cols-12">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="border-l border-emerald-900/10 first:border-l-0"
            />
          ))}
        </div>

        {row.segments.map((segment, index) => {
          const laneOffset = index % 2 === 0 ? "top-[0.6rem]" : "top-[1.85rem]";

          return (
            <div
              key={segment.id}
              title={`${segment.label} (${segment.type})`}
              className={`absolute h-4 rounded-md opacity-90 shadow-[0_4px_8px_-6px_rgba(15,23,42,0.5)] ${laneOffset}`}
              style={{
                left: `${segment.startPercent}%`,
                width: `${segment.widthPercent}%`,
                backgroundColor: segment.color,
                minWidth: "0.35rem",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

