import { PageShell } from "@/components/layout/PageShell";

export const metadata = {
  title: "Impressum | Grünkalender",
};

export default function ImpressumPage() {
  return (
    <PageShell>
      <article className="max-w-4xl space-y-8 py-8 md:py-10">
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl">
            Impressum
          </h1>
          <p className="text-sm leading-7 text-zinc-600">
            Diese Seite ist eine Vorlage mit Platzhaltern und muss vor Veröffentlichung
            mit den tatsächlichen Angaben des Betreibers ergänzt werden.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-zinc-900">Angaben gemäß § 5 TMG</h2>
          <p className="text-sm leading-7 text-zinc-700">
            [Unternehmen / Name des Betreibers]
            <br />
            [Straße und Hausnummer]
            <br />
            [PLZ Ort]
            <br />
            [Land]
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-zinc-900">Vertreten durch</h2>
          <p className="text-sm leading-7 text-zinc-700">
            [Name der vertretungsberechtigten Person]
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-zinc-900">Kontakt</h2>
          <p className="text-sm leading-7 text-zinc-700">
            E-Mail: [E-Mail-Adresse]
            <br />
            Telefon (optional): [Telefonnummer]
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-zinc-900">Verantwortlich für Inhalte</h2>
          <p className="text-sm leading-7 text-zinc-700">
            Verantwortlich nach § 18 Abs. 2 MStV:
            <br />
            [Name der verantwortlichen Person]
            <br />
            [Adresse der verantwortlichen Person]
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-zinc-900">Hinweis</h2>
          <p className="text-sm leading-7 text-zinc-700">
            Bitte lasse dieses Impressum rechtlich prüfen und trage alle Pflichtangaben
            vollständig ein, bevor die Website produktiv genutzt wird.
          </p>
        </section>
      </article>
    </PageShell>
  );
}
