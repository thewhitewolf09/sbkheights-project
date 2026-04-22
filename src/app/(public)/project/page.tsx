import FadeIn from "@/components/animation/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animation/Stagger";
import { getCMSContent } from "@/lib/actions";
import Link from "next/link";

export default async function TheProjectPage() {
  const fallback = {
    hero: {
      badge: "The Residency",
      title: "SBK Heights \nResidential Suites",
      stats: [
        { label: "Location", val: "Sector 45, Noida" },
        { label: "Structure", val: "Basement + G + 7 Floors" },
        { label: "Property Type", val: "Freehold" }
      ]
    },
    units: [
      { 
        type: "3 BHK Floor Plan", 
        area: "1750 sq. ft.", interior: "1600 sq. ft.", beds: "3 Bedrooms", baths: "3 Bathrooms", pool: "Private Access", additionals: "Study Room",
        image: "/images/bhk_3.png"
      },
      { 
        type: "2 BHK Floor Plan", 
        area: "1250 sq. ft.", interior: "1150 sq. ft.", beds: "2 Bedrooms", baths: "2 Bathrooms", pool: "Community Access", additionals: "Utility Area",
        image: "/images/bhk_2.png"
      },
      { 
        type: "1 BHK Floor Plan", 
        area: "850 sq. ft.", interior: "750 sq. ft.", beds: "1 Bedroom", baths: "1 Bathroom", pool: "Community Access", additionals: "Balcony",
        image: "/images/bhk_1.png"
      }
    ],
    facilities: [
      { name: "Terrace Garden", icon: "park", desc: "Serene green escape with panoramic city views." },
      { name: "Modern Gym", icon: "fitness_center", desc: "Fully equipped wellness studio for residents." },
      { name: "24x7 Security", icon: "security", desc: "Advanced surveillance and on-site guards." },
      { name: "Retail Stores", icon: "shopping_basket", desc: "Daily essentials available within the perimeter." }
    ],
    legal: [
      "Registry / Sale Deed",
      "Khata / Khasra Details",
      "Approved Layout Plan",
      "Local Authority Approvals",
      "Freehold Verification",
      "Clear Land Title"
    ],
    partners: [
      { name: "Piramal Finance", logo: "/images/piramal.png" },
      { name: "Aadhar Housing Finance", logo: "/images/aadhar.png" },
      { name: "GIC Housing Finance", logo: "/images/gic.png" },
      { name: "ICICI Bank", logo: "/images/icici.png" },
      { name: "PNB Housing Finance", logo: "/images/pnb.png" }
    ],
    cta: { 
      title: "Secure Your Unit", 
      desc: "Private viewings for our 1, 2, and 3 BHK models are available by appointment. Contact our concierge to schedule your experience." 
    },
    details: { title: "Property Details", subtitle: "In our society you will get multiple amenities like this." },
    facilities_meta: { title: "Modern Amenities", subtitle: "Designed to facilitate an effortless lifestyle, our premium facilities ensure safety, health, and convenience at every turn." },
    legal_meta: { title: "Legal & Compliance", subtitle: "All legal and land-related documents for SBK Heights are verified and cleared by the respective authorities." },
    partners_meta: { title: "Loan Partners", subtitle: "" }
  };

  const cmsData = await getCMSContent("project", "main");
  const data = {
    ...fallback,
    ...cmsData,
    hero: {
      badge: cmsData?.hero?.badge || fallback.hero.badge,
      title: cmsData?.hero?.title || fallback.hero.title,
      bgImage: cmsData?.hero?.bgImage || "/images/bhk_3.png",
      stats: (cmsData?.hero?.stats && cmsData.hero.stats.length > 0) ? cmsData.hero.stats : fallback.hero.stats
    },
    units: (cmsData?.units && cmsData.units.length > 0) ? cmsData.units : fallback.units,
    details: { ...fallback.details, ...cmsData?.details },
    facilities_meta: { ...fallback.facilities_meta, ...cmsData?.facilities_meta },
    legal_meta: { ...fallback.legal_meta, ...cmsData?.legal_meta },
    partners_meta: { ...fallback.partners_meta, ...cmsData?.partners_meta },
    facilities: (cmsData?.facilities && cmsData.facilities.length > 0) ? cmsData.facilities : fallback.facilities,
    legal: (cmsData?.legal && cmsData.legal.length > 0) ? cmsData.legal : fallback.legal,
    partners: (cmsData?.partners && cmsData.partners.length > 0 && typeof cmsData.partners[0] !== 'string') ? cmsData.partners : fallback.partners,
    cta: { ...fallback.cta, ...cmsData?.cta }
  };

  return (
    <>
      <section className="relative min-h-[60vh] md:h-[800px] flex items-end p-6 md:p-12 overflow-hidden bg-primary pt-20 md:pt-32">
        <img
          className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale"
          src={data.hero.bgImage}
          alt="SBK Heights Hero"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent z-10"></div>
        <FadeIn className="relative z-20 max-w-4xl w-full">
          <span className="inline-block text-secondary font-label text-sm font-black uppercase tracking-[0.3rem] md:tracking-[0.4rem] mb-4 md:mb-6">
            {data.hero.badge}
          </span>
          <h1 className="text-white text-4xl sm:text-6xl md:text-9xl font-headline font-bold leading-[0.9] tracking-tighter mb-8 md:mb-10 whitespace-pre-line uppercase">
            {data.hero.title}
          </h1>
          <div className="flex flex-wrap gap-6 md:gap-12 text-white/50 font-label text-[10px] uppercase tracking-widest border-t border-white/10 pt-6 md:pt-8 mt-4">
            {data.hero.stats.map((stat: any, i: number) => (
              <div key={i} className="flex gap-4 items-center">
                 <span className="w-1 h-1 bg-secondary rounded-full"></span>
                 <span className="text-secondary font-bold">{stat.label}:</span>
                 {stat.val}
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="py-32 px-6 md:px-12 bg-surface">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="mb-24 text-center">
             <h2 className="text-primary text-5xl md:text-7xl font-headline font-bold uppercase tracking-tighter">{data.details.title}</h2>
             <p className="text-on-surface-variant font-body text-lg mt-4 max-w-2xl mx-auto">{data.details.subtitle}</p>
          </FadeIn>

          <div className="space-y-40">
            {(data.units || []).map((unit: any, i: number) => (
              <FadeIn key={i} direction={i % 2 === 0 ? "right" : "left"} className={`grid grid-cols-1 lg:grid-cols-12 gap-20 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                 <div className={`lg:col-span-12 xl:col-span-7 relative ${i % 2 !== 0 ? 'lg:order-2' : ''}`}>
                    <div className="absolute inset-0 gold-gradient-bg -translate-x-4 translate-y-4 -z-10 opacity-20"></div>
                    <img src={`${unit.image}?v=1.1`} alt={unit.type} className="w-full h-full object-contain shadow-2xl border border-outline-variant/10 bg-white/5 min-h-[400px] max-h-[700px]" />
                 </div>
                 <div className="lg:col-span-12 xl:col-span-5 space-y-10">
                    <div>
                       <span className="text-secondary font-label uppercase tracking-[0.34rem] text-sm mb-6 block font-bold">
                          {data.property_intro_meta?.title || "Property Introduction"}
                       </span>
                       <h2 className="text-4xl md:text-6xl font-headline font-bold text-primary italic uppercase tracking-tighter mb-8">
                          Standardized Excellence.
                       </h2>
                       <div className="space-y-6">
                          <p className="text-on-surface-variant text-lg leading-relaxed font-body">
                             {data.property_intro_p1}
                          </p>
                          <p className="text-on-surface-variant text-lg leading-relaxed font-body border-l-2 border-secondary/20 pl-8 py-2">
                             {data.property_intro_p2}
                          </p>
                       </div>
                       <div className="grid grid-cols-2 gap-y-8 gap-x-12 border-t border-outline-variant/10 pt-10">
                          {(unit.specs || []).map((spec: any, j: number) => (
                            <div key={j} className="group">
                               <p className="text-sm uppercase tracking-widest text-on-surface-variant/60 font-bold mb-1 group-hover:text-secondary transition-colors">{spec.label}</p>
                               <p className="text-xl font-headline text-primary font-bold">{spec.val}</p>
                            </div>
                          ))}
                       </div>
                    </div>
                 </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-primary relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
             <FadeIn>
                <span className="text-secondary font-label text-sm uppercase tracking-[0.3rem] font-bold mb-6 block text-center lg:text-left">Elite Facilities</span>
                <h2 className="text-white text-5xl md:text-7xl font-headline font-bold uppercase tracking-tighter text-center lg:text-left">{data.facilities_meta.title}</h2>
                <p className="text-white/60 text-xl font-body mt-8 leading-relaxed max-w-xl text-center lg:text-left">{data.facilities_meta.subtitle}</p>
             </FadeIn>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {(data.facilities || []).map((f: any, i: number) => (
                  <FadeIn key={i} delay={i * 0.1} className="bg-white/5 border border-white/5 p-8 hover:bg-white transition-all group duration-700 shadow-xl">
                     <span className="material-symbols-outlined text-secondary text-4xl mb-6 group-hover:text-primary transition-colors">{f.icon}</span>
                     <h4 className="text-white group-hover:text-primary text-2xl font-headline font-bold uppercase tracking-tighter mb-2">{f.name}</h4>
                     <p className="text-white/60 group-hover:text-primary/60 text-base font-body font-light leading-relaxed">{f.desc}</p>
                  </FadeIn>
                ))}
             </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-surface">
         <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
               <FadeIn>
                  <span className="text-secondary font-label uppercase tracking-[0.3rem] text-sm mb-4 block font-bold">The Monument</span>
                  <h1 className="text-5xl md:text-7xl font-headline font-bold text-primary uppercase tracking-tighter leading-none mb-8">
                    Emerald Horizon
                  </h1>
                  <p className="text-on-surface-variant text-xl leading-relaxed max-w-2xl font-body">
                    {data.hero_intro}
                  </p>
               </FadeIn>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {(data.legal || []).map((doc: string, i: number) => (
                    <FadeIn key={i} delay={i * 0.1} className="flex items-center gap-4 p-6 bg-white border border-outline-variant/10 shadow-sm hover:border-secondary transition-all">
                       <span className="material-symbols-outlined text-secondary text-2xl">verified</span>
                       <span className="text-primary font-label text-base uppercase tracking-widest font-bold">{doc}</span>
                    </FadeIn>
                  ))}
               </div>
            </div>
         </div>
      </section>

      <section className="py-32 bg-surface">
          <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
             <FadeIn className="mb-20">
                <span className="text-secondary font-label text-xs uppercase tracking-widest font-bold mb-4 block">{data.partners_meta.subtitle || 'Financial Partnerships'}</span>
                <h2 className="text-primary text-5xl md:text-7xl font-headline font-bold uppercase tracking-tighter">{data.partners_meta.title}</h2>
             </FadeIn>
            
            <StaggerContainer className="flex flex-wrap justify-center gap-8 md:gap-16">
               {(data.partners || []).map((p: any, i: number) => (
                  <StaggerItem key={i} className="px-12 py-8 bg-white border border-outline-variant/10 shadow-sm grayscale hover:grayscale-0 hover:border-secondary transition-all hover:shadow-lg flex items-center justify-center min-w-60">
                     <img 
                       src={p.logo} 
                       alt={p.name} 
                       className="max-h-16 w-auto object-contain"
                     />
                  </StaggerItem>
               ))}
            </StaggerContainer>
         </div>
      </section>

      <section className="bg-primary py-40 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary via-transparent to-transparent"></div>
        </div>
        <FadeIn className="relative z-10 max-w-4xl mx-auto px-6">
          <h2 className="text-white text-5xl md:text-8xl font-headline font-bold mb-10 leading-none tracking-tighter uppercase">{data.cta.title}</h2>
          <p className="text-white/40 text-lg mb-12 font-body max-w-2xl mx-auto">{data.cta.desc}</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <Link href="/contact" className="bg-secondary text-primary px-12 py-6 font-black font-label uppercase tracking-widest text-xs shadow-2xl hover:bg-white transition-all">Request a Viewing</Link>
             <Link href="/gallery" className="border border-white/20 text-white px-12 py-6 font-black font-label uppercase tracking-widest text-xs hover:bg-white hover:text-primary transition-all backdrop-blur-sm">Explore Gallery</Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
