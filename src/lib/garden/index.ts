import { plantsBySlug } from "@/data/plants";
import type { GardenEntry, GardenEvent } from "@/data/garden/types";
export { GardenService } from "./garden-service";
export { createLocalGardenStorage } from "./storage";
export type { GardenState, GardenStorage } from "./storage";
export { buildGardenYearGroups } from "./view-models";
export type { GardenYearCard, GardenYearGroup } from "./view-models";
export {
  getHarvestYears,
  sumHarvestForYear,
  toHarvestEntries,
} from "./harvest";
export type { HarvestEntry } from "./harvest";

export function getEventsForGardenEntry(
  gardenEntryId: string,
  events: GardenEvent[],
) {
  return events
    .filter((event) => event.gardenEntryId === gardenEntryId)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function isGardenEntryActiveOnDate(
  entry: GardenEntry,
  date: string,
) {
  const checkDate = new Date(date);
  const startDate = new Date(entry.startDate);
  const endDate = entry.endDate ? new Date(entry.endDate) : null;

  if (Number.isNaN(checkDate.getTime()) || Number.isNaN(startDate.getTime())) {
    return false;
  }

  if (!endDate) {
    return checkDate >= startDate;
  }

  if (Number.isNaN(endDate.getTime())) {
    return false;
  }

  return checkDate >= startDate && checkDate <= endDate;
}

export function validateGardenPlantRefs(entries: GardenEntry[]) {
  const unknownPlantSlugs = entries
    .map((entry) => entry.plantSlug)
    .filter((slug) => !plantsBySlug[slug]);

  return Array.from(new Set(unknownPlantSlugs));
}
