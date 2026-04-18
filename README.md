# Grünkalender

## Kurzbeschreibung
Grünkalender ist eine Next.js/TypeScript-Webanwendung für Gartenplanung. Das Projekt kombiniert strukturierte Pflanzen-Informationsseiten, einen allgemeinen Jahreskalender für Pflanzenphasen und einen persönlichen Bereich „Mein Garten“.

## Ziel des Projekts
Ziel ist eine langfristig ausbaubare Garten-Plattform mit klarer Trennung zwischen:
- zentralen, allgemeinen Pflanzendaten
- persönlicher Nutzerverwaltung im Bereich „Mein Garten“
- UI-Texten und inhaltlichen Daten

## Aktueller Funktionsstand
- Visuelles Basislayout mit fixiertem Header/Footer und zentralem „Papier“-Inhaltsbereich
- Pflanzenbereich mit Übersichtsseite und SEO-fähigen Detailseiten
- Zentrale Pflanzendaten in modularer Struktur (jede Pflanze eigene Datei)
- Kalenderansicht (`/der-kalender`) als allgemeine Pflanzen-Timeline
- Persönlicher Bereich „Mein Garten“ (`/mein-garten`) inkl. Einträgen, Detailseiten und Event-Erfassung
- UI-Texte für Gartenbereiche zentralisiert unter `src/content/ui/de.ts`

## Wichtige Bereiche der Website
- `/`
  - Startseite mit Projektüberblick
- `/pflanzen`
  - Übersicht der Pflanzen
- `/pflanzen/[slug]`
  - Pflanzen-Detailseiten (z. B. Tomaten, Gurken, Kürbis, Feldsalat, Radieschen, Möhren)
- `/der-kalender`
  - Allgemeiner Pflanzenkalender auf Basis zentraler Pflanzendaten
- `/mein-garten`
  - Persönlicher Gartenbereich für eigene Einträge
- `/mein-garten/[entryId]`
  - Detail-/Tagebuchseite pro Garteneintrag

## Projektstruktur
```text
src/
  app/                     # Routen und Seiten (App Router)
  components/              # UI-Komponenten (u. a. layout, calendar, garden)
  config/                  # Konfigurationen (z. B. Navigation)
  content/
    ui/
      de.ts                # Zentrale deutsche UI-Texte
  data/
    plants/                # Zentrale Pflanzendaten (pro Pflanze eine Datei)
    garden/                # Typen und (optionale) Mock-Strukturen für Mein Garten
  lib/
    calendar/              # Hilfslogik für Kalenderdarstellung
    garden/                # Service-, Storage- und View-Model-Logik für Mein Garten
```

## Datenstruktur / Architektur
### Pflanzen (`src/data/plants`)
- Zentrale fachliche Datenquelle für Pflanzen
- Jede Pflanze in eigener Datei (`tomaten.ts`, `gurken.ts`, ...)
- Enthält Stammdaten, SEO-Daten, Inhaltsabschnitte und Timeline-Einträge
- `index.ts` bündelt Exporte und Lookup-Strukturen

### Kalender (`/der-kalender`)
- Nutzt ausschließlich zentrale Pflanzendaten
- Zeigt allgemeine Zeitfenster (kein persönlicher Nutzerkalender)
- Mehrere Timeline-Einträge pro Pflanze werden unterstützt

### Mein Garten (`/mein-garten`)
- Speichert nur nutzerbezogene Daten (Einträge + Events)
- Verknüpft Pflanzen über `plantSlug` mit dem zentralen Pflanzenkatalog
- Zugriff über Service-/Storage-Schicht in `src/lib/garden`

### Trennungsprinzipien
- **Aktuell keine Verbindung** zwischen allgemeinem Kalender und „Mein Garten“
- Pflanzen-Content bleibt in `src/data/plants`
- UI-Texte bleiben separat in `src/content/ui`

## Lokale Entwicklung
Voraussetzungen:
- Node.js 20+
- npm

Installieren:
```bash
npm install
```

Entwicklung starten:
```bash
npm run dev
```

Build prüfen:
```bash
npm run build
```

Lint prüfen:
```bash
npm run lint
```

## Aktueller Speicherstand
- „Mein Garten“ verwendet derzeit **localStorage** im Browser
- Storage-Zugriffe sind über `src/lib/garden/storage.ts` gekapselt
- Dadurch ist später eine Umstellung auf einen anderen Speicher (z. B. Firestore) einfacher möglich

## Nächste sinnvolle Ausbaustufen
1. Austauschbare Persistenzschicht (z. B. Firestore) hinter bestehender Service-Schnittstelle
2. Validierung und Fehlermeldungen für Formularflüsse in „Mein Garten“
3. Erweiterung des Pflanzenkatalogs um weitere Arten
4. Feingranulare Kalenderansichten (z. B. Wochen-/Tagesbezug)
5. Optionale spätere Verknüpfung von „Mein Garten“ und Kalender (aktuell bewusst getrennt)

