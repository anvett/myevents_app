import { notFound } from "next/navigation";
import { buildRenderData } from "@/lib/buildRenderData";
import EventClientWrapper from "@/components/layout/EventClientWrapper/EventClientWrapper";

export default async function EventPage({ params, searchParams }) {
  const { type, slug } = await params;
  const resolvedSearchParams = await searchParams;

  const guestId = resolvedSearchParams?.g;

  const renderData = buildRenderData(type, slug, guestId);

  if (!renderData) {
    notFound();
  }

  return <EventClientWrapper renderData={renderData} />;
}
