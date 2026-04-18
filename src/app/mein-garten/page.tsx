import { PageShell } from "@/components/layout/PageShell";
import { MyGardenClient } from "@/components/garden/MyGardenClient";
import { plants } from "@/data/plants";

export default function MeinGartenPage() {
  const plantOptions = plants.map((plant) => ({
    slug: plant.slug,
    name: plant.name,
  }));

  return (
    <PageShell>
      <MyGardenClient plantOptions={plantOptions} />
    </PageShell>
  );
}
