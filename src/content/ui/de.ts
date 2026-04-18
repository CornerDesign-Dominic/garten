export const uiDe = {
  common: {
    backToMyGarden: "Zurück zu Mein Garten",
    notAvailable: "–",
    active: "Aktiv",
    add: "+ hinzufügen",
    save: "Speichern",
    date: "Datum",
    noteOptional: "Notiz (optional)",
  },
  garden: {
    startType: {
      vorzucht: "Vorzucht",
      direktaussaat: "Direktaussaat",
    },
    detail: {
      notFoundTitle: "Eintrag nicht gefunden",
      notFoundText: "Dieser Garten-Eintrag ist lokal nicht vorhanden.",
      baseAdjustTitle: "Basisdaten direkt anpassen",
      saveChanges: "Änderungen speichern",
      startInfoTitle: "Startinformationen",
      sectionTitles: {
        fertilizer: "Dünger",
        harvest: "Ernte",
        internalNotes: "Interne Notizen",
      },
      sectionDescriptions: {
        fertilizer:
          "Erfasse neue Düngungen direkt hier. Die Liste darunter zeigt alle bisherigen Düngungsdaten.",
        harvest: "Erste und letzte Ernte sowie Ertragsmengen werden hier gesammelt.",
        internalNotes:
          "Saisonnotizen bleiben hier gesammelt und chronologisch nachvollziehbar.",
      },
      fields: {
        reference: "Notiz / Referenz",
        location: "Standort",
        typeVessel: "Art / Gefäß / Anbauform",
        place: "Ort",
        amount: "Menge",
        startDate: "Startdatum",
        endDate: "Enddatum",
        startType: "Startart",
      },
      headValues: {
        headerNote: "Grundnotiz",
        noteItem: "Notiz",
        fertilizerNone: "Noch keine Düngung erfasst.",
        harvestNone: "Noch keine Ernte erfasst.",
        internalNotesNone: "Noch keine internen Notizen vorhanden.",
      },
      harvest: {
        first: "Erste Ernte",
        last: "Letzte Ernte",
        total: "Ertrag gesamt",
        yieldPrefix: "Ertrag",
        unitPlaceholder: "Einheit",
      },
      fertilizer: {
        notePlaceholder: "z. B. Komposttee",
      },
      notes: {
        addPlaceholder: "Kurze Beobachtung oder Notiz eintragen",
      },
      startEvents: {
        vorzucht: "Vorzucht",
        aussaat: "Aussaat",
        auspflanzen: "Auspflanzen",
      },
    },
    overview: {
      title: "Mein Garten",
      intro:
        "Halte deine laufenden Kulturen in einer ruhigen Übersicht fest. Jeder Eintrag führt in eine eigene Historie, in der du deinen Verlauf fortlaufend dokumentierst.",
      addEntryToggle: "Etwas meinem Garten hinzufügen",
      saveEntry: "Eintrag speichern",
      empty:
        "Noch keine Einträge vorhanden. Erstelle oben deinen ersten Garten-Eintrag.",
      yearLabel: "Jahr",
      card: {
        start: "Start",
        reference: "Referenz",
        amount: "Menge",
        place: "Ort",
        end: "Ende",
      },
      form: {
        plant: "Pflanze",
        startDate: "Startdatum",
        startType: "Startart",
        place: "Ort",
        vesselType: "Gefäßart",
        amount: "Menge",
        reference: "Zuordnung / Referenz / Kurznotiz",
        choosePlease: "Bitte wählen",
        amountPlaceholder: "z. B. 4 Stück, 2 Reihen",
        referencePlaceholder: "Beet 3, Kübel 5, Reihe 8",
      },
      options: {
        place: ["Balkon", "Garten", "Gewächshaus", "Anderes"],
        growingType: ["Beet", "Hochbeet", "Kübel", "Topf", "Anderes"],
      },
    },
  },
} as const;
