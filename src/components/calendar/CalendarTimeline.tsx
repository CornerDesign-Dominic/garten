import type { Plant } from "@/data/plants";
import { buildCalendarRows } from "@/lib/calendar/timeline";

import { CalendarHeader } from "./CalendarHeader";
import { CalendarLegend } from "./CalendarLegend";
import { CalendarRow } from "./CalendarRow";

type CalendarTimelineProps = {
  plants: Plant[];
  year: number;
};

export function CalendarTimeline({ plants, year }: CalendarTimelineProps) {
  const rows = buildCalendarRows(plants, year);

  return (
    <section className="rounded-2xl border border-emerald-900/10 bg-white/55 p-5 md:p-6">
      <div className="overflow-x-auto">
        <div className="min-w-[860px] space-y-5">
          <CalendarHeader year={year} />

          <div className="divide-y divide-emerald-900/10">
            {rows.map((row) => (
              <CalendarRow key={row.plantSlug} row={row} />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-5">
        <CalendarLegend />
      </div>
    </section>
  );
}
