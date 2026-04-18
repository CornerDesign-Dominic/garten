import type { GardenEntry } from "@/data/garden";

export type GardenYearCard = {
  displayYear: number;
  entry: GardenEntry;
  isCompleted: boolean;
};

export type GardenYearGroup = {
  year: number;
  cards: GardenYearCard[];
};

function getYearFromDate(value: string) {
  const parsed = new Date(value);
  const year = parsed.getFullYear();
  return Number.isFinite(year) ? year : null;
}

function getEndYear(entry: GardenEntry, currentYear: number) {
  if (!entry.endDate) {
    return Math.max(currentYear, entry.year);
  }

  const endYear = getYearFromDate(entry.endDate);
  if (!endYear) {
    return entry.year;
  }

  return Math.max(endYear, entry.year);
}

export function buildGardenYearGroups(
  entries: GardenEntry[],
  currentYear = new Date().getFullYear(),
): GardenYearGroup[] {
  const byYear = new Map<number, GardenYearCard[]>();

  for (const entry of entries) {
    const startYear = Math.max(entry.year, getYearFromDate(entry.startDate) ?? entry.year);
    const endYear = getEndYear(entry, currentYear);

    for (let year = startYear; year <= endYear; year += 1) {
      const existing = byYear.get(year) ?? [];
      existing.push({
        displayYear: year,
        entry,
        isCompleted: Boolean(entry.endDate),
      });
      byYear.set(year, existing);
    }
  }

  return Array.from(byYear.entries())
    .map(([year, cards]) => ({
      year,
      cards: [...cards].sort((a, b) => {
        if (a.isCompleted !== b.isCompleted) {
          return a.isCompleted ? 1 : -1;
        }
        return a.entry.startDate.localeCompare(b.entry.startDate);
      }),
    }))
    .sort((a, b) => b.year - a.year);
}

