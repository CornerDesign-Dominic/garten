import { mockGardenEntries, mockGardenEvents } from "@/data/garden";
import type { GardenEntry, GardenEvent, GardenEventType, GardenValueUnit } from "@/data/garden";

import type { GardenState, GardenStorage } from "./storage";

type NewGardenEntryInput = {
  plantSlug: string;
  year: number;
  quantity?: number;
  location?: string;
  startDate: string;
  endDate?: string;
  notes?: string;
};

type NewGardenEventInput = {
  gardenEntryId: string;
  type: GardenEventType;
  date: string;
  note?: string;
  value?: number;
  unit?: GardenValueUnit;
};

function createId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function sortEntries(entries: GardenEntry[]) {
  return [...entries].sort((a, b) => {
    if (b.year !== a.year) {
      return b.year - a.year;
    }
    return a.startDate.localeCompare(b.startDate);
  });
}

function sortEvents(events: GardenEvent[]) {
  return [...events].sort((a, b) => a.date.localeCompare(b.date));
}

export class GardenService {
  constructor(private readonly storage: GardenStorage) {}

  load(): GardenState {
    const loaded = this.storage.load();
    if (loaded) {
      return {
        entries: sortEntries(loaded.entries),
        events: sortEvents(loaded.events),
      };
    }

    const seededState: GardenState = {
      entries: sortEntries(mockGardenEntries),
      events: sortEvents(mockGardenEvents),
    };
    this.storage.save(seededState);
    return seededState;
  }

  save(state: GardenState): GardenState {
    const sortedState: GardenState = {
      entries: sortEntries(state.entries),
      events: sortEvents(state.events),
    };
    this.storage.save(sortedState);
    return sortedState;
  }

  addEntry(current: GardenState, input: NewGardenEntryInput): GardenState {
    const nextEntry: GardenEntry = {
      id: createId("entry"),
      plantSlug: input.plantSlug,
      year: input.year,
      quantity: input.quantity,
      location: input.location,
      startDate: input.startDate,
      endDate: input.endDate,
      notes: input.notes,
    };

    return this.save({
      ...current,
      entries: [...current.entries, nextEntry],
    });
  }

  addEvent(current: GardenState, input: NewGardenEventInput): GardenState {
    const nextEvent: GardenEvent = {
      id: createId("event"),
      gardenEntryId: input.gardenEntryId,
      type: input.type,
      date: input.date,
      note: input.note,
      value: input.value,
      unit: input.unit,
    };

    return this.save({
      ...current,
      events: [...current.events, nextEvent],
    });
  }
}

