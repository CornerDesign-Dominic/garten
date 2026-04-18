import type { Plant } from "./types";

export const gurken: Plant = {
  name: "Gurken",
  slug: "gurken",
  category: "fruchtgemuese",
  lifecycle: "einjaehrig",
  summary: "Schnellwachsende Wärmekultur mit laufender Ernte bei konstanter Wasserversorgung.",
  seo: {
    title: "Gurken | Grünkalender",
    description: "Gurken im Garten: Standort, Pflanzzeit, Pflege, Ernte und saisonale Zeitfenster auf einen Blick.",
  },
  content: {
    intro:
      "Gurken entwickeln bei warmen Bedingungen und gleichmäßiger Feuchte einen hohen Ertrag über den gesamten Sommer.",
    standort:
      "Sonnig bis halbschattig, warm und geschützt. Der Boden sollte locker, humos und nährstoffreich sein.",
    pflanzzeit:
      "Vorzucht ab April. Auspflanzen ins Freiland ab Mitte Mai, sobald die Nächte stabil warm sind.",
    pflege:
      "Regelmäßig gießen, Boden mulchen und Triebe an Rankhilfen führen. In Schubphasen moderat nachdüngen.",
    ernte:
      "Je nach Sorte ab Juni/Juli bis in den Spätsommer. Früchte regelmäßig schneiden, damit neue nachkommen.",
    hinweise:
      "Kälte und Staunässe vermeiden. Rankkultur verbessert Luftzirkulation und reduziert Krankheitsdruck.",
  },
  timeline: [
    {
      type: "vorzucht",
      label: "Vorzucht in Töpfen",
      startMonth: 4,
      startDay: 1,
      endMonth: 5,
      endDay: 10,
      color: "#bfdc9a",
    },
    {
      type: "direktsaat",
      label: "Direktsaat bei ausreichend warmem Boden",
      startMonth: 5,
      startDay: 15,
      endMonth: 6,
      endDay: 20,
      color: "#7aa942",
    },
    {
      type: "auspflanzen",
      label: "Auspflanzen ins Freiland",
      startMonth: 5,
      startDay: 20,
      endMonth: 6,
      endDay: 20,
      color: "#6a9b38",
    },
    {
      type: "duengen",
      label: "Erste Nährstoffgabe nach Anwachsen",
      startMonth: 6,
      startDay: 10,
      endMonth: 7,
      endDay: 10,
      color: "#8b6b45",
    },
    {
      type: "duengen",
      label: "Nachdüngung in der Hauptphase",
      startMonth: 7,
      startDay: 11,
      endMonth: 8,
      endDay: 25,
      color: "#8b6b45",
    },
    {
      type: "ernten",
      label: "Laufende Ernte",
      startMonth: 7,
      startDay: 5,
      endMonth: 9,
      endDay: 25,
      color: "#c95b52",
    },
  ],
};
