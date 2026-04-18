import type { CalendarRowData } from "@/lib/calendar/timeline";

type CalendarRowProps = {
  row: CalendarRowData;
};

export function CalendarRow({ row }: CalendarRowProps) {
  return (
    <div className="grid grid-cols-[11rem_1fr] gap-4 py-4">
      <div className="space-y-2 pt-1">
        <p className="text-sm font-semibold text-zinc-800">{row.plantName}</p>
        <div className="space-y-1.5">
          {row.tracks.map((track) => (
            <div key={track.key} className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: track.color }}
              />
              <p className="text-xs font-medium text-zinc-500">{track.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {row.tracks.map((track) => (
          <div key={track.key} className="relative h-8 overflow-hidden rounded-lg border border-emerald-900/10 bg-emerald-50/30">
            <div className="pointer-events-none absolute inset-0 grid grid-cols-12">
              {Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={index}
                  className="border-l border-emerald-900/10 first:border-l-0"
                />
              ))}
            </div>

            {track.segments.map((segment) => (
              <div
                key={segment.id}
                title={`${segment.label} (${segment.type})`}
                className="absolute top-1/2 h-4 -translate-y-1/2 rounded-md opacity-90 shadow-[0_4px_8px_-6px_rgba(15,23,42,0.5)]"
                style={{
                  left: `${segment.startPercent}%`,
                  width: `${segment.widthPercent}%`,
                  backgroundColor: segment.color,
                  minWidth: "0.35rem",
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
