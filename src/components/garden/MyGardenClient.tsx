"use client";

import { useMemo, useState } from "react";

import type { GardenEventType, GardenValueUnit } from "@/data/garden";
import type { GardenEvent } from "@/data/garden/types";
import {
  GardenService,
  createLocalGardenStorage,
  getEventsForGardenEntry,
} from "@/lib/garden";
import type { GardenState } from "@/lib/garden";

type PlantOption = {
  slug: string;
  name: string;
};

type MyGardenClientProps = {
  plantOptions: PlantOption[];
};

type EntryFormState = {
  plantSlug: string;
  year: string;
  quantity: string;
  location: string;
  startDate: string;
  endDate: string;
  notes: string;
};

type EventFormState = {
  type: GardenEventType;
  date: string;
  note: string;
  value: string;
  unit: GardenValueUnit | "";
};

const EVENT_TYPE_OPTIONS: Array<{ value: GardenEventType; label: string }> = [
  { value: "vorzucht", label: "Vorzucht" },
  { value: "aussaat", label: "Aussaat" },
  { value: "auspflanzen", label: "Auspflanzen" },
  { value: "duengen", label: "Duengen" },
  { value: "erste_ernte", label: "Erste Ernte" },
  { value: "letzte_ernte", label: "Letzte Ernte" },
  { value: "notiz", label: "Notiz" },
];

const UNIT_OPTIONS: GardenValueUnit[] = ["kg", "g", "stueck", "l", "ml"];

function getTodayISODate() {
  return new Date().toISOString().slice(0, 10);
}

function createInitialEntryForm(plantSlug: string): EntryFormState {
  return {
    plantSlug,
    year: String(new Date().getFullYear()),
    quantity: "",
    location: "",
    startDate: getTodayISODate(),
    endDate: "",
    notes: "",
  };
}

function createInitialEventForm(): EventFormState {
  return {
    type: "notiz",
    date: getTodayISODate(),
    note: "",
    value: "",
    unit: "",
  };
}

