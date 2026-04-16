import FadeIn from "@/components/animation/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animation/Stagger";
import { getCMSContent } from "@/lib/actions";
import Link from "next/link";

export default async function Home() {
  const [homeData, excellenceData] = await Promise.all([
    getCMSContent("home", "all"),
    getCMSContent("why-choose-us", "pillars"),
  ]);

  const fallback = {
    hero: {
      badge: "SBK Heights",
      title: "Elevating \nLifestyle",
      subtitle:
        "Experience a perfect harmony of comfort and architecture. Discover a residential sanctuary designed for those who value quality and community.",
      primaryBtn: "Enquire Now",
      secondaryBtn: "View Project",
    },
    vision: {
      title: "A New Standard of Living",
      about_text:
        "SBK Heights is a thoughtfully planned residential development aimed at delivering modern, safe, and high-quality housing. The project focuses on providing well-designed residential flats that offer comfort, durability, and long-term value for residents and investors alike.",
      mission_text:
        "Strategically located in a prime area of Noida, ensuring excellent connectivity to major roads and essential services such as markets, schools, and hospitals.",
      quote: "Modern infrastructure with experienced developers.",
    },
    cta: {
      title: "Find Your Dream Home",
      stats: [
        { val: "21", label: "1 BHK Units" },
        { val: "70", label: "2 BHK Units" },
        { val: "7", label: "3 BHK Units" },
        { val: "B+G+7", label: "Structure" },
      ],
    },
  };

  const home = {
    ...fallback,
    hero: { 
      ...fallback.hero, 
      ...homeData?.hero 
    },
    vision: { 
      ...fallback.vision, 
      ...homeData?.vision,
      about_text: homeData?.vision?.about_text || homeData?.vision?.text || fallback.vision.about_text 
    },
    cta: { 
      ...fallback.cta, 
      ...homeData?.cta,
      stats: homeData?.cta?.stats?.length > 0 ? homeData.cta.stats : fallback.cta.stats
    }
  };

  const excellenceTitle = excellenceData?.title || "World Class Facilities";
  const excellenceSubtitle = excellenceData?.subtitle || "THE STANDARD OF PREMIUM TOWNSHIP LIVING";

  const excellence = excellenceData?.pillars || [
    {
      title: "Terrace Garden",
      icon: "park",
      desc: "A beautifully landscaped retreat on the rooftop, perfect for serene evening walks and community gatherings.",
    },
    {
      title: "Modern Gym",
      icon: "fitness_center",
      desc: "Equipped with state-of-the-art machinery to ensure your wellness journey is never interrupted.",
    },
    {
      title: "24x7 Security",
      icon: "security",
      desc: "Round-the-clock surveillance and professional security personnel protecting your family and peace of mind.",
    },
    {
      title: "On-Site Stores",
      icon: "shopping_basket",
      desc: "Convenient access to daily essentials right within the complex for a truly seamless living experience.",
    },
  ];

  return (
    <>
      <section className="relative h-screen w-full flex items-center overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0 opacity-80">
          <img
            alt="SBK Heights"
            className="w-full h-full object-cover"
            src="/images/hero.png"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/40 to-transparent z-10"></div>
        <div className="relative z-20 px-6 md:px-12 max-w-7xl mx-auto w-full">
          <div className="max-w-4xl">
            <FadeIn delay={0.2}>
              <span className="block text-secondary uppercase tracking-[0.4rem] font-label font-black mb-6 text-xs">
                {home.hero.badge}
              </span>
            </FadeIn>
            <FadeIn delay={0.4} distance={40}>
              <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-headline font-bold leading-[0.9] mb-8 tracking-tighter whitespace-pre-line uppercase italic">
                {home.hero.title}
              </h1>
            </FadeIn>
            <FadeIn delay={0.6}>
              <p className="text-white/70 text-lg md:text-xl max-w-2xl font-body mb-12 leading-relaxed tracking-wide">
                {home.hero.subtitle}
              </p>
            </FadeIn>
            <FadeIn delay={0.8} direction="none">
              <div className="flex flex-col md:flex-row gap-6">
                <Link
                  href="/contact"
                  className="bg-secondary hover:bg-secondary-container text-primary px-10 py-5 font-label font-black uppercase tracking-widest text-xs transition-all duration-500 flex items-center justify-center shadow-xl"
                >
                  {home.hero.primaryBtn}
                </Link>
                <Link
                  href="/project"
                  className="border border-white/30 text-white hover:bg-white hover:text-primary px-10 py-5 font-label font-black uppercase tracking-widest text-xs transition-all duration-500 backdrop-blur-md flex items-center justify-center"
                >
                  {home.hero.secondaryBtn}
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 md:px-12 bg-surface">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-12 xl:col-span-6">
            <FadeIn>
              <h2 className="text-primary text-4xl md:text-6xl font-headline font-bold leading-tight mb-8 uppercase tracking-tighter italic border-b-2 border-primary/5 pb-4">
                {home.vision.title}
              </h2>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-8 font-body">
                {home.vision.about_text}
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p className="text-primary text-xl font-headline font-bold leading-relaxed italic border-l-4 border-secondary pl-8 py-2 mb-10">
                {home.vision.mission_text}
              </p>
            </FadeIn>
            <FadeIn delay={0.5}>
              <p className="text-on-surface-variant/60 text-xs font-label uppercase tracking-widest font-bold">
                — {home.vision.quote}
              </p>
            </FadeIn>
          </div>
          <div className="lg:col-span-12 xl:col-span-6 grid grid-cols-2 gap-4">
            <div className="pt-20">
              <img
                src="/images/left.png"
                alt="Bedroom detail"
                className="w-full h-[300px] md:h-[500px] object-cover shadow-2xl transition-all duration-1000"
              />
            </div>
            <div>
              <img
                src="/images/right.png"
                alt="Living space"
                className="w-full h-[400px] md:h-[600px] object-cover shadow-2xl transition-all duration-1000"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-primary text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <FadeIn className="mb-20">
            <span className="text-secondary font-label uppercase tracking-[0.3rem] text-[10px] mb-4 block font-bold">
              {excellenceTitle}
            </span>
            <h2 className="text-4xl md:text-6xl font-headline font-bold mb-6 uppercase tracking-tighter italic">
              {excellenceTitle}
            </h2>
            <p className="text-white/40 text-xs font-label uppercase tracking-widest border-t border-white/10 pt-4 inline-block">
              {excellenceSubtitle}
            </p>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {excellence.map((feature: any, i: number) => (
              <StaggerItem key={i}>
                <div className="bg-white/5 p-12 h-full hover:bg-secondary transition-all duration-700 group border border-white/5 hover:border-secondary shadow-lg">
                  <span className="material-symbols-outlined text-secondary text-5xl mb-8 group-hover:text-primary transition-colors">
                    {feature.icon}
                  </span>
                  <h3 className="text-xl font-headline font-bold mb-4 group-hover:text-primary uppercase tracking-tighter italic">
                    {feature.title}
                  </h3>
                  <p className="text-white/40 group-hover:text-primary/70 font-body text-sm leading-relaxed transition-colors">
                    {feature.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
      </section>

      <section className="py-40 bg-white overflow-hidden relative">
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <FadeIn>
            <h2 className="text-primary text-5xl md:text-8xl font-headline font-bold mb-10 leading-none tracking-tighter uppercase italic">
              {home.cta.title}
            </h2>
          </FadeIn>
          <div className="mt-20 flex flex-wrap justify-center gap-16">
            {home.cta.stats.map((stat: any, i: number) => (
              <div key={i} className="flex items-center gap-16">
                <div className="text-center group">
                  <p className="text-primary text-5xl font-headline font-bold mb-2 group-hover:text-secondary transition-colors">
                    {stat.val}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.4rem] font-black text-on-surface-variant/40">
                    {stat.label}
                  </p>
                </div>
                {i < home.cta.stats.length - 1 && (
                  <div className="hidden lg:block w-px h-16 bg-outline-variant/20"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
