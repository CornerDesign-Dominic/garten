"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { uiDe } from "@/content/ui/de";
import type { GardenEvent, GardenStartType, GardenValueUnit } from "@/data/garden";
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

type HeaderFormState = {
  reference: string;
  sunExposure: string;
  place: string;
  growingType: string;
  amount: string;
  startDate: string;
  endDate: string;
  startType: GardenStartType;
};

type FertilizerFormState = {
  date: string;
  note: string;
};

type HarvestFormState = {
  type: "erste_ernte" | "letzte_ernte";
  date: string;
  value: string;
  unit: GardenValueUnit | "";
  note: string;
};

type NoteFormState = {
  date: string;
  note: string;
};

const T = uiDe.garden.detail;
const C = uiDe.common;
const UNIT_OPTIONS: Array<{ value: GardenValueUnit; label: string }> = [
  { value: "kg", label: "kg" },
  { value: "g", label: "g" },
  { value: "stueck", label: "Stück" },
  { value: "l", label: "l" },
  { value: "ml", label: "ml" },
];

function getTodayISODate() {
  return new Date().toISOString().slice(0, 10);
}

function formatDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return date;
  }
  return new Intl.DateTimeFormat("de-DE").format(parsed);
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

function unitLabel(unit?: string) {
  if (!unit) {
    return "";
  }
  const found = UNIT_OPTIONS.find((option) => option.value === unit);
  return found?.label ?? unit;
}

function formatValueWithUnit(value?: number, unit?: string) {
  if (value === undefined) {
    return "";
  }
  return `${value}${unit ? ` ${unitLabel(unit)}` : ""}`;
}

function sortEventsByDateAsc(events: GardenEvent[]) {
  return [...events].sort((a, b) => a.date.localeCompare(b.date));
}

function buildHeaderForm(entry: {
  reference?: string;
  sunExposure?: string;
  place?: string;
  growingType?: string;
  amount?: string;
  startDate: string;
  endDate?: string;
  startType?: GardenStartType;
}): HeaderFormState {
  return {
    reference: entry.reference ?? "",
    sunExposure: entry.sunExposure ?? "",
    place: entry.place ?? "",
    growingType: entry.growingType ?? "",
    amount: entry.amount ?? "",
    startDate: entry.startDate,
    endDate: entry.endDate ?? "",
    startType: entry.startType ?? "vorzucht",
  };
}

