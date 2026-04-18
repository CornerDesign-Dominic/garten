import type { Plant } from "./types";

export const moehren: Plant = {
  name: "Moehren",
  slug: "moehren",
  category: "wurzelgemuese",
  lifecycle: "zweijaehrig",
  summary: "Tiefwurzelnde Kultur fuer lockere Boeden mit fruehen und spaeten Erntefenstern.",
  seo: {
    title: "Moehren | Gruenkalender",
    description: "Moehren im Garten: Standort, Saettermin, Pflege, Ernte und praktische Timeline-Daten.",
  },
  content: {
    intro:
      "Moehren profitieren von tief gelockerten, steinarmen Beeten und entwickeln dort gleichmaessige, aromatische Wurzeln.",
    standort:
      "Sonnig mit tiefgruendigem, lockeren Boden. Verdichtungen und frischer Mist sollten vermieden werden.",
    pflanzzeit:
      "Direktsaat von Maerz bis Juli. Fruehe und spaete Sorten ermoeglichen gestaffelte Ernte.",
    pflege:
      "Gleichmaessig feucht halten, rechtzeitig vereinzeln und die Reihen regelmaessig lockern.",
    ernte:
      "Fruehe Moehren ab Sommer, spaete Sorten bis in den Herbst hinein und teilweise zur Einlagerung geeignet.",
    hinweise:
      "Mischkultur mit Zwiebeln kann Schaedlinge reduzieren. Fruchtfolge von mindestens drei Jahren einhalten.",
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
      label: "Bundmoehren ernten",
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
