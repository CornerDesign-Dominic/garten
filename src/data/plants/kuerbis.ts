import type { Plant } from "./types";

export const kuerbis: Plant = {
  name: "Kuerbis",
  slug: "kuerbis",
  category: "fruchtgemuese",
  summary: "Wuchsfreudige Kultur mit grossem Platzbedarf und ertragreicher Herbsternte.",
  seo: {
    title: "Kuerbis | Gruenkalender",
    description: "Kuerbis im Garten: uebersichtliche Informationen zu Standort, Pflanzzeit, Pflege, Ernte und Zeitfenstern.",
  },
  content: {
    intro:
      "Kuerbisse brauchen viel Raum und einen gut versorgten Boden, danken dies aber mit robustem Wuchs und lagerfaehigen Fruechten.",
    standort:
      "Vollsonnig und warm. Tiefgruendiger, humoser Boden mit guter Wasserhaltefaehigkeit ist ideal.",
    pflanzzeit:
      "Vorzucht ab April moeglich, Direktsaat ab Mai. Auspflanzen nach den Eisheiligen.",
    pflege:
      "Gleichmaessig waessern, mulchen und Triebe bei Bedarf lenken. In der Hauptwachstumsphase organisch nachduengen.",
    ernte:
      "Von Spaetsommer bis Herbst. Reife Fruechte haben eine feste Schale und einen trockenen, verholzenden Stiel.",
    hinweise:
      "Grosszuegig Abstand einplanen. Fruechte trocken lagern und nur mit intakter Schale einlagern.",
  },
  timeline: [
    {
      type: "vorzucht",
      label: "Vorzucht im Topf",
      startMonth: 4,
      startDay: 10,
      endMonth: 5,
      endDay: 10,
      color: "#f59e0b",
    },
    {
      type: "direktsaat",
      label: "Direktsaat ins Beet",
      startMonth: 5,
      startDay: 10,
      endMonth: 6,
      endDay: 5,
      color: "#84cc16",
    },
    {
      type: "auspflanzen",
      label: "Jungpflanzen setzen",
      startMonth: 5,
      startDay: 15,
      endMonth: 6,
      endDay: 15,
      color: "#22c55e",
    },
    {
      type: "duengen",
      label: "Kompostgabe und Startduengung",
      startMonth: 5,
      startDay: 15,
      endMonth: 6,
      endDay: 20,
      color: "#16a34a",
    },
    {
      type: "duengen",
      label: "Nachduegen bei Fruchtansatz",
      startMonth: 7,
      startDay: 1,
      endMonth: 8,
      endDay: 10,
      color: "#15803d",
    },
    {
      type: "ernten",
      label: "Erntezeit",
      startMonth: 8,
      startDay: 20,
      endMonth: 10,
      endDay: 31,
      color: "#f97316",
    },
  ],
};
