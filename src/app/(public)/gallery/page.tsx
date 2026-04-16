import FadeIn from "@/components/animation/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animation/Stagger";
import { getCMSContent } from "@/lib/actions";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import CinemaSection from "@/components/gallery/CinemaSection";

export default async function GalleryPage() {
  const cmsData = await getCMSContent("gallery", "all");

  const localItems = [
    { title: "Monumental Exterior - Front View", type: "Exterior", url: "/images/gall_1.png" },
    { title: "Grand Entrance & Lobby", type: "Interior", url: "/images/gall_2.png" },
    { title: "Designer Living Spaces", type: "Interior", url: "/images/gall_3.png" },
    { title: "Gourmet Kitchen Suite", type: "Interior", url: "/images/gall_4.png" },
    { title: "Master Bedroom Retreat", type: "Interior", url: "/images/gall_5.png" },
    { title: "Sun-Drenched Balcony View", type: "Exterior", url: "/images/gall_6.png" },
    { title: "Premium Resident Amenities", type: "Amenity", url: "/images/gall_7.png" },
    { title: "Rooftop Garden Sanctuary", type: "Amenity", url: "/images/gall_8.png" }
  ];

  const items = cmsData?.images?.items?.length > 0 ? cmsData.images.items : localItems;

  const data = {
    images: {
      badge: cmsData?.images?.badge || "Visual Journey",
      title: cmsData?.images?.title || "Architectural Excellence In Frame",
      items: items
    },
    cinema: {
      badge: cmsData?.cinema?.badge || "Cinematic Experience",
      title: cmsData?.cinema?.title || "The Heights in Motion",
      main: { 
        title: cmsData?.cinema?.main?.title || "Official Drone Walkthrough 2024", 
        meta: cmsData?.cinema?.main?.meta || "4:32 MIN • 4K ULTRA HD", 
        url: "/images/gall_1.png" 
      },
      items: cmsData?.cinema?.items?.length > 0 ? cmsData.cinema.items : [
        { 
          title: "Interior Tour", 
          meta: "2:15 MIN • HD", 
          url: "/images/gall_3.png" 
        }
      ]
    }
  };

  return (
    <>
      <section className="px-12 mb-24 max-w-7xl mx-auto pt-20 md:pt-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <FadeIn className="max-w-3xl">
            <span className="label-md font-label font-bold uppercase tracking-[0.2em] text-secondary mb-4 block">
              {data.images.badge}
            </span>
            <h1 className="text-6xl md:text-8xl font-headline text-primary tracking-tighter leading-[0.9]">
              {data.images.title}
            </h1>
          </FadeIn>
        </div>
      </section>

      <GalleryGrid items={data.images.items} />

      <section className="bg-primary py-32">
        <div className="px-12 max-w-7xl mx-auto">
          <FadeIn className="flex flex-col mb-16">
            <span className="label-md font-label font-bold uppercase tracking-[0.2em] text-secondary-container mb-4">
              {data.cinema.badge}
            </span>
            <h2 className="text-5xl font-headline text-white tracking-tighter max-w-2xl">
              {data.cinema.title}
            </h2>
          </FadeIn>
          
          <CinemaSection data={data.cinema} />
        </div>
      </section>
    </>
  );
}