function toOptionalNumber(value: string) {
  if (!value.trim()) {
    return undefined;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function toOptionalText(value: string) {
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

function formatDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return date;
  }
  return new Intl.DateTimeFormat("de-DE").format(parsed);
}

function getEventTypeLabel(type: string) {
  const found = EVENT_TYPE_OPTIONS.find((option) => option.value === type);
  return found?.label ?? type;
}

export function MyGardenClient({ plantOptions }: MyGardenClientProps) {
  const service = useMemo(
    () => new GardenService(createLocalGardenStorage()),
    [],
  );

  const plantNameBySlug = useMemo(
    () => Object.fromEntries(plantOptions.map((plant) => [plant.slug, plant.name])),
    [plantOptions],
  );

  const [gardenState, setGardenState] = useState<GardenState>(() => {
    if (typeof window === "undefined") {
      return { entries: [], events: [] };
    }
    return service.load();
  });
  const [entryForm, setEntryForm] = useState<EntryFormState>(
    createInitialEntryForm(plantOptions[0]?.slug ?? ""),
  );
  const [eventForms, setEventForms] = useState<Record<string, EventFormState>>({});

  function handleEntrySubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!entryForm.plantSlug || !entryForm.startDate) {
      return;
    }

    const year = Number(entryForm.year);
    if (!Number.isFinite(year)) {
      return;
    }

    setGardenState((current) =>
      service.addEntry(current, {
        plantSlug: entryForm.plantSlug,
        year,
        quantity: toOptionalNumber(entryForm.quantity),
        location: toOptionalText(entryForm.location),
        startDate: entryForm.startDate,
        endDate: toOptionalText(entryForm.endDate),
        notes: toOptionalText(entryForm.notes),
      }),
    );

    setEntryForm(createInitialEntryForm(entryForm.plantSlug));
  }

  function getEventForm(entryId: string) {
    return eventForms[entryId] ?? createInitialEventForm();
  }

  function updateEventForm(entryId: string, patch: Partial<EventFormState>) {
    setEventForms((current) => ({
      ...current,
      [entryId]: { ...getEventForm(entryId), ...patch },
    }));
  }

  function handleEventSubmit(
    event: React.FormEvent<HTMLFormElement>,
    gardenEntryId: string,
  ) {
    event.preventDefault();
    const form = getEventForm(gardenEntryId);
    if (!form.date) {
      return;
    }

    setGardenState((current) =>
      service.addEvent(current, {
        gardenEntryId,
        type: form.type,
        date: form.date,
        note: toOptionalText(form.note),
        value: toOptionalNumber(form.value),
        unit: form.unit || undefined,
      }),
    );

    setEventForms((current) => ({
      ...current,
      [gardenEntryId]: createInitialEventForm(),
    }));
  }

  return (
    <div className="space-y-7 pb-8">
      <section className="max-w-3xl space-y-5 py-8 md:py-10">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl">
          Mein Garten
        </h1>
        <p className="text-base leading-8 text-zinc-600 md:text-lg">
          Hier dokumentierst du deine realen Kulturen, Zeitraeume und
          Beobachtungen. Die Stammdaten der Pflanzen bleiben zentral, waehrend
          dieser Bereich nur deine persoenlichen Eintraege speichert.
        </p>
      </section>

      <section className="space-y-4 rounded-2xl border border-emerald-900/10 bg-white/60 p-5 md:p-6">
        <h2 className="text-xl font-semibold text-zinc-900">Neuen Eintrag anlegen</h2>

        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleEntrySubmit}>
          <label className="space-y-1.5">
            <span className="text-sm font-medium text-zinc-700">Pflanze</span>
            <select
              value={entryForm.plantSlug}
              onChange={(e) =>
                setEntryForm((current) => ({ ...current, plantSlug: e.target.value }))
              }
              className="w-full rounded-lg border border-emerald-900/15 bg-white px-3 py-2 text-sm text-zinc-800 outline-none ring-emerald-700/30 focus:ring-2"
              required
            >
              {plantOptions.map((plant) => (
                <option key={plant.slug} value={plant.slug}>
                  {plant.name}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-1.5">
            <span className="text-sm font-medium text-zinc-700">Jahr</span>
            <input
              type="number"
              value={entryForm.year}
              onChange={(e) =>
                setEntryForm((current) => ({ ...current, year: e.target.value }))
              }
              className="w-full rounded-lg border border-emerald-900/15 bg-white px-3 py-2 text-sm text-zinc-800 outline-none ring-emerald-700/30 focus:ring-2"
              required
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-sm font-medium text-zinc-700">Anzahl (optional)</span>
            <input
              type="number"
              value={entryForm.quantity}
              onChange={(e) =>
                setEntryForm((current) => ({ ...current, quantity: e.target.value }))
              }
              className="w-full rounded-lg border border-emerald-900/15 bg-white px-3 py-2 text-sm text-zinc-800 outline-none ring-emerald-700/30 focus:ring-2"
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-sm font-medium text-zinc-700">Standort (optional)</span>
            <input
              type="text"
              value={entryForm.location}
              onChange={(e) =>
                setEntryForm((current) => ({ ...current, location: e.target.value }))
              }
              className="w-full rounded-lg border border-emerald-900/15 bg-white px-3 py-2 text-sm text-zinc-800 outline-none ring-emerald-700/30 focus:ring-2"
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-sm font-medium text-zinc-700">Startdatum</span>
            <input
              type="date"
              value={entryForm.startDate}
              onChange={(e) =>
                setEntryForm((current) => ({ ...current, startDate: e.target.value }))
              }
              className="w-full rounded-lg border border-emerald-900/15 bg-white px-3 py-2 text-sm text-zinc-800 outline-none ring-emerald-700/30 focus:ring-2"
              required
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-sm font-medium text-zinc-700">Enddatum (optional)</span>
            <input
              type="date"
              value={entryForm.endDate}
              onChange={(e) =>
                setEntryForm((current) => ({ ...current, endDate: e.target.value }))
              }
              className="w-full rounded-lg border border-emerald-900/15 bg-white px-3 py-2 text-sm text-zinc-800 outline-none ring-emerald-700/30 focus:ring-2"
            />
          </label>

          <label className="space-y-1.5 md:col-span-2">
            <span className="text-sm font-medium text-zinc-700">Notiz (optional)</span>
            <textarea
              value={entryForm.notes}
              onChange={(e) =>
                setEntryForm((current) => ({ ...current, notes: e.target.value }))
              }
              className="min-h-24 w-full rounded-lg border border-emerald-900/15 bg-white px-3 py-2 text-sm text-zinc-800 outline-none ring-emerald-700/30 focus:ring-2"
            />
          </label>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-800"
            >
              Eintrag speichern
            </button>
          </div>
        </form>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-zinc-900">Garten-Eintraege</h2>

        {gardenState.entries.length === 0 ? (
          <p className="rounded-xl border border-emerald-900/10 bg-white/60 px-4 py-3 text-sm text-zinc-600">
            Noch keine Eintraege vorhanden. Lege oben deinen ersten Eintrag an.
          </p>
        ) : (
          <div className="space-y-4">
            {gardenState.entries.map((entry) => {
              const events = getEventsForGardenEntry(entry.id, gardenState.events);
              const form = getEventForm(entry.id);

              return (
                <article
                  key={entry.id}
                  className="space-y-4 rounded-2xl border border-emerald-900/10 bg-white/60 p-5"
                >
                  <header className="space-y-1">
                    <h3 className="text-lg font-semibold text-zinc-900">
                      {plantNameBySlug[entry.plantSlug] ?? entry.plantSlug}
                    </h3>
                    <p className="text-sm text-zinc-600">Jahr {entry.year}</p>
                  </header>

                  <dl className="grid gap-2 text-sm text-zinc-700 md:grid-cols-2">
                    <div>
                      <dt className="font-medium text-zinc-500">Anzahl</dt>
                      <dd>{entry.quantity ?? "–"}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-zinc-500">Standort</dt>
                      <dd>{entry.location ?? "–"}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-zinc-500">Startdatum</dt>
                      <dd>{formatDate(entry.startDate)}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-zinc-500">Enddatum</dt>
                      <dd>{entry.endDate ? formatDate(entry.endDate) : "Offen"}</dd>
                    </div>
                    <div className="md:col-span-2">
                      <dt className="font-medium text-zinc-500">Notizen</dt>
                      <dd>{entry.notes ?? "–"}</dd>
                    </div>
                  </dl>

                  <section className="space-y-3 rounded-xl border border-emerald-900/10 bg-white/70 p-4">
                    <h4 className="text-sm font-semibold uppercase tracking-[0.08em] text-zinc-600">
                      Journal
                    </h4>

                    {events.length === 0 ? (
                      <p className="text-sm text-zinc-600">
                        Noch keine Events zu diesem Eintrag.
                      </p>
                    ) : (
                      <ul className="space-y-2">
                        {events.map((eventItem: GardenEvent) => (
                          <li
                            key={eventItem.id}
                            className="rounded-lg border border-emerald-900/10 bg-white px-3 py-2 text-sm text-zinc-700"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span className="font-medium text-zinc-800">
                                {getEventTypeLabel(eventItem.type)}
                              </span>
                              <span className="text-xs text-zinc-500">
                                {formatDate(eventItem.date)}
                              </span>
                            </div>
                            {(eventItem.note ||
                              eventItem.value !== undefined ||
                              eventItem.unit) && (
                              <p className="mt-1 text-xs leading-6 text-zinc-600">
                                {eventItem.note ? `${eventItem.note} ` : ""}
                                {eventItem.value !== undefined
                                  ? `Ertrag: ${eventItem.value}${eventItem.unit ? ` ${eventItem.unit}` : ""}`
                                  : ""}
                              </p>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}

                    <form
                      className="grid gap-3 md:grid-cols-2"
                      onSubmit={(e) => handleEventSubmit(e, entry.id)}
                    >
                      <label className="space-y-1.5">
                        <span className="text-xs font-medium uppercase tracking-[0.08em] text-zinc-500">
                          Event-Typ
                        </span>
                        <select
                          value={form.type}
                          onChange={(e) =>
                            updateEventForm(entry.id, {
                              type: e.target.value as GardenEventType,
                            })
                          }
                          className="w-full rounded-lg border border-emerald-900/15 bg-white px-3 py-2 text-sm text-zinc-800 outline-none ring-emerald-700/30 focus:ring-2"
                        >
                          {EVENT_TYPE_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </label>

                      <label className="space-y-1.5">
                        <span className="text-xs font-medium uppercase tracking-[0.08em] text-zinc-500">
                          Datum
                        </span>
                        <input
                          type="date"
                          value={form.date}
                          onChange={(e) =>
                            updateEventForm(entry.id, { date: e.target.value })
                          }
                          className="w-full rounded-lg border border-emerald-900/15 bg-white px-3 py-2 text-sm text-zinc-800 outline-none ring-emerald-700/30 focus:ring-2"
                          required
                        />
                      </label>

                      <label className="space-y-1.5 md:col-span-2">
                        <span className="text-xs font-medium uppercase tracking-[0.08em] text-zinc-500">
                          Notiz (optional)
                        </span>
                        <input
                          type="text"
                          value={form.note}
                          onChange={(e) =>
                            updateEventForm(entry.id, { note: e.target.value })
                          }
                          className="w-full rounded-lg border border-emerald-900/15 bg-white px-3 py-2 text-sm text-zinc-800 outline-none ring-emerald-700/30 focus:ring-2"
                        />
                      </label>

                      <label className="space-y-1.5">
                        <span className="text-xs font-medium uppercase tracking-[0.08em] text-zinc-500">
                          Wert (optional)
                        </span>
                        <input
                          type="number"
                          step="0.01"
                          value={form.value}
                          onChange={(e) =>
                            updateEventForm(entry.id, { value: e.target.value })
                          }
                          className="w-full rounded-lg border border-emerald-900/15 bg-white px-3 py-2 text-sm text-zinc-800 outline-none ring-emerald-700/30 focus:ring-2"
                        />
                      </label>

                      <label className="space-y-1.5">
                        <span className="text-xs font-medium uppercase tracking-[0.08em] text-zinc-500">
                          Einheit (optional)
                        </span>
                        <select
                          value={form.unit}
                          onChange={(e) =>
                            updateEventForm(entry.id, {
                              unit: e.target.value as GardenValueUnit | "",
                            })
                          }
                          className="w-full rounded-lg border border-emerald-900/15 bg-white px-3 py-2 text-sm text-zinc-800 outline-none ring-emerald-700/30 focus:ring-2"
                        >
                          <option value="">–</option>
                          {UNIT_OPTIONS.map((unit) => (
                            <option key={unit} value={unit}>
                              {unit}
                            </option>
                          ))}
                        </select>
                      </label>

                      <div className="md:col-span-2">
                        <button
                          type="submit"
                          className="rounded-lg border border-emerald-800/20 bg-emerald-700/90 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                        >
                          Event speichern
                        </button>
                      </div>
                    </form>
                  </section>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
