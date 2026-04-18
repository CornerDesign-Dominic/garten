import { PageShell } from "@/components/layout/PageShell";

export default function HomePage() {
  return (
    <PageShell>
      <section className="max-w-3xl space-y-7 py-8 md:py-12">
        <p className="text-sm font-medium uppercase tracking-[0.14em] text-emerald-800/80">
          Gruenkalender
        </p>
        <h1 className="text-4xl font-semibold leading-tight text-zinc-900 md:text-5xl">
          Ein klarer Ort fuer Planung, Pflege und Uebersicht im Gartenjahr.
        </h1>
        <p className="text-base leading-8 text-zinc-600 md:text-lg">
          Diese erste Version schafft die Grundlage fuer ein wachsendes Produkt:
          ruhig gestaltet, technisch sauber aufgebaut und bereit fuer naechste
          Funktionen.
        </p>
      </section>

      <section className="grid gap-5 py-10 md:grid-cols-3 md:py-12">
        <article className="rounded-2xl border border-emerald-900/10 bg-white/60 p-6">
          <h2 className="text-lg font-semibold text-zinc-900">Mein Garten</h2>
          <p className="mt-3 text-sm leading-7 text-zinc-600">
            Bereich fuer Beete, Pflanzungen und individuelle Notizen pro Saison.
          </p>
        </article>
        <article className="rounded-2xl border border-emerald-900/10 bg-white/60 p-6">
          <h2 className="text-lg font-semibold text-zinc-900">Der Kalender</h2>
          <p className="mt-3 text-sm leading-7 text-zinc-600">
            Zeitliche Struktur fuer Aufgaben, Pflegefenster und wiederkehrende
            Routinen.
          </p>
        </article>
        <article className="rounded-2xl border border-emerald-900/10 bg-white/60 p-6">
          <h2 className="text-lg font-semibold text-zinc-900">Perspektive</h2>
          <p className="mt-3 text-sm leading-7 text-zinc-600">
            Platz fuer kuenftige Module wie Erinnerungen, Auswertungen und
            saisonale Empfehlungen.
          </p>
        </article>
      </section>

      <section className="max-w-3xl space-y-5 border-t border-emerald-900/10 py-10 md:py-12">
        <h2 className="text-2xl font-semibold text-zinc-900">Saubere Basis</h2>
        <p className="text-base leading-8 text-zinc-600">
          Die Oberflaeche nutzt ein wiederverwendbares Seitenlayout mit fester
          Struktur. Dadurch lassen sich neue Seiten und Funktionsbereiche
          konsistent erweitern, ohne das visuelle Grundgeruest neu aufzubauen.
        </p>
      </section>
    </PageShell>
  );
}
