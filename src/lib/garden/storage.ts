import type { GardenEntry, GardenEvent } from "@/data/garden";

export type GardenState = {
  entries: GardenEntry[];
  events: GardenEvent[];
};

export interface GardenStorage {
  load(): GardenState | null;
  save(state: GardenState): void;
}

const STORAGE_KEY = "gruenkalender:mein-garten:v1";

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
  const events = rawEvents
    .filter(isGardenEvent)
    .map((event) => ({
      ...event,
      type: normalizeEventType(event.type),
    }));

  return { entries, events };
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

