import type { GardenEntry, GardenEvent } from "@/data/garden";

export type GardenState = {
  entries: GardenEntry[];
  events: GardenEvent[];
};

export interface GardenStorage {
  load(): GardenState | null;
  save(state: GardenState): void;
}

const STORAGE_KEY = "gruenkalender:mein-garten:v2";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isGardenEntry(value: unknown): value is GardenEntry {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    typeof value.plantSlug === "string" &&
    typeof value.year === "number" &&
    Number.isFinite(value.year) &&
    typeof value.startDate === "string"
  );
}

function normalizeEntry(rawEntry: GardenEntry): GardenEntry {
  const legacyRaw = rawEntry as GardenEntry & {
    quantity?: number;
    location?: string;
  };
  const legacyAmount =
    rawEntry.amount ??
    (typeof legacyRaw.quantity === "number" ? String(legacyRaw.quantity) : undefined);
  const legacyPlace =
    rawEntry.place ??
    (typeof legacyRaw.location === "string" ? legacyRaw.location : undefined);
  const legacyReference =
    rawEntry.reference ??
    (typeof rawEntry.notes === "string" ? rawEntry.notes : undefined);

  return {
    id: rawEntry.id,
    plantSlug: rawEntry.plantSlug,
    year: rawEntry.year,
    startDate: rawEntry.startDate,
    startType: rawEntry.startType,
    endDate: rawEntry.endDate,
    amount: legacyAmount,
    place: legacyPlace,
    growingType: rawEntry.growingType,
    sunExposure: rawEntry.sunExposure,
    reference: legacyReference,
    notes: rawEntry.notes,
  };
}

function normalizeEventType(type: string) {
  return type === "direktsaat" ? "aussaat" : type;
}

function isGardenEvent(value: unknown): value is GardenEvent {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    typeof value.gardenEntryId === "string" &&
    typeof value.type === "string" &&
    typeof value.date === "string"
  );
}

function sanitizeState(rawState: unknown): GardenState | null {
  if (!isRecord(rawState)) {
    return null;
  }

  const rawEntries = Array.isArray(rawState.entries) ? rawState.entries : [];
  const rawEvents = Array.isArray(rawState.events) ? rawState.events : [];

  const entries = rawEntries.filter(isGardenEntry);
  const normalizedEntries = entries.map(normalizeEntry);
  const events = rawEvents
    .filter(isGardenEvent)
    .map((event) => ({
      ...event,
      type: normalizeEventType(event.type),
    }));

  return { entries: normalizedEntries, events };
}

export function createLocalGardenStorage(): GardenStorage {
  return {
    load() {
      if (typeof window === "undefined") {
        return null;
      }

      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) {
          return null;
        }

        const parsed = JSON.parse(raw) as unknown;
        return sanitizeState(parsed);
      } catch {
        return null;
      }
    },
    save(state) {
      if (typeof window === "undefined") {
        return;
      }

      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    },
  };
}
