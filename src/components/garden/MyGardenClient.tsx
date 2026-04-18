"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import {
  GardenService,
  buildGardenYearGroups,
  createLocalGardenStorage,
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
  startDate: string;
  place: string;
  growingType: string;
  sunExposure: string;
  reference: string;
  amount: string;
  endDate: string;
};

function getTodayISODate() {
  return new Date().toISOString().slice(0, 10);
}

function createInitialEntryForm(defaultPlantSlug: string): EntryFormState {
  return {
    plantSlug: defaultPlantSlug,
    startDate: getTodayISODate(),
    place: "",
    growingType: "",
    sunExposure: "",
    reference: "",
    amount: "",
    endDate: "",
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

export function MyGardenClient({
  plantOptions,
  initialPlantSlug,
}: MyGardenClientProps) {
  const service = useMemo(
    () => new GardenService(createLocalGardenStorage()),
    [],
  );

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

  function handleEntrySubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!entryForm.plantSlug || !entryForm.startDate) {
      return;
    }

    setGardenState((current) =>
      service.addEntry(current, {
        plantSlug: entryForm.plantSlug,
        startDate: entryForm.startDate,
        endDate: toOptionalText(entryForm.endDate),
        place: toOptionalText(entryForm.place),
        growingType: toOptionalText(entryForm.growingType),
        sunExposure: toOptionalText(entryForm.sunExposure),
        reference: toOptionalText(entryForm.reference),
        amount: toOptionalText(entryForm.amount),
      }),
    );

    setEntryForm(createInitialEntryForm(entryForm.plantSlug));
    setIsAddOpen(false);
  }

  return (
    <div className="space-y-7 pb-8">
      <section className="max-w-3xl space-y-5 py-8 md:py-10">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl">
          Mein Garten
        </h1>
        <p className="text-base leading-8 text-zinc-600 md:text-lg">
          Halte deine laufenden Kulturen in einer ruhigen Uebersicht fest. Jeder
          Eintrag fuehrt in eine eigene Historie, in der du deinen Verlauf
          fortlaufend dokumentierst.
        </p>
      </section>

      <section className="rounded-2xl border border-emerald-900/10 bg-white/60 p-4 md:p-5">
        <button
          type="button"
          onClick={() => setIsAddOpen((current) => !current)}
          className="flex w-full items-center justify-between rounded-xl border border-emerald-900/10 bg-white/70 px-4 py-3 text-left text-sm font-semibold text-zinc-800 transition-colors hover:bg-white"
        >
          <span>Etwas meinem Garten hinzufuegen</span>
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
              <span className="text-xs font-medium uppercase tracking-[0.08em] text-zinc-500">
                Pflanze
              </span>
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
              <span className="text-xs font-medium uppercase tracking-[0.08em] text-zinc-500">
                Startdatum
              </span>
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
              <span className="text-xs font-medium uppercase tracking-[0.08em] text-zinc-500">
                Ort
              </span>
              <input
                type="text"
                value={entryForm.place}
                onChange={(e) =>
                  setEntryForm((current) => ({ ...current, place: e.target.value }))
                }
                placeholder="Balkon, Garten, Gewaechshaus"
                className="w-full rounded-lg border border-emerald-900/15 bg-white px-3 py-2 text-sm text-zinc-800 outline-none ring-emerald-700/30 focus:ring-2"
              />
            </label>

            <label className="space-y-1.5">
              <span className="text-xs font-medium uppercase tracking-[0.08em] text-zinc-500">
                Art / Gefaess / Anbauform
              </span>
              <input
                type="text"
                value={entryForm.growingType}
                onChange={(e) =>
                  setEntryForm((current) => ({
                    ...current,
                    growingType: e.target.value,
                  }))
                }
                placeholder="Kuebel, Beet, Erde"
                className="w-full rounded-lg border border-emerald-900/15 bg-white px-3 py-2 text-sm text-zinc-800 outline-none ring-emerald-700/30 focus:ring-2"
              />
            </label>

            <label className="space-y-1.5">
              <span className="text-xs font-medium uppercase tracking-[0.08em] text-zinc-500">
                Standort
              </span>
              <input
                type="text"
                value={entryForm.sunExposure}
                onChange={(e) =>
                  setEntryForm((current) => ({
                    ...current,
                    sunExposure: e.target.value,
                  }))
                }
                placeholder="Schatten, Halbschatten, Sonne"
                className="w-full rounded-lg border border-emerald-900/15 bg-white px-3 py-2 text-sm text-zinc-800 outline-none ring-emerald-700/30 focus:ring-2"
              />
            </label>

            <label className="space-y-1.5">
              <span className="text-xs font-medium uppercase tracking-[0.08em] text-zinc-500">
                Menge
              </span>
              <input
                type="text"
                value={entryForm.amount}
                onChange={(e) =>
                  setEntryForm((current) => ({ ...current, amount: e.target.value }))
                }
                placeholder="z. B. 4 Stueck, 2 Reihen"
                className="w-full rounded-lg border border-emerald-900/15 bg-white px-3 py-2 text-sm text-zinc-800 outline-none ring-emerald-700/30 focus:ring-2"
              />
            </label>

            <label className="space-y-1.5 md:col-span-2">
              <span className="text-xs font-medium uppercase tracking-[0.08em] text-zinc-500">
                Notiz / Referenz
              </span>
              <input
                type="text"
                value={entryForm.reference}
                onChange={(e) =>
                  setEntryForm((current) => ({ ...current, reference: e.target.value }))
                }
                placeholder="Beet 3, Kuebel 5, Reihe 8"
                className="w-full rounded-lg border border-emerald-900/15 bg-white px-3 py-2 text-sm text-zinc-800 outline-none ring-emerald-700/30 focus:ring-2"
              />
            </label>

            <label className="space-y-1.5 md:col-span-2">
              <span className="text-xs font-medium uppercase tracking-[0.08em] text-zinc-500">
                Enddatum (optional)
              </span>
              <input
                type="date"
                value={entryForm.endDate}
                onChange={(e) =>
                  setEntryForm((current) => ({ ...current, endDate: e.target.value }))
                }
                className="w-full rounded-lg border border-emerald-900/15 bg-white px-3 py-2 text-sm text-zinc-800 outline-none ring-emerald-700/30 focus:ring-2"
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
        )}
      </section>

      {yearGroups.length === 0 ? (
        <section className="rounded-2xl border border-emerald-900/10 bg-white/60 p-5 text-sm text-zinc-600">
          Noch keine Eintraege vorhanden. Erstelle oben deinen ersten
          Garten-Eintrag.
        </section>
      ) : (
        <section className="space-y-7">
          {yearGroups.map((group) => (
            <div key={group.year} className="space-y-3">
              <h2 className="text-lg font-semibold text-zinc-900">Jahr {group.year}</h2>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {group.cards.map((card) => {
                  const entry = card.entry;

                  return (
                    <Link
                      key={`${group.year}-${entry.id}`}
                      href={`/mein-garten/${entry.id}`}
                      className={`block rounded-2xl border p-4 transition-colors hover:border-emerald-700/35 ${
                        card.isCompleted
                          ? "border-zinc-300/70 bg-zinc-100/70"
                          : "border-emerald-900/10 bg-white/70"
                      }`}
                    >
                      <div className="mb-3 flex items-center justify-between gap-2">
                        <h3 className="text-base font-semibold text-zinc-900">
                          {plantNameBySlug[entry.plantSlug] ?? entry.plantSlug}
                        </h3>
                        <p className="text-xs font-medium text-zinc-500">
                          Start: {formatDate(entry.startDate)}
                        </p>
                      </div>

                      <dl className="space-y-1.5 text-sm">
                        <div className="flex items-start justify-between gap-3">
                          <dt className="text-zinc-500">Referenz</dt>
                          <dd className="text-right text-zinc-700">
                            {entry.reference ?? "–"}
                          </dd>
                        </div>
                        <div className="flex items-start justify-between gap-3">
                          <dt className="text-zinc-500">Menge</dt>
                          <dd className="text-right text-zinc-700">{entry.amount ?? "–"}</dd>
                        </div>
                        {entry.place && (
                          <div className="flex items-start justify-between gap-3">
                            <dt className="text-zinc-500">Ort</dt>
                            <dd className="text-right text-zinc-700">{entry.place}</dd>
                          </div>
                        )}
                        {entry.endDate && (
                          <div className="flex items-start justify-between gap-3">
                            <dt className="text-zinc-500">Ende</dt>
                            <dd className="text-right text-zinc-700">
                              {formatDate(entry.endDate)}
                            </dd>
                          </div>
                        )}
                      </dl>
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
