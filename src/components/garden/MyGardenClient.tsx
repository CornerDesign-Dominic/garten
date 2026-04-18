"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { uiDe } from "@/content/ui/de";
import type { GardenStartType } from "@/data/garden";
import {
  GardenService,
  buildGardenYearGroups,
  createLocalGardenStorage,
  getEventsForGardenEntry,
  toHarvestEntries,
} from "@/lib/garden";
import type { GardenState } from "@/lib/garden";

type PlantOption = {
  slug: string;
  name: string;
};

type MyGardenClientProps = {
  plantOptions: PlantOption[];
  initialPlantSlug?: string;
};

type EntryFormState = {
  plantSlug: string;
  startType: GardenStartType;
  startDate: string;
  place: string;
  growingType: string;
  reference: string;
  amount: string;
};

const PLACE_OPTIONS = uiDe.garden.overview.options.place;
const GROWING_TYPE_OPTIONS = uiDe.garden.overview.options.growingType;
const T = uiDe.garden.overview;
const C = uiDe.common;

function getTodayISODate() {
  return new Date().toISOString().slice(0, 10);
}

function createInitialEntryForm(defaultPlantSlug: string): EntryFormState {
  return {
    plantSlug: defaultPlantSlug,
    startType: "vorzucht",
    startDate: getTodayISODate(),
    place: "",
    growingType: "",
    reference: "",
    amount: "",
  };
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

export function MyGardenClient({
  plantOptions,
  initialPlantSlug,
}: MyGardenClientProps) {
  const service = useMemo(() => new GardenService(createLocalGardenStorage()), []);

  const plantNameBySlug = useMemo(
    () => Object.fromEntries(plantOptions.map((plant) => [plant.slug, plant.name])),
    [plantOptions],
  );

  const defaultPlantSlug = useMemo(() => {
    if (
      initialPlantSlug &&
      plantOptions.some((plant) => plant.slug === initialPlantSlug)
    ) {
      return initialPlantSlug;
    }
    return plantOptions[0]?.slug ?? "";
  }, [initialPlantSlug, plantOptions]);

  const [gardenState, setGardenState] = useState<GardenState>(() => {
    if (typeof window === "undefined") {
      return { entries: [], events: [] };
    }
    return service.load();
  });

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [entryForm, setEntryForm] = useState<EntryFormState>(
    createInitialEntryForm(defaultPlantSlug),
  );

  const yearGroups = useMemo(
    () => buildGardenYearGroups(gardenState.entries),
    [gardenState.entries],
  );
  const latestHarvestsByEntryId = useMemo(() => {
    const map: Record<
      string,
      Array<{ id: string; date: string; quantity: number; weightGrams: number }>
    > = {};

    for (const entry of gardenState.entries) {
      const harvests = toHarvestEntries(
        getEventsForGardenEntry(entry.id, gardenState.events),
      )
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, 3)
        .map((item) => ({
          id: item.id,
          date: item.date,
          quantity: item.quantity ?? 0,
          weightGrams: item.weightGrams ?? 0,
        }));

      map[entry.id] = harvests;
    }

    return map;
  }, [gardenState.entries, gardenState.events]);

  function handleEntrySubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!entryForm.plantSlug || !entryForm.startDate) {
      return;
    }

    setGardenState((current) =>
      service.addEntry(current, {
        plantSlug: entryForm.plantSlug,
        startType: entryForm.startType,
        startDate: entryForm.startDate,
        place: toOptionalText(entryForm.place),
        growingType: toOptionalText(entryForm.growingType),
        reference: toOptionalText(entryForm.reference),
        amount: toOptionalText(entryForm.amount),
      }),
    );

    setEntryForm(createInitialEntryForm(entryForm.plantSlug));
    setIsAddOpen(false);
  }

  return (
    <div className="space-y-7 pb-8">
      <section className="ui-page-head">
        <h1 className="ui-page-title">{T.title}</h1>
        <p className="ui-page-intro">{T.intro}</p>
      </section>

      <section className="ui-surface p-4 md:p-5">
        <button
          type="button"
          onClick={() => setIsAddOpen((current) => !current)}
          className="ui-focus flex w-full items-center justify-between rounded-xl border border-[var(--line-soft)] bg-white/80 px-4 py-3 text-left text-sm font-semibold text-[var(--ink-strong)] transition-colors hover:border-[var(--line-strong)] hover:bg-white focus-visible:ring-offset-[var(--paper)]"
        >
          <span>{T.addEntryToggle}</span>
          <span className="text-lg leading-none text-emerald-700">
            {isAddOpen ? "−" : "+"}
          </span>
        </button>

        {isAddOpen && (
          <form
            className="mt-4 grid gap-3 md:grid-cols-2"
            onSubmit={handleEntrySubmit}
          >
            <label className="space-y-1.5">
              <span className="ui-label">{T.form.plant}</span>
              <select
                value={entryForm.plantSlug}
                onChange={(e) =>
                  setEntryForm((current) => ({ ...current, plantSlug: e.target.value }))
                }
                className="ui-input"
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
              <span className="ui-label">{T.form.startDate}</span>
              <input
                type="date"
                value={entryForm.startDate}
                onChange={(e) =>
                  setEntryForm((current) => ({ ...current, startDate: e.target.value }))
                }
                className="ui-input"
                required
              />
            </label>

            <label className="space-y-1.5">
              <span className="ui-label">{T.form.startType}</span>
              <select
                value={entryForm.startType}
                onChange={(e) =>
                  setEntryForm((current) => ({
                    ...current,
                    startType: e.target.value as GardenStartType,
                  }))
                }
                className="ui-input"
              >
                <option value="vorzucht">{uiDe.garden.startType.vorzucht}</option>
                <option value="direktaussaat">{uiDe.garden.startType.direktaussaat}</option>
              </select>
            </label>

            <label className="space-y-1.5">
              <span className="ui-label">{T.form.place}</span>
              <select
                value={entryForm.place}
                onChange={(e) =>
                  setEntryForm((current) => ({ ...current, place: e.target.value }))
                }
                className="ui-input"
              >
                <option value="">{T.form.choosePlease}</option>
                {PLACE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-1.5">
              <span className="ui-label">{T.form.vesselType}</span>
              <select
                value={entryForm.growingType}
                onChange={(e) =>
                  setEntryForm((current) => ({
                    ...current,
                    growingType: e.target.value,
                  }))
                }
                className="ui-input"
              >
                <option value="">{T.form.choosePlease}</option>
                {GROWING_TYPE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-1.5">
              <span className="ui-label">{T.form.amount}</span>
              <input
                type="text"
                value={entryForm.amount}
                onChange={(e) =>
                  setEntryForm((current) => ({ ...current, amount: e.target.value }))
                }
                placeholder={T.form.amountPlaceholder}
                className="ui-input"
              />
            </label>

            <label className="space-y-1.5 md:col-span-2">
              <span className="ui-label">{T.form.reference}</span>
              <input
                type="text"
                value={entryForm.reference}
                onChange={(e) =>
                  setEntryForm((current) => ({ ...current, reference: e.target.value }))
                }
                placeholder={T.form.referencePlaceholder}
                className="ui-input"
              />
            </label>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="rounded-lg border border-emerald-800/20 bg-emerald-700/92 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
              >
                {T.saveEntry}
              </button>
            </div>
          </form>
        )}
      </section>

      {yearGroups.length === 0 ? (
        <section className="ui-surface p-5 text-sm text-[var(--ink-soft)]">
          {T.empty}
        </section>
      ) : (
        <section className="space-y-7">
          {yearGroups.map((group) => (
            <div key={group.year} className="space-y-3">
              <h2 className="text-lg font-semibold text-[var(--ink-strong)]">
                {T.yearLabel} {group.year}
              </h2>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {group.cards.map((card) => {
                  const entry = card.entry;

                  return (
                    <Link
                      key={`${group.year}-${entry.id}`}
                      href={`/mein-garten/${entry.id}`}
                      className={`ui-focus block rounded-2xl p-4 transition-all duration-200 ${
                        card.isCompleted
                          ? "ui-card-muted hover:border-zinc-400/50"
                          : "ui-card-interactive"
                      }`}
                    >
                      <div className="mb-3 flex items-center justify-between gap-2">
                        <h3 className="text-base font-semibold text-[var(--ink-strong)]">
                          {plantNameBySlug[entry.plantSlug] ?? entry.plantSlug}
                        </h3>
                        <p className="ui-meta">
                          {T.card.start}: {formatDate(entry.startDate)}
                        </p>
                      </div>

                      <dl className="space-y-1.5 text-sm">
                        <div className="flex items-start justify-between gap-3">
                          <dt className="text-[var(--ink-soft)]">{T.card.reference}</dt>
                          <dd className="text-right text-[var(--ink)]">
                            {entry.reference ?? C.notAvailable}
                          </dd>
                        </div>
                        <div className="flex items-start justify-between gap-3">
                          <dt className="text-[var(--ink-soft)]">{T.card.amount}</dt>
                          <dd className="text-right text-[var(--ink)]">
                            {entry.amount ?? C.notAvailable}
                          </dd>
                        </div>
                        {entry.place && (
                          <div className="flex items-start justify-between gap-3">
                            <dt className="text-[var(--ink-soft)]">{T.card.place}</dt>
                            <dd className="text-right text-[var(--ink)]">{entry.place}</dd>
                          </div>
                        )}
                        {entry.endDate && (
                          <div className="flex items-start justify-between gap-3">
                            <dt className="text-[var(--ink-soft)]">{T.card.end}</dt>
                            <dd className="text-right text-[var(--ink)]">
                              {formatDate(entry.endDate)}
                            </dd>
                          </div>
                        )}
                      </dl>

                      {latestHarvestsByEntryId[entry.id]?.length > 0 && (
                        <div className="mt-3 ui-subtle-block">
                          <p className="ui-label mb-1">{T.card.latestHarvests}</p>
                          <ul className="space-y-0.5">
                            {latestHarvestsByEntryId[entry.id].map((harvestItem) => (
                              <li
                                key={harvestItem.id}
                                className="text-xs text-[var(--ink-soft)]"
                              >
                                {formatShortDate(harvestItem.date)} → {harvestItem.quantity}{" "}
                                Stück | {harvestItem.weightGrams} g
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
