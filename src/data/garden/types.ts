export type ISODateString = string;

export type GardenEventBaseType =
  | "vorzucht"
  | "aussaat"
  | "auspflanzen"
  | "duengen"
  | "erste_ernte"
  | "letzte_ernte"
  | "notiz";

export type GardenEventType = GardenEventBaseType | (string & {});

export type GardenValueUnit =
  | "kg"
  | "g"
  | "stueck"
  | "l"
  | "ml"
  | (string & {});

export type GardenStartType = "vorzucht" | "direktaussaat";

export type GardenEntry = {
  id: string;
  plantSlug: string;
  year: number;
  startType?: GardenStartType;
  amount?: string;
  place?: string;
  growingType?: string;
  sunExposure?: string;
  reference?: string;
  startDate: ISODateString;
  endDate?: ISODateString;
  notes?: string;
};

export type GardenEvent = {
  id: string;
  gardenEntryId: string;
  type: GardenEventType;
  date: ISODateString;
  note?: string;
  value?: number;
  unit?: GardenValueUnit;
  quantity?: number;
  weightGrams?: number;
};
