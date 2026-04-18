import type { CalendarRowData } from "@/lib/calendar/timeline";

type CalendarRowProps = {
  row: CalendarRowData;
};

export function CalendarRow({ row }: CalendarRowProps) {
  return (
    <div className="grid grid-cols-[12rem_1fr] items-center gap-4 py-3">
      <div className="space-y-2">
        <p className="text-sm font-semibold text-zinc-800">{row.plantName}</p>
        <div className="space-y-1">
          {row.tracks.map((track) => (
            <div key={track.key} className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: track.color }}
              />
              <p className="text-[11px] font-medium leading-4 text-zinc-500">
                {track.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative h-14 overflow-hidden rounded-lg border border-emerald-900/10 bg-emerald-50/30">
        <div className="pointer-events-none absolute inset-0 grid grid-cols-12">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="border-l border-emerald-900/10 first:border-l-0"
            />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-emerald-900/10" />
        <div className="pointer-events-none absolute inset-x-0 top-[28%] h-px -translate-y-1/2 bg-emerald-900/8" />
        <div className="pointer-events-none absolute inset-x-0 top-[72%] h-px -translate-y-1/2 bg-emerald-900/8" />

        {row.tracks.map((track, trackIndex) =>
          track.segments.map((segment) => (
            <div
              key={segment.id}
              title={`${segment.label} (${segment.type})`}
              className="absolute h-3 rounded-md opacity-90 shadow-[0_4px_8px_-6px_rgba(15,23,42,0.5)]"
              style={{
                left: `${segment.startPercent}%`,
                width: `${segment.widthPercent}%`,
                backgroundColor: segment.color,
                minWidth: "0.35rem",
                top:
                  trackIndex === 0
                    ? "18%"
                    : trackIndex === 1
                      ? "50%"
                      : "82%",
                transform: "translateY(-50%)",
              }}
            />
          )),
        )}
      </div>
    </div>
  );
}
