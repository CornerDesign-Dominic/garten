import { feldsalat } from "./feldsalat";
import { gurken } from "./gurken";
import { kuerbis } from "./kuerbis";
import { moehren } from "./moehren";
import { radieschen } from "./radieschen";
import { tomaten } from "./tomaten";
import type { Plant } from "./types";

export type {
  Plant,
  PlantCategory,
  PlantLifecycle,
  PlantContentData,
  PlantSeoData,
  PlantTimelineBaseType,
  PlantTimelineEntry,
  PlantTimelineType,
} from "./types";

export const plants: Plant[] = [
  tomaten,
  gurken,
  kuerbis,
  feldsalat,
  radieschen,
  moehren,
];

export const plantsBySlug: Record<string, Plant> = Object.fromEntries(
  plants.map((plant) => [plant.slug, plant]),
);

export function getPlantBySlug(slug: string) {
  return plantsBySlug[slug];
}
