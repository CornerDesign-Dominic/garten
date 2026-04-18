import type { GardenEntry, GardenEvent, GardenEventType, GardenValueUnit } from "@/data/garden";

import type { GardenState, GardenStorage } from "./storage";

type NewGardenEntryInput = {
  plantSlug: string;
  startDate: string;
  amount?: string;
  place?: string;
  growingType?: string;
  sunExposure?: string;
  reference?: string;
  endDate?: string;
  notes?: string;
};

type UpdateGardenEntryInput = Partial<
  Omit<GardenEntry, "id" | "plantSlug" | "startDate">
> & {
  startDate?: string;
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

    return {
      entries: [],
      events: [],
    };
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
    const startYear = new Date(input.startDate).getFullYear();
    const nextEntry: GardenEntry = {
      id: createId("entry"),
      plantSlug: input.plantSlug,
      year: Number.isFinite(startYear) ? startYear : new Date().getFullYear(),
      startDate: input.startDate,
      amount: input.amount,
      place: input.place,
      growingType: input.growingType,
      sunExposure: input.sunExposure,
      reference: input.reference,
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

  updateEntry(
    current: GardenState,
    entryId: string,
    patch: UpdateGardenEntryInput,
  ): GardenState {
    const updatedEntries = current.entries.map((entry) => {
      if (entry.id !== entryId) {
        return entry;
      }

      const nextStartDate = patch.startDate ?? entry.startDate;
      const nextStartYear = new Date(nextStartDate).getFullYear();

      return {
        ...entry,
        ...patch,
        startDate: nextStartDate,
        year: Number.isFinite(nextStartYear) ? nextStartYear : entry.year,
      };
    });

    return this.save({
      ...current,
      entries: updatedEntries,
    });
  }
}
