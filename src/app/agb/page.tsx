import { PageShell } from "@/components/layout/PageShell";

export const metadata = {
  title: "AGB | Grünkalender",
};

export default function AgbPage() {
  return (
    <PageShell>
      <article className="max-w-4xl space-y-8 py-8 md:py-10">
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl">
            Allgemeine Geschäftsbedingungen (AGB)
          </h1>
          <p className="text-sm leading-7 text-zinc-600">
            Diese AGB sind eine Vorlage mit Platzhaltern und müssen an das konkrete
            Geschäftsmodell von [Unternehmen / Betreiber] angepasst werden.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-zinc-900">1. Geltungsbereich</h2>
          <p className="text-sm leading-7 text-zinc-700">
            Diese Bedingungen gelten für die Nutzung der Website und der angebotenen
            Inhalte von [Unternehmen / Betreiber] unter [Domain].
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-zinc-900">2. Leistungen und Inhalte</h2>
          <p className="text-sm leading-7 text-zinc-700">
            Grünkalender stellt Informationen rund um Pflanzen, einen allgemeinen
            Kalenderbereich sowie einen persönlichen Bereich „Mein Garten“ bereit.
            Die Inhalte dienen der allgemeinen Orientierung und ersetzen keine
            individuelle Fachberatung.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-zinc-900">3. Nutzung von „Mein Garten“</h2>
          <p className="text-sm leading-7 text-zinc-700">
            Der persönliche Bereich „Mein Garten“ dient der privaten Dokumentation.
            Nutzer sind für die Richtigkeit und Sicherung ihrer eingegebenen Daten
            selbst verantwortlich. Aktuell erfolgt die Speicherung lokal im Browser.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-zinc-900">4. Haftung</h2>
          <p className="text-sm leading-7 text-zinc-700">
            [Unternehmen / Betreiber] haftet unbeschränkt bei Vorsatz und grober
            Fahrlässigkeit. Bei leichter Fahrlässigkeit ist die Haftung – soweit
            gesetzlich zulässig – auf vorhersehbare, vertragstypische Schäden
            begrenzt. Die Haftung für Schäden aus der Verletzung von Leben, Körper
            oder Gesundheit bleibt unberührt.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-zinc-900">5. Verfügbarkeit und Änderungen</h2>
          <p className="text-sm leading-7 text-zinc-700">
            Es besteht kein Anspruch auf eine jederzeit unterbrechungsfreie
            Verfügbarkeit. Inhalte und Funktionen können jederzeit angepasst,
            erweitert oder entfernt werden, sofern berechtigte Interessen der
            Nutzer angemessen berücksichtigt werden.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-zinc-900">6. Schlussbestimmungen</h2>
          <p className="text-sm leading-7 text-zinc-700">
            Es gilt das Recht von [Land / Rechtsordnung]. Gerichtsstand – soweit
            zulässig – ist [Gerichtsstand]. Sollten einzelne Bestimmungen unwirksam
            sein, bleibt die Wirksamkeit der übrigen Regelungen unberührt.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-zinc-900">7. Platzhalter-Hinweis</h2>
          <p className="text-sm leading-7 text-zinc-700">
            Bitte ersetze alle Platzhalter wie [Unternehmen], [Domain],
            [Gerichtsstand] und weitere rechtliche Details vor dem Live-Betrieb.
          </p>
        </section>
      </article>
    </PageShell>
  );
}
