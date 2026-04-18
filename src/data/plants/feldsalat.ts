import type { Plant } from "./types";

export const feldsalat: Plant = {
  name: "Feldsalat",
  slug: "feldsalat",
  category: "blattgemuese",
  lifecycle: "einjaehrig",
  summary: "Robuste Kultur für kühlere Monate mit frischer Ernte bis in den Winter.",
  seo: {
    title: "Feldsalat | Grünkalender",
    description: "Feldsalat im Garten: kompakte Hinweise zu Standort, Aussaat, Pflege, Ernte und saisonalen Fenstern.",
  },
  content: {
    intro:
      "Feldsalat ist pflegeleicht und eine wertvolle Kultur für Herbst und Winter, wenn viele Beete bereits abgeerntet sind.",
    standort:
      "Sonnig bis halbschattig. Feinkrümeliger, lockerer Boden erleichtert eine gleichmäßige Entwicklung.",
    pflanzzeit:
      "Direktsaat meist von Juli bis September, in milden Regionen auch mit späten Sätzen möglich.",
    pflege:
      "Reihen unkrautfrei halten, mäßig gießen und bei dichter Saat frühzeitig vereinzeln.",
    ernte:
      "Je nach Aussaat ab September bis in den Februar. Rosetten bodennah schneiden.",
    hinweise:
      "Mit Vlies lassen sich späte Sätze besser absichern. Staunässe in kalten Phasen vermeiden.",
  },
  timeline: [
    {
      type: "direktsaat",
      label: "Frühe Herbstaussaat",
      startMonth: 7,
      startDay: 15,
      endMonth: 8,
      endDay: 25,
      color: "#7aa942",
    },
    {
      type: "direktsaat",
      label: "Späte Aussaat für Winterernte",
      startMonth: 9,
      startDay: 1,
      endMonth: 10,
      endDay: 5,
      color: "#7aa942",
    },
    {
      type: "duengen",
      label: "Leichte Grunddüngung",
      startMonth: 7,
      startDay: 20,
      endMonth: 8,
      endDay: 31,
      color: "#8b6b45",
    },
    {
      type: "ernten",
      label: "Erntefenster",
      startMonth: 10,
      startDay: 1,
      endMonth: 2,
      endDay: 28,
      color: "#c95b52",
    },
  ],
};
