"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { uiDe } from "@/content/ui/de";
import type { GardenEvent, GardenStartType } from "@/data/garden";
import {
  GardenService,
  createLocalGardenStorage,
  getEventsForGardenEntry,
  getHarvestYears,
  sumHarvestForYear,
  toHarvestEntries,
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
  date: string;
  quantity: string;
  weightGrams: string;
};

type NoteFormState = {
  note: string;
};

const T = uiDe.garden.detail;
const C = uiDe.common;
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

function formatDateTime(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return date;
  }
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(parsed);
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

function formatShortDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return date;
  }
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  }).format(parsed);
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
    date: getTodayISODate(),
    quantity: "",
    weightGrams: "",
  });
  const [noteForm, setNoteForm] = useState<NoteFormState>({
    note: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedHarvestYear, setSelectedHarvestYear] = useState<number | null>(null);

  useEffect(() => {
    if (!entry) {
      return;
    }
    setHeaderForm(buildHeaderForm(entry));
    setIsEditing(false);
  }, [entry]);

  const resolvedEntry = entry ?? null;
  const resolvedEntryId = resolvedEntry?.id ?? "";
  const events = resolvedEntry
    ? getEventsForGardenEntry(resolvedEntryId, gardenState.events)
    : [];

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

  const noteEvents = [...sortEventsByDateAsc(
    events.filter((eventItem) => eventItem.type === "notiz"),
  )].sort((a, b) => b.date.localeCompare(a.date));

  const harvestEntries = toHarvestEntries(harvestEvents);
  const harvestYears = getHarvestYears(harvestEntries);
  useEffect(() => {
    if (harvestYears.length === 0) {
      setSelectedHarvestYear(null);
      return;
    }

    setSelectedHarvestYear((current) => {
      if (current && harvestYears.includes(current)) {
        return current;
      }
      return harvestYears[harvestYears.length - 1];
    });
  }, [harvestYears]);

  const selectedYearIndex =
    selectedHarvestYear === null ? -1 : harvestYears.indexOf(selectedHarvestYear);
  const canGoToPreviousYear = selectedYearIndex > 0;
  const canGoToNextYear =
    selectedYearIndex >= 0 && selectedYearIndex < harvestYears.length - 1;

  const selectedYearTotals =
    selectedHarvestYear === null
      ? { quantity: 0, weightGrams: 0 }
      : sumHarvestForYear(harvestEntries, selectedHarvestYear);

  const latestHarvestEntries = [...harvestEntries].sort((a, b) =>
    b.date.localeCompare(a.date),
  );
  const latestFiveHarvests = latestHarvestEntries.slice(0, 5);

  if (!resolvedEntry) {
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

  function handleSaveHeader() {
    if (!headerForm || !headerForm.startDate) {
      return;
    }
    patchEntry({});
    setIsEditing(false);
  }

  function handleCancelHeaderEdit() {
    if (!resolvedEntry) {
      return;
    }
    setHeaderForm(buildHeaderForm(resolvedEntry));
    setIsEditing(false);
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

    const parsedQuantity = toOptionalNumber(harvestForm.quantity);
    const parsedWeightGrams = toOptionalNumber(harvestForm.weightGrams);
    if (parsedQuantity === undefined && parsedWeightGrams === undefined) {
      return;
    }

    setGardenState((current) =>
      service.addEvent(current, {
        gardenEntryId: resolvedEntryId,
        type: "erste_ernte",
        date: harvestForm.date,
        quantity: parsedQuantity,
        weightGrams: parsedWeightGrams,
      }),
    );

    setHarvestForm({
      date: getTodayISODate(),
      quantity: "",
      weightGrams: "",
    });
  }

  function handleAddNote(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!noteForm.note.trim()) {
      return;
    }

    setGardenState((current) =>
      service.addEvent(current, {
        gardenEntryId: resolvedEntryId,
        type: "notiz",
        date: new Date().toISOString(),
        note: toOptionalText(noteForm.note),
      }),
    );

    setNoteForm({ note: "" });
  }

  function goToPreviousHarvestYear() {
    if (!canGoToPreviousYear || selectedYearIndex <= 0) {
      return;
    }
    setSelectedHarvestYear(harvestYears[selectedYearIndex - 1]);
  }

  function goToNextHarvestYear() {
    if (!canGoToNextYear || selectedYearIndex < 0) {
      return;
    }
    setSelectedHarvestYear(harvestYears[selectedYearIndex + 1]);
  }

  return (
    <div className="pb-10">
      <section className="space-y-4 py-7 md:py-9">
        <Link
          href="/mein-garten"
          className="ui-focus inline-flex text-sm font-medium text-emerald-800 hover:text-emerald-700 focus-visible:ring-offset-[var(--paper)]"
        >
          {C.backToMyGarden}
        </Link>

        <h1 className="ui-page-title">
          {plantNameBySlug[resolvedEntry.plantSlug] ?? resolvedEntry.plantSlug}
        </h1>

        <div className="grid items-start gap-6 lg:grid-cols-[1fr_auto]">
          <div className="grid gap-x-5 gap-y-2 md:grid-cols-2">
            <div className="space-y-1">
              <dt className="ui-label">{T.fields.reference}</dt>
              {!isEditing ? (
                <dd className="text-sm text-[var(--ink-strong)]">{resolvedEntry.reference ?? C.notAvailable}</dd>
              ) : (
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
              )}
            </div>

            <div className="space-y-1">
              <dt className="ui-label">{T.fields.location}</dt>
              {!isEditing ? (
                <dd className="text-sm text-[var(--ink-strong)]">{resolvedEntry.sunExposure ?? C.notAvailable}</dd>
              ) : (
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
              )}
            </div>

            <div className="space-y-1">
              <dt className="ui-label">{T.fields.typeVessel}</dt>
              {!isEditing ? (
                <dd className="text-sm text-[var(--ink-strong)]">{resolvedEntry.growingType ?? C.notAvailable}</dd>
              ) : (
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
              )}
            </div>

            <div className="space-y-1">
              <dt className="ui-label">{T.fields.place}</dt>
              {!isEditing ? (
                <dd className="text-sm text-[var(--ink-strong)]">{resolvedEntry.place ?? C.notAvailable}</dd>
              ) : (
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
              )}
            </div>

            <div className="space-y-1">
              <dt className="ui-label">{T.fields.amount}</dt>
              {!isEditing ? (
                <dd className="text-sm text-[var(--ink-strong)]">{resolvedEntry.amount ?? C.notAvailable}</dd>
              ) : (
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
              )}
            </div>

            <div className="space-y-1">
              <dt className="ui-label">{T.fields.startType}</dt>
              {!isEditing ? (
                <dd className="text-sm text-[var(--ink-strong)]">
                  {resolvedEntry.startType === "direktaussaat"
                    ? uiDe.garden.startType.direktaussaat
                    : uiDe.garden.startType.vorzucht}
                </dd>
              ) : (
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
              )}
            </div>

            <div className="space-y-1">
              <dt className="ui-label">{T.fields.startDate}</dt>
              {!isEditing ? (
                <dd className="text-sm text-[var(--ink-strong)]">{formatDate(resolvedEntry.startDate)}</dd>
              ) : (
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
              )}
            </div>

            <div className="space-y-1">
              <dt className="ui-label">{T.fields.endDate}</dt>
              {!isEditing ? (
                <dd className="text-sm text-[var(--ink-strong)]">
                  {resolvedEntry.endDate ? formatDate(resolvedEntry.endDate) : C.active}
                </dd>
              ) : (
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
              )}
            </div>
          </div>

          <div className="flex justify-start lg:justify-end">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="ui-focus inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line-soft)] bg-white/70 text-sm text-[var(--ink-soft)] transition-colors hover:border-[var(--line-strong)] hover:text-[var(--ink-strong)] focus-visible:ring-offset-[var(--paper)]"
                aria-label="Stammdaten bearbeiten"
                title="Bearbeiten"
              >
                ✎
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCancelHeaderEdit}
                  className="ui-focus rounded-lg border border-[var(--line-soft)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--ink-soft)] transition-colors hover:border-[var(--line-strong)] hover:text-[var(--ink)] focus-visible:ring-offset-[var(--paper)]"
                >
                  Abbrechen
                </button>
                <button
                  type="button"
                  onClick={handleSaveHeader}
                  className="ui-focus rounded-lg border border-emerald-800/20 bg-emerald-700/90 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-700 focus-visible:ring-offset-[var(--paper)]"
                >
                  Speichern
                </button>
              </div>
            )}
          </div>
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
        <div className="ui-section">
          <div>
            <h2 className="ui-section-title">
              {T.sectionTitles.harvest}
            </h2>
            <p className="ui-section-hint">
              {T.sectionDescriptions.harvest}
            </p>
          </div>

          <div className="rounded-xl border border-[var(--line-soft)] bg-white/55">
            <div className="grid divide-y divide-[var(--line-soft)] lg:grid-cols-3 lg:divide-x lg:divide-y-0">
              <section className="space-y-4 p-4">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={goToPreviousHarvestYear}
                  disabled={!canGoToPreviousYear}
                  className="ui-focus inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line-soft)] bg-white text-sm text-[var(--ink-soft)] transition-colors hover:border-[var(--line-strong)] hover:text-[var(--ink-strong)] disabled:cursor-not-allowed disabled:opacity-35"
                  aria-label="Vorheriges Erntejahr"
                >
                  ‹
                </button>
                <p className="text-base font-semibold text-[var(--ink-strong)]">
                  {selectedHarvestYear ?? C.notAvailable}
                </p>
                <button
                  type="button"
                  onClick={goToNextHarvestYear}
                  disabled={!canGoToNextYear}
                  className="ui-focus inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line-soft)] bg-white text-sm text-[var(--ink-soft)] transition-colors hover:border-[var(--line-strong)] hover:text-[var(--ink-strong)] disabled:cursor-not-allowed disabled:opacity-35"
                  aria-label="Nächstes Erntejahr"
                >
                  ›
                </button>
              </div>

              <div className="space-y-3">
                <p className="ui-label">{T.harvest.totalTitle}</p>
                <div className="space-y-1.5">
                  <p className="text-sm text-[var(--ink)]">
                    <span className="font-semibold text-[var(--ink-strong)]">
                      {selectedYearTotals.quantity}
                    </span>{" "}
                    {T.harvest.totalQuantity}
                  </p>
                  <p className="text-sm text-[var(--ink)]">
                    <span className="font-semibold text-[var(--ink-strong)]">
                      {(selectedYearTotals.weightGrams / 1000).toLocaleString("de-DE", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      })}
                    </span>{" "}
                    {T.harvest.totalWeight}
                  </p>
                </div>
              </div>
              </section>

              <section className="space-y-3 p-4">
              <h3 className="text-base font-semibold text-[var(--ink-strong)]">
                {T.harvest.latestTitle}
              </h3>
              {latestFiveHarvests.length === 0 ? (
                <p className="text-sm text-[var(--ink-soft)]">{T.headValues.harvestNone}</p>
              ) : (
                <ul className="ui-list-divider rounded-lg border border-[var(--line-soft)] bg-white/75 px-3">
                  {latestFiveHarvests.map((entryItem) => (
                    <li key={entryItem.id} className="py-2.5 text-sm text-[var(--ink)]">
                      <span className="font-medium text-[var(--ink-strong)]">
                        {formatShortDate(entryItem.date)}
                      </span>{" "}
                      →{" "}
                      <span>
                        {entryItem.quantity ?? 0} {T.harvest.totalQuantity}
                      </span>{" "}
                      |{" "}
                      <span>
                        {entryItem.weightGrams ?? 0} g
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              </section>

              <section className="space-y-3 p-4">
              <h3 className="text-base font-semibold text-[var(--ink-strong)]">
                {T.harvest.addTitle}
              </h3>

              <form className="space-y-2" onSubmit={handleAddHarvest}>
                <label className="space-y-1">
                  <span className="ui-label">{C.date}</span>
                  <input
                    type="date"
                    value={harvestForm.date}
                    onChange={(e) =>
                      setHarvestForm((current) => ({ ...current, date: e.target.value }))
                    }
                    className="ui-input"
                    required
                  />
                </label>
                <label className="space-y-1">
                  <span className="ui-label">{T.harvest.quantityField}</span>
                  <input
                    type="number"
                    min={0}
                    step="1"
                    value={harvestForm.quantity}
                    onChange={(e) =>
                      setHarvestForm((current) => ({
                        ...current,
                        quantity: e.target.value,
                      }))
                    }
                    className="ui-input"
                    placeholder="0"
                  />
                </label>
                <label className="space-y-1">
                  <span className="ui-label">{T.harvest.weightField}</span>
                  <input
                    type="number"
                    min={0}
                    step="1"
                    value={harvestForm.weightGrams}
                    onChange={(e) =>
                      setHarvestForm((current) => ({
                        ...current,
                        weightGrams: e.target.value,
                      }))
                    }
                    className="ui-input"
                    placeholder="0"
                  />
                </label>
                <button
                  type="submit"
                  className="w-full rounded-lg border border-emerald-800/20 bg-emerald-700/90 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                >
                  {T.harvest.addButton}
                </button>
              </form>
              </section>
            </div>
          </div>
        </div>
      </section>

      <section className="ui-divider pt-8">
        <div className="ui-section max-w-4xl">
          <div>
            <h2 className="ui-section-title">
              Notiz zu {plantNameBySlug[resolvedEntry.plantSlug] ?? resolvedEntry.plantSlug}
            </h2>
            <p className="ui-section-hint">
              {T.sectionDescriptions.internalNotes}
            </p>
          </div>

          <form className="grid gap-2 sm:grid-cols-[1fr_auto]" onSubmit={handleAddNote}>
            <textarea
              value={noteForm.note}
              onChange={(e) =>
                setNoteForm((current) => ({ ...current, note: e.target.value }))
              }
              placeholder={T.notes.addPlaceholder}
              className="ui-input min-h-11"
              maxLength={1000}
              required
            />
            <button
              type="submit"
              className="h-fit rounded-lg border border-emerald-800/20 bg-emerald-700/90 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              {C.add}
            </button>
          </form>
          <p className="ui-meta text-right">
            {noteForm.note.length}/1000
          </p>

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
                    <p className="text-[var(--ink-soft)]">{formatDateTime(eventItem.date)}</p>
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
