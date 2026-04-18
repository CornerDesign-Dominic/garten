import type { Plant } from "./types";

export const kuerbis: Plant = {
  name: "Kuerbis",
  slug: "kuerbis",
  category: "fruchtgemuese",
  lifecycle: "einjaehrig",
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
      startDay: 1,
      endMonth: 5,
      endDay: 5,
      color: "#bfdc9a",
    },
    {
      type: "direktsaat",
      label: "Direktsaat ins Beet",
      startMonth: 5,
      startDay: 5,
      endMonth: 6,
      endDay: 5,
      color: "#7aa942",
    },
    {
      type: "auspflanzen",
      label: "Jungpflanzen setzen",
      startMonth: 5,
      startDay: 15,
      endMonth: 6,
      endDay: 10,
      color: "#6a9b38",
    },
    {
      type: "duengen",
      label: "Grundduengung zum Start",
      startMonth: 6,
      startDay: 1,
      endMonth: 7,
      endDay: 5,
      color: "#8b6b45",
    },
    {
      type: "duengen",
      label: "Nachduegen bei Fruchtansatz",
      startMonth: 7,
      startDay: 6,
      endMonth: 8,
      endDay: 10,
      color: "#8b6b45",
    },
    {
      type: "ernten",
      label: "Erntezeit",
      startMonth: 9,
      startDay: 1,
      endMonth: 10,
      endDay: 31,
      color: "#c95b52",
    },
  ],
};
