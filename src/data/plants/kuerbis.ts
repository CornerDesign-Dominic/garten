import type { Plant } from "./types";

export const kuerbis: Plant = {
  name: "Kürbis",
  slug: "kuerbis",
  category: "fruchtgemuese",
  lifecycle: "einjaehrig",
  summary: "Wuchsfreudige Kultur mit großem Platzbedarf und ertragreicher Herbsternte.",
  seo: {
    title: "Kürbis | Grünkalender",
    description: "Kürbis im Garten: übersichtliche Informationen zu Standort, Pflanzzeit, Pflege, Ernte und Zeitfenstern.",
  },
  content: {
    intro:
      "Kürbisse brauchen viel Raum und einen gut versorgten Boden, danken dies aber mit robustem Wuchs und lagerfähigen Früchten.",
    standort:
      "Vollsonnig und warm. Tiefgründiger, humoser Boden mit guter Wasserhaltefähigkeit ist ideal.",
    pflanzzeit:
      "Vorzucht ab April möglich, Direktsaat ab Mai. Auspflanzen nach den Eisheiligen.",
    pflege:
      "Gleichmäßig wässern, mulchen und Triebe bei Bedarf lenken. In der Hauptwachstumsphase organisch nachdüngen.",
    ernte:
      "Von Spätsommer bis Herbst. Reife Früchte haben eine feste Schale und einen trockenen, verholzenden Stiel.",
    hinweise:
      "Großzügig Abstand einplanen. Früchte trocken lagern und nur mit intakter Schale einlagern.",
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
      label: "Grunddüngung zum Start",
      startMonth: 6,
      startDay: 1,
      endMonth: 7,
      endDay: 5,
      color: "#8b6b45",
    },
    {
      type: "duengen",
      label: "Nachdüngen bei Fruchtansatz",
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
