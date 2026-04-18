import { PageShell } from "@/components/layout/PageShell";
import { MyGardenClient } from "@/components/garden/MyGardenClient";
import { plants } from "@/data/plants";

type MeinGartenPageProps = {
  searchParams: Promise<{ plant?: string }>;
};

export default async function MeinGartenPage({
  searchParams,
}: MeinGartenPageProps) {
  const params = await searchParams;
  const plantOptions = plants.map((plant) => ({
    slug: plant.slug,
    name: plant.name,
  }));

  return (
    <PageShell>
      <MyGardenClient
        plantOptions={plantOptions}
        initialPlantSlug={params.plant}
      />
    </PageShell>
  );
}
