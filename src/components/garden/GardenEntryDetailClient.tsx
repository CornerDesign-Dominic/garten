"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { GardenEventType, GardenValueUnit } from "@/data/garden";
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

type GardenEntryDetailClientProps = {
  entryId: string;
  plantOptions: PlantOption[];
};

type EntryEditFormState = {
  startDate: string;
  endDate: string;
  place: string;
  growingType: string;
  sunExposure: string;
  reference: string;
  amount: string;
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
  { value: "duengen", label: "Geduengt" },
  { value: "erste_ernte", label: "Erste Ernte" },
  { value: "letzte_ernte", label: "Letzte Ernte" },
  { value: "standortwechsel", label: "Standortwechsel" },
  { value: "notiz", label: "Notiz" },
];

const UNIT_OPTIONS: GardenValueUnit[] = ["kg", "g", "stueck", "l", "ml"];

function getTodayISODate() {
  return new Date().toISOString().slice(0, 10);
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

function toOptionalText(value: string) {
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

function toOptionalNumber(value: string) {
  if (!value.trim()) {
    return undefined;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function formatDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return date;
  }
  return new Intl.DateTimeFormat("de-DE").format(parsed);
}

function eventTypeLabel(type: string) {
  const found = EVENT_TYPE_OPTIONS.find((option) => option.value === type);
  return found?.label ?? type;
}

export function GardenEntryDetailClient({
  entryId,
  plantOptions,
}: GardenEntryDetailClientProps) {
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

  const entry = useMemo(
    () => gardenState.entries.find((item) => item.id === entryId),
    [entryId, gardenState.entries],
  );

  const [eventForm, setEventForm] = useState<EventFormState>(createInitialEventForm());
  const [editForm, setEditForm] = useState<EntryEditFormState>(() => ({
    startDate: entry?.startDate ?? getTodayISODate(),
    endDate: entry?.endDate ?? "",
    place: entry?.place ?? "",
    growingType: entry?.growingType ?? "",
    sunExposure: entry?.sunExposure ?? "",
    reference: entry?.reference ?? "",
    amount: entry?.amount ?? "",
    notes: entry?.notes ?? "",
  }));

  if (!entry) {
    return (
      <section className="space-y-4 rounded-2xl border border-emerald-900/10 bg-white/60 p-6">
        <h1 className="text-2xl font-semibold text-zinc-900">Eintrag nicht gefunden</h1>
        <p className="text-sm text-zinc-600">
          Dieser Garten-Eintrag ist lokal nicht vorhanden.
        </p>
        <Link
          href="/mein-garten"
          className="inline-flex rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-800"
        >
          Zurueck zu Mein Garten
        </Link>
      </section>
    );
  }

  const events = getEventsForGardenEntry(entry.id, gardenState.events);

  function handleSaveEntry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editForm.startDate) {
      return;
    }

    setGardenState((current) =>
      service.updateEntry(current, entry.id, {
        startDate: editForm.startDate,
        endDate: toOptionalText(editForm.endDate),
        place: toOptionalText(editForm.place),
        growingType: toOptionalText(editForm.growingType),
        sunExposure: toOptionalText(editForm.sunExposure),
        reference: toOptionalText(editForm.reference),
        amount: toOptionalText(editForm.amount),
        notes: toOptionalText(editForm.notes),
      }),
    );
  }

  function handleAddEvent(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!eventForm.date) {
      return;
    }

    setGardenState((current) =>
      service.addEvent(current, {
        gardenEntryId: entry.id,
        type: eventForm.type,
        date: eventForm.date,
        note: toOptionalText(eventForm.note),
        value: toOptionalNumber(eventForm.value),
        unit: eventForm.unit || undefined,
      }),
    );

    setEventForm(createInitialEventForm());
  }

  return (
    <div className="space-y-6 pb-8">
      <section className="space-y-2 py-8 md:py-10">
        <Link
          href="/mein-garten"
          className="inline-flex text-sm font-medium text-emerald-800 hover:text-emerald-700"
        >
          Zurueck zu Mein Garten
        </Link>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl">
          {plantNameBySlug[entry.plantSlug] ?? entry.plantSlug}
        </h1>
        <p className="text-base text-zinc-600">
          Start: {formatDate(entry.startDate)}
          {entry.endDate ? ` • Ende: ${formatDate(entry.endDate)}` : " • Aktiv"}
        </p>
      </section>

      <section className="space-y-4 rounded-2xl border border-emerald-900/10 bg-white/60 p-5 md:p-6">
        <h2 className="text-xl font-semibold text-zinc-900">Eintrag bearbeiten</h2>

        <form className="grid gap-3 md:grid-cols-2" onSubmit={handleSaveEntry}>
          <label className="space-y-1.5">
            <span className="text-xs font-medium uppercase tracking-[0.08em] text-zinc-500">
              Startdatum
            </span>
            <input
              type="date"
              value={editForm.startDate}
              onChange={(e) =>
                setEditForm((current) => ({ ...current, startDate: e.target.value }))
              }
              className="w-full rounded-lg border border-emerald-900/15 bg-white px-3 py-2 text-sm text-zinc-800 outline-none ring-emerald-700/30 focus:ring-2"
              required
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-xs font-medium uppercase tracking-[0.08em] text-zinc-500">
              Enddatum
            </span>
            <input
              type="date"
              value={editForm.endDate}
              onChange={(e) =>
                setEditForm((current) => ({ ...current, endDate: e.target.value }))
              }
              className="w-full rounded-lg border border-emerald-900/15 bg-white px-3 py-2 text-sm text-zinc-800 outline-none ring-emerald-700/30 focus:ring-2"
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-xs font-medium uppercase tracking-[0.08em] text-zinc-500">
              Ort
            </span>
            <input
              type="text"
              value={editForm.place}
              onChange={(e) =>
                setEditForm((current) => ({ ...current, place: e.target.value }))
              }
              className="w-full rounded-lg border border-emerald-900/15 bg-white px-3 py-2 text-sm text-zinc-800 outline-none ring-emerald-700/30 focus:ring-2"
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-xs font-medium uppercase tracking-[0.08em] text-zinc-500">
              Art / Gefaess
            </span>
            <input
              type="text"
              value={editForm.growingType}
              onChange={(e) =>
                setEditForm((current) => ({ ...current, growingType: e.target.value }))
              }
              className="w-full rounded-lg border border-emerald-900/15 bg-white px-3 py-2 text-sm text-zinc-800 outline-none ring-emerald-700/30 focus:ring-2"
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-xs font-medium uppercase tracking-[0.08em] text-zinc-500">
              Standort
            </span>
            <input
              type="text"
              value={editForm.sunExposure}
              onChange={(e) =>
                setEditForm((current) => ({ ...current, sunExposure: e.target.value }))
              }
              className="w-full rounded-lg border border-emerald-900/15 bg-white px-3 py-2 text-sm text-zinc-800 outline-none ring-emerald-700/30 focus:ring-2"
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-xs font-medium uppercase tracking-[0.08em] text-zinc-500">
              Menge
            </span>
            <input
              type="text"
              value={editForm.amount}
              onChange={(e) =>
                setEditForm((current) => ({ ...current, amount: e.target.value }))
              }
              className="w-full rounded-lg border border-emerald-900/15 bg-white px-3 py-2 text-sm text-zinc-800 outline-none ring-emerald-700/30 focus:ring-2"
            />
          </label>

          <label className="space-y-1.5 md:col-span-2">
            <span className="text-xs font-medium uppercase tracking-[0.08em] text-zinc-500">
              Notiz / Referenz
            </span>
            <input
              type="text"
              value={editForm.reference}
              onChange={(e) =>
                setEditForm((current) => ({ ...current, reference: e.target.value }))
              }
              className="w-full rounded-lg border border-emerald-900/15 bg-white px-3 py-2 text-sm text-zinc-800 outline-none ring-emerald-700/30 focus:ring-2"
            />
          </label>

          <label className="space-y-1.5 md:col-span-2">
            <span className="text-xs font-medium uppercase tracking-[0.08em] text-zinc-500">
              Interne Notiz
            </span>
            <textarea
              value={editForm.notes}
              onChange={(e) =>
                setEditForm((current) => ({ ...current, notes: e.target.value }))
              }
              className="min-h-24 w-full rounded-lg border border-emerald-900/15 bg-white px-3 py-2 text-sm text-zinc-800 outline-none ring-emerald-700/30 focus:ring-2"
            />
          </label>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-800"
            >
              Aenderungen speichern
            </button>
          </div>
        </form>
      </section>

      <section className="space-y-4 rounded-2xl border border-emerald-900/10 bg-white/60 p-5 md:p-6">
        <h2 className="text-xl font-semibold text-zinc-900">Historie / Tagebuch</h2>

        {events.length === 0 ? (
          <p className="text-sm text-zinc-600">
            Noch keine Historieneintraege vorhanden.
          </p>
        ) : (
          <ul className="space-y-2">
            {events.map((eventItem) => (
              <li
                key={eventItem.id}
                className="rounded-lg border border-emerald-900/10 bg-white px-3 py-2 text-sm text-zinc-700"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium text-zinc-800">
                    {eventTypeLabel(eventItem.type)}
                  </span>
                  <span className="text-xs text-zinc-500">
                    {formatDate(eventItem.date)}
                  </span>
                </div>
                {(eventItem.note || eventItem.value !== undefined || eventItem.unit) && (
                  <p className="mt-1 text-xs leading-6 text-zinc-600">
                    {eventItem.note ? `${eventItem.note} ` : ""}
                    {eventItem.value !== undefined
                      ? `Wert: ${eventItem.value}${eventItem.unit ? ` ${eventItem.unit}` : ""}`
                      : ""}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}

        <form className="grid gap-3 md:grid-cols-2" onSubmit={handleAddEvent}>
          <label className="space-y-1.5">
            <span className="text-xs font-medium uppercase tracking-[0.08em] text-zinc-500">
              Event-Typ
            </span>
            <select
              value={eventForm.type}
              onChange={(e) =>
                setEventForm((current) => ({
                  ...current,
                  type: e.target.value as GardenEventType,
                }))
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
              value={eventForm.date}
              onChange={(e) =>
                setEventForm((current) => ({ ...current, date: e.target.value }))
              }
              className="w-full rounded-lg border border-emerald-900/15 bg-white px-3 py-2 text-sm text-zinc-800 outline-none ring-emerald-700/30 focus:ring-2"
              required
            />
          </label>

          <label className="space-y-1.5 md:col-span-2">
            <span className="text-xs font-medium uppercase tracking-[0.08em] text-zinc-500">
              Notiz
            </span>
            <input
              type="text"
              value={eventForm.note}
              onChange={(e) =>
                setEventForm((current) => ({ ...current, note: e.target.value }))
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
              value={eventForm.value}
              onChange={(e) =>
                setEventForm((current) => ({ ...current, value: e.target.value }))
              }
              className="w-full rounded-lg border border-emerald-900/15 bg-white px-3 py-2 text-sm text-zinc-800 outline-none ring-emerald-700/30 focus:ring-2"
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-xs font-medium uppercase tracking-[0.08em] text-zinc-500">
              Einheit (optional)
            </span>
            <select
              value={eventForm.unit}
              onChange={(e) =>
                setEventForm((current) => ({
                  ...current,
                  unit: e.target.value as GardenValueUnit | "",
                }))
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
              Historieneintrag speichern
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

