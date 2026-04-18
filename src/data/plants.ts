export type PlantInfo = {
  slug: string;
  title: string;
  intro: string;
  standort: string;
  pflanzzeit: string;
  pflege: string;
  ernte: string;
  hinweise: string;
};

export const plants: PlantInfo[] = [
  {
    slug: "tomaten",
    title: "Tomaten",
    intro: "Tomaten sind waermebeduerftige Starkzehrer und danken einen sonnigen Standort mit aromatischen Fruechten ueber viele Wochen.",
    standort:
      "Vollsonnig, warm und windgeschuetzt. Der Boden sollte locker, humos und gleichmaessig feucht sein.",
    pflanzzeit:
      "Nach den letzten Spaetfroesten ins Freiland setzen. In der Regel ab Mitte Mai, vorgezogen ab Februar/Maerz.",
    pflege:
      "Regelmaessig giessen, gleichmaessig duengen und je nach Sorte ausgeizen sowie an Staeben oder Schnueren fuehren.",
    ernte:
      "Je nach Sorte meist von Juli bis Oktober. Reife Fruechte haben eine gleichmaessige Farbe und geben leicht nach.",
    hinweise:
      "Auf eine gute Luftzirkulation achten, Blaetter nicht ueber Giesswasser befeuchten und den Standort jaehrlich wechseln.",
  },
  {
    slug: "gurken",
    title: "Gurken",
    intro: "Gurken wachsen schnell und liefern bei regelmaessiger Pflege kontinuierlich frische Fruechte fuer die Sommerkueche.",
    standort:
      "Sonnig bis halbschattig, warm und geschuetzt. Der Boden sollte naehrstoffreich und durchlaessig sein.",
    pflanzzeit:
      "Aussaat im Haus ab April, Pflanzung ins Freiland ab Mitte Mai bei stabil warmen Temperaturen.",
    pflege:
      "Konstant feucht halten, mulchen und in Wachstumsphasen mit organischem Duenger versorgen.",
    ernte:
      "Ab Juni/Juli bis in den Spaetsommer. Junge Fruechte regelmaessig schneiden, damit neue angesetzt werden.",
    hinweise:
      "Gurken reagieren empfindlich auf Kaelte und Staunaesse. Ein Rankgeruest verbessert Belichtung und Gesundheit.",
  },
  {
    slug: "kuerbis",
    title: "Kuerbis",
    intro: "Kuerbisse sind robuste Kulturen mit kraeftigem Wuchs und eignen sich gut fuer Beete mit viel Platz.",
    standort:
      "Vollsonnig und warm. Der Boden sollte tiefgruendig, humos und gut mit Kompost versorgt sein.",
    pflanzzeit:
      "Direktsaat ab Mai oder vorgezogen ab April. Auspflanzen nach den Eisheiligen.",
    pflege:
      "Grosszuegig waessern, Beikraut in der Anfangsphase entfernen und den Boden mit Mulch feucht halten.",
    ernte:
      "Spaetsommer bis Herbst. Reif sind die Fruechte bei hartem Stiel und sortentypischer Schale.",
    hinweise:
      "Fruchtfolge beachten und viel Abstand einplanen. Reife Fruechte trocken und frostfrei lagern.",
  },
  {
    slug: "feldsalat",
    title: "Feldsalat",
    intro: "Feldsalat ist eine robuste Blattkultur fuer die kuehle Jahreszeit und liefert frisches Gruen bis in den Winter.",
    standort:
      "Sonnig bis halbschattig. Lockerer, unkrautfreier Boden mit guter Krume ist ideal.",
    pflanzzeit:
      "Aussaat von Juli bis September, je nach Region auch spaeter fuer milde Winterlagen.",
    pflege:
      "Gleichmaessig feucht halten, in dichten Reihen rechtzeitig vereinzeln und sparsam duengen.",
    ernte:
      "Je nach Aussaat von September bis Februar. Rosetten bodennah schneiden und das Herz schonen.",
    hinweise:
      "Vlies oder einfacher Schutz verlaengert die Saison. Keine zu hohe Stickstoffgabe verwenden.",
  },
  {
    slug: "radieschen",
    title: "Radieschen",
    intro: "Radieschen sind unkompliziert und schnell erntereif, ideal fuer den Einstieg und fuer Zwischenkulturen.",
    standort:
      "Sonnig bis halbschattig auf lockeren, steinfreien Boeden. Frische, gleichmaessige Feuchte verhindert Schossen.",
    pflanzzeit:
      "Fruehjahr bis Herbst in mehreren Saetzen aussaeen, meist von Maerz bis September.",
    pflege:
      "Regelmaessig giessen, Reihen frei halten und nicht zu dicht stehen lassen.",
    ernte:
      "Je nach Sorte oft schon nach 4 bis 8 Wochen. Rechtzeitig ernten, damit die Knollen zart bleiben.",
    hinweise:
      "Satzweise Aussaat sorgt fuer kontinuierliche Ernte. Bei Hitze eher halbschattige Standorte waehlen.",
  },
  {
    slug: "moehren",
    title: "Moehren",
    intro: "Moehren brauchen einen tief gelockerten Boden und entwickeln dort gleichmaessige, aromatische Wurzeln.",
    standort:
      "Sonnig mit tiefgruendigem, steinarmem Boden. Verdichtete Boeden fuehren zu verformten Wurzeln.",
    pflanzzeit:
      "Direktsaat von Maerz bis Juli moeglich, fruehe und spaete Sorten entsprechend staffeln.",
    pflege:
      "Boden gleichmaessig feucht halten, fruehzeitig vereinzeln und regelmaessig hacken.",
    ernte:
      "Fruehe Sorten ab Sommer, Lagerkarotten bis in den Herbst. Nach Bedarf etappenweise ziehen.",
    hinweise:
      "Mischkultur mit Zwiebeln kann Schaedlingsdruck reduzieren. Fruchtfolge von mehreren Jahren einhalten.",
  },
];

export function getPlantBySlug(slug: string) {
  return plants.find((plant) => plant.slug === slug);
}
