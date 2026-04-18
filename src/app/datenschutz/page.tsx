import { PageShell } from "@/components/layout/PageShell";

export const metadata = {
  title: "Datenschutz | Grünkalender",
};

export default function DatenschutzPage() {
  return (
    <PageShell>
      <article className="max-w-4xl space-y-8 py-8 md:py-10">
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl">
            Datenschutz
          </h1>
          <p className="text-sm leading-7 text-zinc-600">
            Diese Datenschutzhinweise sind eine Vorlage und enthalten bewusst
            Platzhalter. Sie ersetzen keine individuelle Rechtsberatung.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-zinc-900">1. Verantwortliche Stelle</h2>
          <p className="text-sm leading-7 text-zinc-700">
            Verantwortlich für die Datenverarbeitung auf dieser Website ist:
            <br />
            [Name des Betreibers / Unternehmen]
            <br />
            [Adresse]
            <br />
            [E-Mail-Adresse]
            <br />
            [Telefonnummer]
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-zinc-900">2. Nutzung der Website</h2>
          <p className="text-sm leading-7 text-zinc-700">
            Beim Besuch dieser Website können technisch notwendige Daten verarbeitet
            werden, zum Beispiel [IP-Adresse], [Zeitpunkt], [Browsertyp] und
            [aufgerufene Seite]. Diese Daten dienen der sicheren Bereitstellung der
            Website und werden nur im erforderlichen Umfang verarbeitet.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-zinc-900">3. Speicherung im Browser (localStorage)</h2>
          <p className="text-sm leading-7 text-zinc-700">
            Der Bereich „Mein Garten“ speichert nutzerbezogene Einträge aktuell lokal
            im Browser über <code>localStorage</code>. Diese Daten werden nicht automatisch
            an einen Server übertragen. Du kannst die Daten jederzeit im Browser löschen.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-zinc-900">4. Formularnutzung</h2>
          <p className="text-sm leading-7 text-zinc-700">
            Eingaben in Formularen (z. B. im Bereich „Mein Garten“) werden aktuell nur
            zur Darstellung und lokalen Speicherung innerhalb der Anwendung verwendet.
            Falls in Zukunft serverseitige Verarbeitung ergänzt wird, werden diese
            Datenschutzhinweise entsprechend aktualisiert.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-zinc-900">5. Mögliche zukünftige Dienste</h2>
          <p className="text-sm leading-7 text-zinc-700">
            Es ist geplant, später optionale externe Dienste einzubinden (z. B.
            [Firebase], [Hosting-/Analyse-Dienste], [E-Mail-Dienste]). Sobald solche
            Dienste produktiv genutzt werden, werden Anbieter, Zwecke,
            Rechtsgrundlagen und Speicherfristen transparent ergänzt.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-zinc-900">6. Deine Rechte</h2>
          <p className="text-sm leading-7 text-zinc-700">
            Du hast im Rahmen der gesetzlichen Vorgaben insbesondere das Recht auf
            Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
            Datenübertragbarkeit sowie Widerspruch gegen bestimmte Verarbeitungen.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-zinc-900">7. Kontakt zum Datenschutz</h2>
          <p className="text-sm leading-7 text-zinc-700">
            Für Datenschutzanfragen erreichst du uns unter:
            <br />
            [E-Mail-Adresse für Datenschutzanfragen]
          </p>
        </section>
      </article>
    </PageShell>
  );
}
