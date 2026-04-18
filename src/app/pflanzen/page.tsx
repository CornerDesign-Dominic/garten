import Link from "next/link";

import { PageShell } from "@/components/layout/PageShell";
import { plants } from "@/data/plants";

export default function PflanzenOverviewPage() {
  return (
    <PageShell>
      <section className="ui-page-head">
        <h1 className="ui-page-title">Pflanzen</h1>
        <p className="ui-page-intro">
          Dieser Bereich sammelt kompakte Pflanzenprofile für den Gartenalltag.
          Jede Unterseite bietet eine ruhige, schnell erfassbare Basis zu
          Standort, Pflanzzeit, Pflege und Ernte.
        </p>
      </section>

      <section className="grid grid-cols-2 gap-4 pb-10 md:grid-cols-3 md:gap-5 md:pb-14 lg:grid-cols-5">
        {plants.map((plant) => (
          <Link
            key={plant.slug}
            href={`/pflanzen/${plant.slug}`}
            className="ui-card-interactive ui-focus p-4 focus-visible:ring-offset-[var(--paper)] md:p-5"
          >
            <h2 className="text-lg font-semibold text-[var(--ink-strong)] md:text-xl">
              {plant.name}
            </h2>
            <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">
              {plant.summary}
            </p>
          </Link>
        ))}
      </section>
    </PageShell>
  );
}
