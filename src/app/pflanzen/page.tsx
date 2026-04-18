import Link from "next/link";

import { PageShell } from "@/components/layout/PageShell";
import { plants } from "@/data/plants";

export default function PflanzenOverviewPage() {
  return (
    <PageShell>
      <section className="max-w-3xl space-y-5 py-8 md:py-12">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl">
          Pflanzen
        </h1>
        <p className="text-base leading-8 text-zinc-600 md:text-lg">
          Dieser Bereich sammelt kompakte Pflanzenprofile fuer den Gartenalltag.
          Jede Unterseite bietet eine ruhige, schnell erfassbare Basis zu
          Standort, Pflanzzeit, Pflege und Ernte.
        </p>
      </section>

      <section className="grid gap-5 pb-10 md:grid-cols-2 md:pb-14 lg:grid-cols-3">
        {plants.map((plant) => (
          <article
            key={plant.slug}
            className="rounded-2xl border border-emerald-900/10 bg-white/65 p-6"
          >
            <h2 className="text-xl font-semibold text-zinc-900">{plant.title}</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-600">{plant.intro}</p>
            <Link
              href={`/pflanzen/${plant.slug}`}
              className="mt-5 inline-flex text-sm font-semibold text-emerald-800 transition-colors hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper)]"
            >
              Zur Pflanzen-Seite
            </Link>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
