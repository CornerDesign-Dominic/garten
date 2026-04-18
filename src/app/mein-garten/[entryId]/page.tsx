import { GardenEntryDetailClient } from "@/components/garden/GardenEntryDetailClient";
import { PageShell } from "@/components/layout/PageShell";
import { plants } from "@/data/plants";

type GardenEntryPageProps = {
  params: Promise<{ entryId: string }>;
};

export default async function GardenEntryPage({ params }: GardenEntryPageProps) {
  const { entryId } = await params;
  const plantOptions = plants.map((plant) => ({
    slug: plant.slug,
    name: plant.name,
  }));

  return (
    <PageShell>
      <GardenEntryDetailClient entryId={entryId} plantOptions={plantOptions} />
    </PageShell>
  );
}

