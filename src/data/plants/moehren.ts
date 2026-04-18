import type { Plant } from "./types";

export const moehren: Plant = {
  name: "Möhren",
  slug: "moehren",
  category: "wurzelgemuese",
  lifecycle: "zweijaehrig",
  summary: "Tiefwurzelnde Kultur für lockere Böden mit frühen und späten Erntefenstern.",
  seo: {
    title: "Möhren | Grünkalender",
    description: "Möhren im Garten: Standort, Saattermin, Pflege, Ernte und praktische Timeline-Daten.",
  },
  content: {
    intro:
      "Möhren profitieren von tief gelockerten, steinarmen Beeten und entwickeln dort gleichmäßige, aromatische Wurzeln.",
    standort:
      "Sonnig mit tiefgründigem, lockeren Boden. Verdichtungen und frischer Mist sollten vermieden werden.",
    pflanzzeit:
      "Direktsaat von März bis Juli. Frühe und späte Sorten ermöglichen gestaffelte Ernte.",
    pflege:
      "Gleichmäßig feucht halten, rechtzeitig vereinzeln und die Reihen regelmäßig lockern.",
    ernte:
      "Frühe Möhren ab Sommer, späte Sorten bis in den Herbst hinein und teilweise zur Einlagerung geeignet.",
    hinweise:
      "Mischkultur mit Zwiebeln kann Schädlinge reduzieren. Fruchtfolge von mindestens drei Jahren einhalten.",
  },
  timeline: [
    {
      type: "direktsaat",
      label: "Direktsaat",
      startMonth: 3,
      startDay: 15,
      endMonth: 6,
      endDay: 30,
      color: "#7aa942",
    },
    {
      type: "duengen",
      label: "Kompostgabe vor der Saat",
      startMonth: 3,
      startDay: 1,
      endMonth: 4,
      endDay: 15,
      color: "#8b6b45",
    },
    {
      type: "ernten",
      label: "Bundmöhren ernten",
      startMonth: 6,
      startDay: 20,
      endMonth: 8,
      endDay: 31,
      color: "#c95b52",
    },
    {
      type: "ernten",
      label: "Lagerkarotten ernten",
      startMonth: 9,
      startDay: 1,
      endMonth: 11,
      endDay: 15,
      color: "#c95b52",
    },
  ],
};
