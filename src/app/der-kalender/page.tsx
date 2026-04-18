import { PageShell } from "@/components/layout/PageShell";
import { CalendarTimeline } from "@/components/calendar/CalendarTimeline";
import { plants } from "@/data/plants";

export default function DerKalenderPage() {
  const calendarYear = new Date().getFullYear();

  return (
    <PageShell>
      <section className="max-w-3xl space-y-5 py-8 md:py-10">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl">
          Der Kalender
        </h1>
        <p className="text-base leading-8 text-zinc-600 md:text-lg">
          Diese erste Jahresansicht zeigt die Zeitfenster aus den zentralen
          Pflanzendaten auf einer horizontalen Timeline. Mehrere Phasen pro
          Pflanze und wiederholte Zeitraeume sind bereits unterstuetzt.
        </p>
      </section>

      <CalendarTimeline plants={plants} year={calendarYear} />
    </PageShell>
  );
}