export function GardenEntryDetailClient({
  entryId,
  plantOptions,
}: GardenEntryDetailClientProps) {
  const service = useMemo(() => new GardenService(createLocalGardenStorage()), []);

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

  const [headerForm, setHeaderForm] = useState<HeaderFormState | null>(null);
  const [fertilizerForm, setFertilizerForm] = useState<FertilizerFormState>({
    date: getTodayISODate(),
    note: "",
  });
  const [harvestForm, setHarvestForm] = useState<HarvestFormState>({
    type: "erste_ernte",
    date: getTodayISODate(),
    value: "",
    unit: "",
    note: "",
  });
  const [noteForm, setNoteForm] = useState<NoteFormState>({
    date: getTodayISODate(),
    note: "",
  });

  useEffect(() => {
    if (!entry) {
      return;
    }
    setHeaderForm(buildHeaderForm(entry));
  }, [entry]);

  if (!entry) {
    return (
      <section className="ui-surface space-y-4 p-6">
        <h1 className="text-2xl font-semibold text-[var(--ink-strong)]">{T.notFoundTitle}</h1>
        <p className="text-sm text-[var(--ink-soft)]">
          {T.notFoundText}
        </p>
        <Link
          href="/mein-garten"
          className="ui-focus inline-flex rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 focus-visible:ring-offset-[var(--paper)]"
        >
          {C.backToMyGarden}
        </Link>
      </section>
    );
  }

  if (!headerForm) {
    return null;
  }

  const resolvedEntry = entry;
  const resolvedEntryId = resolvedEntry.id;
  const events = getEventsForGardenEntry(resolvedEntryId, gardenState.events);

  const startInfoEvents = sortEventsByDateAsc(
    events.filter(
      (eventItem) =>
        eventItem.type === "vorzucht" ||
        eventItem.type === "aussaat" ||
        eventItem.type === "auspflanzen",
    ),
  );

  const fertilizerEvents = sortEventsByDateAsc(
    events.filter((eventItem) => eventItem.type === "duengen"),
  );

  const harvestEvents = sortEventsByDateAsc(
    events.filter(
      (eventItem) =>
        eventItem.type === "erste_ernte" || eventItem.type === "letzte_ernte",
    ),
  );

  const noteEvents = sortEventsByDateAsc(
    events.filter((eventItem) => eventItem.type === "notiz"),
  );

  const firstHarvest = harvestEvents.find((item) => item.type === "erste_ernte");
  const lastHarvest = [...harvestEvents]
    .reverse()
    .find((item) => item.type === "letzte_ernte");

  const harvestTotals = harvestEvents.reduce<Record<string, number>>((acc, eventItem) => {
    if (eventItem.value === undefined) {
      return acc;
    }
    const key = eventItem.unit ?? "";
    acc[key] = (acc[key] ?? 0) + eventItem.value;
    return acc;
  }, {});

  function patchEntry(patch: Partial<HeaderFormState>) {
    if (!headerForm) {
      return;
    }

    const currentHeader = headerForm;

    setGardenState((current) =>
      service.updateEntry(current, resolvedEntryId, {
        reference:
          patch.reference !== undefined
            ? toOptionalText(patch.reference)
            : toOptionalText(currentHeader.reference),
        sunExposure:
          patch.sunExposure !== undefined
            ? toOptionalText(patch.sunExposure)
            : toOptionalText(currentHeader.sunExposure),
        place:
          patch.place !== undefined
            ? toOptionalText(patch.place)
            : toOptionalText(currentHeader.place),
        growingType:
          patch.growingType !== undefined
            ? toOptionalText(patch.growingType)
            : toOptionalText(currentHeader.growingType),
        amount:
          patch.amount !== undefined
            ? toOptionalText(patch.amount)
            : toOptionalText(currentHeader.amount),
        startDate: patch.startDate ?? currentHeader.startDate,
        endDate:
          patch.endDate !== undefined
            ? toOptionalText(patch.endDate)
            : toOptionalText(currentHeader.endDate),
        startType: patch.startType ?? currentHeader.startType,
      }),
    );
  }

  function handleSaveHeader(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!headerForm || !headerForm.startDate) {
      return;
    }
    patchEntry({});
  }

  function handleAddFertilizer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!fertilizerForm.date) {
      return;
    }

    setGardenState((current) =>
      service.addEvent(current, {
        gardenEntryId: resolvedEntryId,
        type: "duengen",
        date: fertilizerForm.date,
        note: toOptionalText(fertilizerForm.note),
      }),
    );

    setFertilizerForm({ date: getTodayISODate(), note: "" });
  }

  function handleAddHarvest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!harvestForm.date) {
      return;
    }

    setGardenState((current) =>
      service.addEvent(current, {
        gardenEntryId: resolvedEntryId,
        type: harvestForm.type,
        date: harvestForm.date,
        value: toOptionalNumber(harvestForm.value),
        unit: harvestForm.unit || undefined,
        note: toOptionalText(harvestForm.note),
      }),
    );

    setHarvestForm({
      type: "erste_ernte",
      date: getTodayISODate(),
      value: "",
      unit: "",
      note: "",
    });
  }

  function handleAddNote(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!noteForm.date || !noteForm.note.trim()) {
      return;
    }

    setGardenState((current) =>
      service.addEvent(current, {
        gardenEntryId: resolvedEntryId,
        type: "notiz",
        date: noteForm.date,
        note: toOptionalText(noteForm.note),
      }),
    );

    setNoteForm({ date: getTodayISODate(), note: "" });
  }

  return (
    <div className="pb-10">
      <section className="ui-page-head">
        <Link
          href="/mein-garten"
          className="ui-focus inline-flex text-sm font-medium text-emerald-800 hover:text-emerald-700 focus-visible:ring-offset-[var(--paper)]"
        >
          {C.backToMyGarden}
        </Link>

        <h1 className="ui-page-title">
          {plantNameBySlug[resolvedEntry.plantSlug] ?? resolvedEntry.plantSlug}
        </h1>

        <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          <div className="ui-surface space-y-1.5 p-4 md:p-5">
            <div className="grid grid-cols-[12rem_1fr] gap-3 py-1.5 text-sm">
              <dt className="font-medium text-[var(--ink-soft)]">{T.fields.reference}</dt>
              <dd className="text-[var(--ink-strong)]">{resolvedEntry.reference ?? C.notAvailable}</dd>
            </div>
            <div className="grid grid-cols-[12rem_1fr] gap-3 py-1.5 text-sm">
              <dt className="font-medium text-[var(--ink-soft)]">{T.fields.location}</dt>
              <dd className="text-[var(--ink-strong)]">{resolvedEntry.sunExposure ?? C.notAvailable}</dd>
            </div>
            <div className="grid grid-cols-[12rem_1fr] gap-3 py-1.5 text-sm">
              <dt className="font-medium text-[var(--ink-soft)]">{T.fields.typeVessel}</dt>
              <dd className="text-[var(--ink-strong)]">{resolvedEntry.growingType ?? C.notAvailable}</dd>
            </div>
            <div className="grid grid-cols-[12rem_1fr] gap-3 py-1.5 text-sm">
              <dt className="font-medium text-[var(--ink-soft)]">{T.fields.place}</dt>
              <dd className="text-[var(--ink-strong)]">{resolvedEntry.place ?? C.notAvailable}</dd>
            </div>
            <div className="grid grid-cols-[12rem_1fr] gap-3 py-1.5 text-sm">
              <dt className="font-medium text-[var(--ink-soft)]">{T.fields.amount}</dt>
              <dd className="text-[var(--ink-strong)]">{resolvedEntry.amount ?? C.notAvailable}</dd>
            </div>
            <div className="grid grid-cols-[12rem_1fr] gap-3 py-1.5 text-sm">
              <dt className="font-medium text-[var(--ink-soft)]">{T.fields.startDate}</dt>
              <dd className="text-[var(--ink-strong)]">{formatDate(resolvedEntry.startDate)}</dd>
            </div>
            <div className="grid grid-cols-[12rem_1fr] gap-3 py-1.5 text-sm">
              <dt className="font-medium text-[var(--ink-soft)]">{T.fields.endDate}</dt>
              <dd className="text-[var(--ink-strong)]">
                {resolvedEntry.endDate ? formatDate(resolvedEntry.endDate) : C.active}
              </dd>
            </div>
            <div className="grid grid-cols-[12rem_1fr] gap-3 py-1.5 text-sm">
              <dt className="font-medium text-[var(--ink-soft)]">{T.fields.startType}</dt>
              <dd className="text-[var(--ink-strong)]">
                {resolvedEntry.startType === "direktaussaat"
                  ? uiDe.garden.startType.direktaussaat
                  : uiDe.garden.startType.vorzucht}
              </dd>
            </div>
          </div>

          <form
            className="ui-surface space-y-2 p-4"
            onSubmit={handleSaveHeader}
          >
            <h2 className="ui-label">
              {T.baseAdjustTitle}
            </h2>
            <div className="grid gap-2 sm:grid-cols-2">
              <input
                type="text"
                value={headerForm.reference}
                onChange={(e) =>
                  setHeaderForm((current) =>
                    current ? { ...current, reference: e.target.value } : current,
                  )
                }
                placeholder={T.fields.reference}
                className="ui-input"
              />
              <input
                type="text"
                value={headerForm.sunExposure}
                onChange={(e) =>
                  setHeaderForm((current) =>
                    current ? { ...current, sunExposure: e.target.value } : current,
                  )
                }
                placeholder={T.fields.location}
                className="ui-input"
              />
              <input
                type="text"
                value={headerForm.growingType}
                onChange={(e) =>
                  setHeaderForm((current) =>
                    current ? { ...current, growingType: e.target.value } : current,
                  )
                }
                placeholder={T.fields.typeVessel}
                className="ui-input"
              />
              <input
                type="text"
                value={headerForm.place}
                onChange={(e) =>
                  setHeaderForm((current) =>
                    current ? { ...current, place: e.target.value } : current,
                  )
                }
                placeholder={T.fields.place}
                className="ui-input"
              />
              <input
                type="text"
                value={headerForm.amount}
                onChange={(e) =>
                  setHeaderForm((current) =>
                    current ? { ...current, amount: e.target.value } : current,
                  )
                }
                placeholder={T.fields.amount}
                className="ui-input"
              />
              <select
                value={headerForm.startType}
                onChange={(e) =>
                  setHeaderForm((current) =>
                    current
                      ? { ...current, startType: e.target.value as GardenStartType }
                      : current,
                  )
                }
                className="ui-input"
              >
                <option value="vorzucht">{uiDe.garden.startType.vorzucht}</option>
                <option value="direktaussaat">{uiDe.garden.startType.direktaussaat}</option>
              </select>
              <input
                type="date"
                value={headerForm.startDate}
                onChange={(e) =>
                  setHeaderForm((current) =>
                    current ? { ...current, startDate: e.target.value } : current,
                  )
                }
                className="ui-input"
                required
              />
              <input
                type="date"
                value={headerForm.endDate}
                onChange={(e) =>
                  setHeaderForm((current) =>
                    current ? { ...current, endDate: e.target.value } : current,
                  )
                }
                className="ui-input"
              />
            </div>

            <div>
              <button
                type="submit"
                className="rounded-lg border border-emerald-800/20 bg-emerald-700/90 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
              >
                {T.saveChanges}
              </button>
            </div>
          </form>
        </div>

        {startInfoEvents.length > 0 && (
          <div className="ui-divider pb-1 pt-4">
            <p className="ui-label mb-2">
              {T.startInfoTitle}
            </p>
            <ul className="space-y-1.5 text-sm text-[var(--ink)]">
              {startInfoEvents.map((eventItem) => (
                <li key={eventItem.id} className="flex items-center justify-between gap-4">
                  <span className="font-medium text-[var(--ink-strong)]">
                    {eventItem.type === "vorzucht"
                      ? T.startEvents.vorzucht
                      : eventItem.type === "aussaat"
                        ? T.startEvents.aussaat
                        : T.startEvents.auspflanzen}
                  </span>
                  <span>{formatDate(eventItem.date)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section className="ui-divider pt-8">
        <div className="ui-section max-w-4xl">
          <div>
            <h2 className="ui-section-title">
              {T.sectionTitles.fertilizer}
            </h2>
            <p className="ui-section-hint">
              {T.sectionDescriptions.fertilizer}
            </p>
          </div>

          <form className="flex flex-wrap items-end gap-2" onSubmit={handleAddFertilizer}>
            <label className="space-y-1">
              <span className="ui-label">
                {C.date}
              </span>
              <input
                type="date"
                value={fertilizerForm.date}
                onChange={(e) =>
                  setFertilizerForm((current) => ({ ...current, date: e.target.value }))
                }
                className="ui-input"
                required
              />
            </label>

            <label className="min-w-[16rem] flex-1 space-y-1">
              <span className="ui-label">
                {C.noteOptional}
              </span>
              <input
                type="text"
                value={fertilizerForm.note}
                onChange={(e) =>
                  setFertilizerForm((current) => ({ ...current, note: e.target.value }))
                }
                className="ui-input"
                placeholder={T.fertilizer.notePlaceholder}
              />
            </label>

            <button
              type="submit"
              className="rounded-lg border border-emerald-800/20 bg-emerald-700/90 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              {C.add}
            </button>
          </form>

          {fertilizerEvents.length === 0 ? (
            <p className="text-sm text-[var(--ink-soft)]">{T.headValues.fertilizerNone}</p>
          ) : (
            <ul className="ui-list-divider rounded-xl border border-[var(--line-soft)] bg-white/65 px-3">
              {fertilizerEvents.map((eventItem) => (
                <li key={eventItem.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                  <span className="text-[var(--ink-strong)]">{formatDate(eventItem.date)}</span>
                  <span className="text-[var(--ink-soft)]">{eventItem.note ?? ""}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="ui-divider pt-8">
        <div className="ui-section max-w-4xl">
          <div>
            <h2 className="ui-section-title">
              {T.sectionTitles.harvest}
            </h2>
            <p className="ui-section-hint">
              {T.sectionDescriptions.harvest}
            </p>
          </div>

          <div className="grid gap-2 text-sm md:grid-cols-3">
            <div className="ui-subtle-block">
              <p className="ui-label">
                {T.harvest.first}
              </p>
              <p className="font-medium text-[var(--ink-strong)]">
                {firstHarvest ? formatDate(firstHarvest.date) : C.notAvailable}
              </p>
            </div>
            <div className="ui-subtle-block">
              <p className="ui-label">
                {T.harvest.last}
              </p>
              <p className="font-medium text-[var(--ink-strong)]">
                {lastHarvest ? formatDate(lastHarvest.date) : C.notAvailable}
              </p>
            </div>
            <div className="ui-subtle-block">
              <p className="ui-label">
                {T.harvest.total}
              </p>
              <p className="font-medium text-[var(--ink-strong)]">
                {Object.keys(harvestTotals).length === 0
                  ? C.notAvailable
                  : Object.entries(harvestTotals)
                      .map(([unit, value]) => `${value} ${unitLabel(unit)}`.trim())
                      .join(" • ")}
              </p>
            </div>
          </div>

          <form className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5" onSubmit={handleAddHarvest}>
            <select
              value={harvestForm.type}
              onChange={(e) =>
                setHarvestForm((current) => ({
                  ...current,
                  type: e.target.value as "erste_ernte" | "letzte_ernte",
                }))
              }
              className="ui-input"
            >
              <option value="erste_ernte">{T.harvest.first}</option>
              <option value="letzte_ernte">{T.harvest.last}</option>
            </select>
            <input
              type="date"
              value={harvestForm.date}
              onChange={(e) =>
                setHarvestForm((current) => ({ ...current, date: e.target.value }))
              }
              className="ui-input"
              required
            />
            <input
              type="number"
              step="0.01"
              value={harvestForm.value}
              onChange={(e) =>
                setHarvestForm((current) => ({ ...current, value: e.target.value }))
              }
              placeholder={T.fields.amount}
              className="ui-input"
            />
            <select
              value={harvestForm.unit}
              onChange={(e) =>
                setHarvestForm((current) => ({
                  ...current,
                  unit: e.target.value as GardenValueUnit | "",
                }))
              }
              className="ui-input"
            >
              <option value="">{T.harvest.unitPlaceholder}</option>
              {UNIT_OPTIONS.map((unit) => (
                <option key={unit.value} value={unit.value}>
                  {unit.label}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="rounded-lg border border-emerald-800/20 bg-emerald-700/90 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              {C.add}
            </button>
            <input
              type="text"
              value={harvestForm.note}
              onChange={(e) =>
                setHarvestForm((current) => ({ ...current, note: e.target.value }))
              }
              placeholder={C.noteOptional}
              className="ui-input sm:col-span-2 lg:col-span-5"
            />
          </form>

          {harvestEvents.length === 0 ? (
            <p className="text-sm text-[var(--ink-soft)]">{T.headValues.harvestNone}</p>
          ) : (
            <ul className="ui-list-divider rounded-xl border border-[var(--line-soft)] bg-white/65 px-3">
              {harvestEvents.map((eventItem) => (
                <li key={eventItem.id} className="space-y-0.5 py-2.5 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-medium text-[var(--ink-strong)]">
                      {eventItem.type === "erste_ernte" ? T.harvest.first : T.harvest.last}
                    </span>
                    <span className="text-[var(--ink-soft)]">{formatDate(eventItem.date)}</span>
                  </div>
                  <p className="text-[var(--ink-soft)]">
                    {formatValueWithUnit(eventItem.value, eventItem.unit)
                      ? `${T.harvest.yieldPrefix}: ${formatValueWithUnit(eventItem.value, eventItem.unit)}`
                      : ""}
                    {eventItem.note
                      ? `${formatValueWithUnit(eventItem.value, eventItem.unit) ? " • " : ""}${eventItem.note}`
                      : ""}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="ui-divider pt-8">
        <div className="ui-section max-w-4xl">
          <div>
            <h2 className="ui-section-title">
              {T.sectionTitles.internalNotes}
            </h2>
            <p className="ui-section-hint">
              {T.sectionDescriptions.internalNotes}
            </p>
          </div>

          <form className="grid gap-2 sm:grid-cols-[11rem_1fr_auto]" onSubmit={handleAddNote}>
            <input
              type="date"
              value={noteForm.date}
              onChange={(e) =>
                setNoteForm((current) => ({ ...current, date: e.target.value }))
              }
              className="ui-input"
              required
            />
            <textarea
              value={noteForm.note}
              onChange={(e) =>
                setNoteForm((current) => ({ ...current, note: e.target.value }))
              }
              placeholder={T.notes.addPlaceholder}
              className="ui-input min-h-11"
              required
            />
            <button
              type="submit"
              className="h-fit rounded-lg border border-emerald-800/20 bg-emerald-700/90 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              {C.add}
            </button>
          </form>

          {(resolvedEntry.notes || noteEvents.length > 0) ? (
            <ul className="ui-list-divider rounded-xl border border-[var(--line-soft)] bg-white/65 px-3">
              {resolvedEntry.notes && (
                <li className="py-2.5 text-sm">
                  <p className="font-medium text-[var(--ink-strong)]">{T.headValues.headerNote}</p>
                  <p className="text-[var(--ink-soft)]">{resolvedEntry.notes}</p>
                </li>
              )}

              {noteEvents.map((eventItem) => (
                <li key={eventItem.id} className="py-2.5 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-[var(--ink-strong)]">{T.headValues.noteItem}</p>
                    <p className="text-[var(--ink-soft)]">{formatDate(eventItem.date)}</p>
                  </div>
                  <p className="text-[var(--ink-soft)]">{eventItem.note ?? ""}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-[var(--ink-soft)]">{T.headValues.internalNotesNone}</p>
          )}
        </div>
      </section>
    </div>
  );
}
