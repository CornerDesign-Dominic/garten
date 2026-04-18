export type PlantCategory =
  | "fruchtgemuese"
  | "blattgemuese"
  | "wurzelgemuese"
  | (string & {});

export type PlantTimelineBaseType =
  | "vorzucht"
  | "direktsaat"
  | "auspflanzen"
  | "duengen"
  | "ernten";

export type PlantTimelineType =
  | PlantTimelineBaseType
  | "schneiden"
  | "umtopfen"
  | "ausgeizen"
  | (string & {});

export type MonthNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type DayNumber =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31;

export type PlantTimelineEntry = {
  type: PlantTimelineType;
  label: string;
  startMonth: MonthNumber;
  startDay: DayNumber;
  endMonth: MonthNumber;
  endDay: DayNumber;
  color: string;
};

export type PlantSeoData = {
  title: string;
  description: string;
};

export type PlantContentData = {
  intro: string;
  standort: string;
  pflanzzeit: string;
  pflege: string;
  ernte: string;
  hinweise: string;
};

export type Plant = {
  name: string;
  slug: string;
  category: PlantCategory;
  summary: string;
  seo: PlantSeoData;
  content: PlantContentData;
  timeline: PlantTimelineEntry[];
};
