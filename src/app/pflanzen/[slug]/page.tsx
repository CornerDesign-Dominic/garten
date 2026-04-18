import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/layout/PageShell";
import { getPlantBySlug, plants } from "@/data/plants";

type PlantPageProps = {
  params: Promise<{ slug: string }>;
};

const sectionMeta = [
  { key: "standort", label: "Standort" },
  { key: "pflanzzeit", label: "Pflanzzeit" },
  { key: "pflege", label: "Pflege" },
  { key: "ernte", label: "Ernte" },
  { key: "hinweise", label: "Hinweise" },
] as const;

export async function generateStaticParams() {
  return plants.map((plant) => ({ slug: plant.slug }));
}

export async function generateMetadata({
  params,
}: PlantPageProps): Promise<Metadata> {
  const { slug } = await params;
  const plant = getPlantBySlug(slug);

  if (!plant) {
    return {
      title: "Pflanze nicht gefunden | Gruenkalender",
    };
  }

  return {
    title: plant.seo.title,
    description: plant.seo.description,
  };
}

export default async function PlantDetailPage({ params }: PlantPageProps) {
  const { slug } = await params;
  const plant = getPlantBySlug(slug);

  if (!plant) {
    notFound();
  }

  return (
    <PageShell>
      <section className="max-w-3xl space-y-5 py-8 md:py-12">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl">
          {plant.name}
        </h1>
        <p className="text-base leading-8 text-zinc-600 md:text-lg">
          {plant.content.intro}
        </p>
      </section>

      <section className="grid gap-5 pb-10 md:grid-cols-2 md:pb-14">
        {sectionMeta.map((section) => (
          <article
            key={section.key}
            className="rounded-2xl border border-emerald-900/10 bg-white/60 p-6"
          >
            <h2 className="text-xl font-semibold text-zinc-900">{section.label}</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-600">
              {plant.content[section.key]}
            </p>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
