import type { Plant } from "./types";

export const feldsalat: Plant = {
  name: "Feldsalat",
  slug: "feldsalat",
  category: "blattgemuese",
  lifecycle: "einjaehrig",
  summary: "Robuste Kultur fuer kuehlere Monate mit frischer Ernte bis in den Winter.",
  seo: {
    title: "Feldsalat | Gruenkalender",
    description: "Feldsalat im Garten: kompakte Hinweise zu Standort, Aussaat, Pflege, Ernte und saisonalen Fenstern.",
  },
  content: {
    intro:
      "Feldsalat ist pflegeleicht und eine wertvolle Kultur fuer Herbst und Winter, wenn viele Beete bereits abgeerntet sind.",
    standort:
      "Sonnig bis halbschattig. Feinkruemeliger, lockerer Boden erleichtert eine gleichmaessige Entwicklung.",
    pflanzzeit:
      "Direktsaat meist von Juli bis September, in milden Regionen auch mit spaeten Saetzen moeglich.",
    pflege:
      "Reihen unkrautfrei halten, maessig giessen und bei dichter Saat fruehzeitig vereinzeln.",
    ernte:
      "Je nach Aussaat ab September bis in den Februar. Rosetten bodennah schneiden.",
    hinweise:
      "Mit Vlies lassen sich spaete Saetze besser absichern. Staunaesse in kalten Phasen vermeiden.",
  },
  timeline: [
    {
      type: "direktsaat",
      label: "Direktsaat",
      startMonth: 7,
      startDay: 15,
      endMonth: 9,
      endDay: 30,
      color: "#84cc16",
    },
    {
      type: "duengen",
      label: "Leichte Grundduengung",
      startMonth: 7,
      startDay: 10,
      endMonth: 8,
      endDay: 20,
      color: "#16a34a",
    },
    {
      type: "ernten",
      label: "Erntefenster",
      startMonth: 9,
      startDay: 20,
      endMonth: 2,
      endDay: 20,
      color: "#10b981",
    },
  ],
};
