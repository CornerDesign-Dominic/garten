import type { Plant, PlantTimelineEntry, PlantTimelineType } from "@/data/plants";

export type CalendarMonth = {
  index: number;
  label: string;
};

export type CalendarSegment = {
  id: string;
  type: PlantTimelineType;
  label: string;
  startPercent: number;
  widthPercent: number;
  color: string;
};

export type CalendarTrackKey = "aussaat" | "duengen" | "ernte";

export type CalendarTrackData = {
  key: CalendarTrackKey;
  label: string;
  color: string;
  segments: CalendarSegment[];
};

export type CalendarLegendItem = {
  label: string;
  colors: string[];
};

export type CalendarRowData = {
  plantSlug: string;
  plantName: string;
  tracks: CalendarTrackData[];
};

export const CALENDAR_MONTHS: CalendarMonth[] = [
  { index: 1, label: "Jan" },
  { index: 2, label: "Feb" },
  { index: 3, label: "Maer" },
  { index: 4, label: "Apr" },
  { index: 5, label: "Mai" },
  { index: 6, label: "Jun" },
  { index: 7, label: "Jul" },
  { index: 8, label: "Aug" },
  { index: 9, label: "Sep" },
  { index: 10, label: "Okt" },
  { index: 11, label: "Nov" },
  { index: 12, label: "Dez" },
];

export const TRACK_COLORS = {
  aussaat: "#7aa942",
  duengen: "#8b6b45",
  ernte: "#c95b52",
} as const;

const TIMELINE_TYPE_COLORS = {
  vorzucht: "#bfdc9a",
  aussaat: "#7aa942",
  auspflanzen: "#6a9b38",
  duengen: "#8b6b45",
  ernten: "#c95b52",
} as const;

export const CALENDAR_TRACKS: Array<{
  key: CalendarTrackKey;
  label: string;
}> = [
  { key: "aussaat", label: "Vorzucht / Aussaat" },
  { key: "duengen", label: "Duengen" },
  { key: "ernte", label: "Ernte" },
];

export const CALENDAR_LEGEND_ITEMS: CalendarLegendItem[] = [
  {
    label: "Vorzucht / Aussaat",
    colors: [TIMELINE_TYPE_COLORS.vorzucht, TIMELINE_TYPE_COLORS.aussaat],
  },
  { label: "Duengen", colors: [TIMELINE_TYPE_COLORS.duengen] },
  { label: "Ernte", colors: [TIMELINE_TYPE_COLORS.ernten] },
];

const DAY_IN_MS = 24 * 60 * 60 * 1000;

function daysInYear(year: number) {
  return new Date(Date.UTC(year, 11, 31)).getUTCDate() === 31 &&
    new Date(Date.UTC(year, 1, 29)).getUTCDate() === 29
    ? 366
    : 365;
}

function daysInMonth(year: number, month: number) {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

function toDayOfYear(year: number, month: number, day: number) {
  const safeDay = Math.min(day, daysInMonth(year, month));
  const current = Date.UTC(year, month - 1, safeDay);
  const start = Date.UTC(year, 0, 1);
  return Math.floor((current - start) / DAY_IN_MS) + 1;
}

function toPercent(dayOfYear: number, yearDays: number) {
  return ((dayOfYear - 1) / yearDays) * 100;
}

function mapTypeToTrack(type: PlantTimelineType): CalendarTrackKey {
  if (type === "vorzucht" || type === "direktsaat" || type === "auspflanzen") {
    return "aussaat";
  }
  if (type === "duengen") {
    return "duengen";
  }
  if (type === "ernten") {
    return "ernte";
  }

  return "aussaat";
}

function resolveSegmentColor(type: PlantTimelineType) {
  if (type === "vorzucht") {
    return TIMELINE_TYPE_COLORS.vorzucht;
  }
  if (type === "direktsaat") {
    return TIMELINE_TYPE_COLORS.aussaat;
  }
  if (type === "auspflanzen") {
    return TIMELINE_TYPE_COLORS.auspflanzen;
  }
  if (type === "duengen") {
    return TIMELINE_TYPE_COLORS.duengen;
  }
  if (type === "ernten") {
    return TIMELINE_TYPE_COLORS.ernten;
  }

  return null;
}

function expandEntryToSegments(entry: PlantTimelineEntry, year: number) {
  const yearDays = daysInYear(year);
  const startDay = toDayOfYear(year, entry.startMonth, entry.startDay);
  const endDay = toDayOfYear(year, entry.endMonth, entry.endDay);
  const color = resolveSegmentColor(entry.type);

  if (!color) {
    return [];
  }

  if (endDay >= startDay) {
    return [
      {
        id: `${entry.type}-${entry.label}-${startDay}-${endDay}`,
        type: entry.type,
        label: entry.label,
        startPercent: toPercent(startDay, yearDays),
        widthPercent: ((endDay - startDay + 1) / yearDays) * 100,
        color,
      },
    ];
  }

  return [
    {
      id: `${entry.type}-${entry.label}-${startDay}-${yearDays}`,
      type: entry.type,
      label: entry.label,
      startPercent: toPercent(startDay, yearDays),
      widthPercent: ((yearDays - startDay + 1) / yearDays) * 100,
      color,
    },
    {
      id: `${entry.type}-${entry.label}-1-${endDay}`,
      type: entry.type,
      label: entry.label,
      startPercent: 0,
      widthPercent: (endDay / yearDays) * 100,
      color,
    },
  ];
}

export function buildCalendarRows(plants: Plant[], year: number): CalendarRowData[] {
  return plants.map((plant) => {
    const groupedSegments: Record<CalendarTrackKey, CalendarSegment[]> = {
      aussaat: [],
      duengen: [],
      ernte: [],
    };

    const segments = plant.timeline
      .flatMap((entry) => expandEntryToSegments(entry, year))
      .sort((a, b) => a.startPercent - b.startPercent);

    for (const segment of segments) {
      const track = mapTypeToTrack(segment.type);
      groupedSegments[track].push(segment);
    }

    const tracks = CALENDAR_TRACKS.map((track) => ({
      key: track.key,
      label: track.label,
      color: TRACK_COLORS[track.key],
      segments: groupedSegments[track.key],
    }));

    return {
      plantSlug: plant.slug,
      plantName: plant.name,
      tracks,
    };
  });
}
