// import { notFound } from "next/navigation";
// import { buildRenderData } from "@/lib/buildRenderData";
// import EventClientWrapper from "@/components/layout/EventClientWrapper/EventClientWrapper";

// export default async function EventPage({ params, searchParams }) {
//   const { type, slug } = await params;
//   const resolvedSearchParams = await searchParams;

//   const guestId = resolvedSearchParams?.g;

//   const renderData = buildRenderData(type, slug, guestId);

//   if (!renderData) {
//     notFound();
//   }

//   return <EventClientWrapper renderData={renderData} />;
// }
import { notFound } from "next/navigation";
import { buildRenderData } from "@/lib/buildRenderData";
import { getEventConfig } from "@/lib/getEventConfig";
import EventClientWrapper from "@/components/layout/EventClientWrapper/EventClientWrapper";

/* -------------------------------- */
/* Metadata dinámica para OpenGraph */
/* -------------------------------- */

export async function generateMetadata({ params }) {

  const { type, slug } = await params;

  const eventConfig = getEventConfig(type, slug);

  if (!eventConfig) {
    return {};
  }

  const share = eventConfig?.eventMeta?.share || {};

  const title = share.title || "Invitación Digital";
  const description =
    share.description || "Te invitamos a este evento especial";

  const image = share.image || "/images/share/default.jpg";

  const url =
    share.url || `https://inv.anvetly.com/${type}/${slug}`;

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      url,
      siteName: "Anvetly",
      images: [
        {
          url: image,
          width: 1200,
          height: 630
        }
      ],
      locale: "es_ES",
      type: "website"
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image]
    }
  };
}

/* -------------------------------- */
/* Página del evento */
/* -------------------------------- */

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