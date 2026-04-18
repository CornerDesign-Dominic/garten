import type { Plant } from "./types";

export const radieschen: Plant = {
  name: "Radieschen",
  slug: "radieschen",
  category: "wurzelgemuese",
  lifecycle: "einjaehrig",
  summary: "Schnelle Zwischenkultur mit kurzen Entwicklungszeiten und mehreren Saatfenstern.",
  seo: {
    title: "Radieschen | Grünkalender",
    description: "Radieschen im Garten: Standort, Aussaat, Pflege, Ernte und typische Zeitfenster übersichtlich erklärt.",
  },
  content: {
    intro:
      "Radieschen sind unkompliziert und eignen sich hervorragend für fortlaufende Sätze im Frühjahr und Spätsommer.",
    standort:
      "Sonnig bis halbschattig. Lockerer, steinfreier Boden fördert gleichmäßige Knollenbildung.",
    pflanzzeit:
      "Direktsaat von März bis September in kurzen Abständen für fortlaufende Ernte.",
    pflege:
      "Konstant feucht halten, nicht zu dicht stehen lassen und regelmäßig hacken.",
    ernte:
      "Je nach Witterung nach 4 bis 8 Wochen. Frühzeitig ernten, bevor die Knollen holzig werden.",
    hinweise:
      "An sehr heißen Standorten schießen Pflanzen schneller. Besser in kühleren Zeitfenstern planen.",
  },
  timeline: [
    {
      type: "direktsaat",
      label: "Frühjahrsaussaat",
      startMonth: 3,
      startDay: 1,
      endMonth: 5,
      endDay: 31,
      color: "#7aa942",
    },
    {
      type: "direktsaat",
      label: "Spätsommeraussaat",
      startMonth: 8,
      startDay: 15,
      endMonth: 9,
      endDay: 30,
      color: "#7aa942",
    },
    {
      type: "duengen",
      label: "Zurückhaltende Grundversorgung",
      startMonth: 3,
      startDay: 1,
      endMonth: 3,
      endDay: 31,
      color: "#8b6b45",
    },
    {
      type: "ernten",
      label: "Ernte aus Frühjahrssaat",
      startMonth: 4,
      startDay: 1,
      endMonth: 7,
      endDay: 10,
      color: "#c95b52",
    },
    {
      type: "ernten",
      label: "Ernte aus Spätsommeraussaat",
      startMonth: 9,
      startDay: 10,
      endMonth: 10,
      endDay: 31,
      color: "#c95b52",
    },
  ],
};
