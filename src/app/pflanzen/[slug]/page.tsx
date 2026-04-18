import type { Metadata } from "next";
import Link from "next/link";
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
      title: "Pflanze nicht gefunden | Grünkalender",
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
      <section className="ui-page-head">
        <h1 className="ui-page-title">{plant.name}</h1>
        <p className="ui-page-intro">{plant.content.intro}</p>
        <div>
          <Link
            href={`/mein-garten?plant=${plant.slug}`}
            className="ui-focus inline-flex rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 focus-visible:ring-offset-[var(--paper)]"
          >
            Meinem Garten hinzufügen
          </Link>
        </div>
      </section>

      <section className="grid gap-5 pb-10 md:grid-cols-2 md:pb-14">
        {sectionMeta.map((section) => (
          <article key={section.key} className="ui-card p-6">
            <h2 className="text-xl font-semibold text-[var(--ink-strong)]">
              {section.label}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">
              {plant.content[section.key]}
            </p>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
