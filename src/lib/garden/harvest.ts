import type { GardenEvent } from "@/data/garden";

export type HarvestEntry = {
  id: string;
  date: string;
  quantity?: number;
  weightGrams?: number;
  note?: string;
};

const HARVEST_TYPES = new Set(["erste_ernte", "letzte_ernte"]);

function toNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function toWeightGramsFromLegacyValue(value?: number, unit?: string) {
  if (value === undefined) {
    return undefined;
  }

  if (unit === "g") {
    return value;
  }
  if (unit === "kg") {
    return value * 1000;
  }

  return undefined;
}

function toQuantityFromLegacyValue(value?: number, unit?: string) {
  if (value === undefined) {
    return undefined;
  }

  if (unit === "stueck") {
    return value;
  }

  return undefined;
}

export function toHarvestEntries(events: GardenEvent[]): HarvestEntry[] {
  return events
    .filter((eventItem) => HARVEST_TYPES.has(eventItem.type))
    .map((eventItem) => ({
      id: eventItem.id,
      date: eventItem.date,
      quantity:
        toNumber(eventItem.quantity) ??
        toQuantityFromLegacyValue(eventItem.value, eventItem.unit),
      weightGrams:
        toNumber(eventItem.weightGrams) ??
        toWeightGramsFromLegacyValue(eventItem.value, eventItem.unit),
      note: eventItem.note,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function getHarvestYears(entries: HarvestEntry[]) {
  const years = new Set<number>();

  for (const entry of entries) {
    const year = Number(entry.date.slice(0, 4));
    if (Number.isFinite(year)) {
      years.add(year);
    }
  }

  return Array.from(years).sort((a, b) => a - b);
}

export function sumHarvestForYear(entries: HarvestEntry[], year: number) {
  let quantity = 0;
  let weightGrams = 0;

  for (const entry of entries) {
    if (Number(entry.date.slice(0, 4)) !== year) {
      continue;
    }
    quantity += entry.quantity ?? 0;
    weightGrams += entry.weightGrams ?? 0;
  }

  return { quantity, weightGrams };
}

