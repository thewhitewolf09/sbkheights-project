import FadeIn from "@/components/animation/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animation/Stagger";
import { getCMSContent } from "@/lib/actions";

export default async function AboutUsPage() {
  const [aboutData, visionData, teamData] = await Promise.all([
    getCMSContent("about", "all"),
    getCMSContent("vision", "all"),
    getCMSContent("team", "all")
  ]);

  const data = aboutData || {
    hero: {
      badge: "The Vertical Monolith",
      title: "Architectural Authority Since 1994.",
      image: "/images/hero.png"
    },
    intro: {
      title: "Redefining the Sky’s Limit.",
      paragraph1: "SBK Heights is more than a developer; we are the curators of the modern skyline.",
      paragraph2: "Our philosophy centers on \"The Vertical Monolith\".",
    },
    mission: "To architecturally inspire modern urbanity by sculpting vertical monoliths that redefine the standard of luxury. We deliver sustainable, ultra-luxury residential ecosystems that prioritize wellness, security, and unparalleled aesthetic precision. Through engineering excellence, we create eternal landmarks that stand as a testament to structural permanence.",
    vision: "To be the global gold standard in vertical luxury development, where the SBK name is synonymous with the future of urban sophistication. We envision a world where architecture and nature exist in a seamless harmony of glass and steel, inspiring future generations to look upward.",
    portfolio: { completed: [], ongoing: [], image: "/images/roof_top.png" },
    visionaries: [],
    cta: { title: "", primaryBtn: "", secondaryBtn: "" }
  };

  data.mission = visionData?.mission || data.mission;
  data.vision = visionData?.vision || data.vision;

  data.values = visionData?.values || data.values || [
    { icon: "architecture", title: "Structural Integrity", text: "Uncompromising engineering that ensures every development stands as a testament to permanence." },
    { icon: "diamond", title: "Refined Luxury", text: "A curated experience where every texture and finish is selected for its aesthetic purity." },
    { icon: "verified", title: "Absolute Trust", text: "Thirty years of delivering on our promises to the world's most discerning residents." },
    { icon: "public", title: "Global Vision", text: "Integrating international design standards to create world-class living environments." }
  ];

  const team = teamData?.members || [
    { name: "ALEXANDER S. VANCE", role: "Founding Partner", bio: "With an eye for sustainable verticality, Alexander has pioneered the integration of smart-glass technology." },
    { name: "ELENA KOURIKOVA", role: "Chief Architect", bio: "Elena's designs are defined by their rhythmic asymmetry and connection to light." },
    { name: "MARCUS CHEN", role: "Head of Operations", bio: "Overseeing the structural integrity of every project, Marcus ensures precision translates into permanence." }
  ];

  return (
    <>
      <section className="px-6 md:px-12 mb-16 pt-20 md:pt-32">
        <FadeIn className="relative min-h-[500px] md:h-[800px] w-full overflow-hidden">
          <img
            alt="Corporate Headquarters"
            className="w-full h-full object-cover grayscale transition-transform duration-[3000ms] hover:scale-105"
            src={data.hero.image || "/images/hero.png"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent flex items-end p-8 md:p-16">
            <div className="max-w-4xl">
              <FadeIn delay={0.2} direction="right">
                <span className="text-secondary uppercase tracking-[0.4rem] text-xs mb-6 block font-label font-bold">
                  {data.hero.badge}
                </span>
              </FadeIn>
              <FadeIn delay={0.4}>
                <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-headline mb-8 leading-tight tracking-tighter">
                  {data.hero.title}
                </h1>
              </FadeIn>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="px-12 mb-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-20 items-start border-b border-outline-variant/10 pb-20">
          <FadeIn direction="left" className="md:col-span-12 xl:col-span-5">
            <h2 className="text-primary text-5xl font-headline leading-tight mb-12 uppercase tracking-tighter">
              {data.intro.title}
            </h2>
            <div className="space-y-8">
               <p className="text-on-surface-variant text-lg leading-relaxed font-body">
                 {data.intro.paragraph1}
               </p>
               <p className="text-on-surface-variant text-lg leading-relaxed font-body border-l-2 border-secondary/20 pl-6">
                 {data.intro.paragraph2}
               </p>
            </div>
          </FadeIn>
          <div className="md:col-span-12 xl:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-12">
             <FadeIn delay={0.2} className="bg-surface-container-low p-12 flex flex-col justify-between group hover:bg-primary transition-colors duration-700">
                <span className="text-secondary font-label uppercase tracking-widest text-xs font-black mb-12 group-hover:text-secondary-container">The Ambition</span>
                <h3 className="text-3xl font-headline text-primary group-hover:text-white uppercase tracking-tighter mb-6">Mission</h3>
                <p className="text-on-surface-variant group-hover:text-white/60 text-sm leading-loose">
                  {data.mission}
                </p>
             </FadeIn>
             <FadeIn delay={0.4} className="bg-primary p-12 flex flex-col justify-between group hover:bg-surface-container-low transition-colors duration-700">
                <span className="text-secondary-container font-label uppercase tracking-widest text-xs font-black mb-12 group-hover:text-secondary">The Future</span>
                <h3 className="text-3xl font-headline text-white group-hover:text-primary uppercase tracking-tighter mb-6">Vision</h3>
                <p className="text-white/60 group-hover:text-on-surface-variant text-sm leading-loose">
                  {data.vision}
                </p>
             </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white px-12">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="mb-12">
            <span className="text-secondary font-label uppercase tracking-[0.3rem] text-[10px] mb-4 block font-bold">Our Foundation</span>
            <h2 className="text-primary text-5xl md:text-7xl font-headline uppercase tracking-tighter leading-[0.9] font-bold">Core Values</h2>
            <p className="text-on-surface-variant/40 text-[10px] uppercase tracking-widest font-black mt-4 border-t border-outline-variant/10 pt-4 inline-block">THE STRUCTURAL PILLARS OF SBK HEIGHTS</p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-outline-variant/20">
            {data.values.map((v: any, i: number) => (
              <StaggerItem key={i} className="bg-white p-16 flex flex-col h-full hover:bg-secondary transition-all group duration-700">
                <span className="material-symbols-outlined text-secondary text-5xl mb-12 group-hover:text-primary transition-colors">
                  {v.icon}
                </span>
                <h3 className="text-2xl font-headline text-primary mb-6 group-hover:text-primary uppercase tracking-tighter font-bold">
                  {v.title}
                </h3>
                <p className="text-on-surface-variant group-hover:text-primary/70 text-sm leading-relaxed transition-colors">
                  {v.text}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-24 px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <FadeIn direction="right" className="relative group overflow-hidden">
               <img src={data.portfolio?.image || "/images/roof_top.png"} alt="Heritage" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 aspect-square" />
            </FadeIn>
            <FadeIn direction="left">
              <span className="text-secondary uppercase tracking-[0.3rem] text-xs mb-8 block font-label font-bold">Portfolio of Excellence</span>
              <h2 className="text-primary text-5xl font-headline mb-12 uppercase tracking-tighter">Demonstrated Expertise.</h2>
              
              <div className="space-y-12">
                <div>
                  <h3 className="text-secondary font-label text-[10px] uppercase tracking-widest font-black mb-6">Completed Landmarks</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(data.portfolio?.completed && data.portfolio.completed.length > 0 ? data.portfolio.completed : [
                      { n: "Chambal River Front", loc: "Kota, Rajasthan", val: "₹7 Cr" },
                      { n: "Aerodrome Circle", loc: "Kota, Rajasthan", val: "₹8 Cr" },
                      { n: "Mumbai Metro Works", loc: "Goregaon/DN Nagar", val: "₹12 Cr" },
                      { n: "CGST Building", loc: "Ghaziabad", val: "₹3 Cr" }
                    ]).map((p: any, i: number) => (
                      <div key={i} className="p-4 border border-outline-variant/10 hover:border-secondary transition-colors group">
                        <p className="text-primary font-headline font-bold text-sm uppercase tracking-tight group-hover:text-secondary">{p.n}</p>
                        <p className="text-[10px] text-on-surface-variant/60 uppercase font-label tracking-widest mt-1">{p.loc} • {p.val}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-secondary font-label text-[10px] uppercase tracking-widest font-black mb-6">Ongoing Developments</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(data.portfolio?.ongoing && data.portfolio.ongoing.length > 0 ? data.portfolio.ongoing : [
                      { n: "Solid Pink Stone Gate", loc: "District Gonda", val: "₹35 Cr" },
                      { n: "Spiritual Experience", loc: "Bundi, Rajasthan", val: "₹15.57 Cr" },
                      { n: "DMI Bihar", loc: "Bihta, Bihar", val: "₹5 Cr" }
                    ]).map((p: any, i: number) => (
                      <div key={i} className="p-4 border border-outline-variant/10 hover:border-secondary transition-colors group bg-primary/5">
                        <p className="text-primary font-headline font-bold text-sm uppercase tracking-tight group-hover:text-secondary">{p.n}</p>
                        <p className="text-[10px] text-on-surface-variant/60 uppercase font-label tracking-widest mt-1">{p.loc} • {p.val}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
        </div>
      </section>

      {/* Meet the Visionaries */}
      <section className="py-24 px-12 bg-surface border-t border-outline-variant/10">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="mb-16">
            <span className="text-secondary font-label uppercase tracking-[0.3rem] text-[10px] mb-4 block font-bold">Our Leadership</span>
            <h2 className="text-primary text-5xl md:text-7xl font-headline uppercase tracking-tighter leading-[0.9] font-bold">The Visionaries.</h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            {(data.visionaries && data.visionaries.length > 0 ? data.visionaries : [
              { type: "Lead Developer", name: "Sanjay Garg", role: "FOUNDER & VISIONARY", bio: "With a track record of delivering high-impact structural projects across India, Sanjay Garg brings engineering precision and a commitment to quality to the SBK Heights development. Successfully delivered multiple landmark projects including the Chambal River Front." },
              { type: "The Firm", name: "Shree BK Infratech LLP", role: "ENGINEERING EXCELLENCE", bio: "A legacy-driven development firm focused on vertical luxury and structural integrity. Committed to delivering modern, safe, and high-quality residential solutions that offer long-term value for residents and investors alike." }
            ]).map((v: any, i: number) => (
              <FadeIn key={i} delay={0.2 * (i + 1)} className="group">
                <div className={`${i === 1 ? 'bg-primary border-white/5' : 'bg-primary/5 border-outline-variant/10'} p-12 border group-hover:border-secondary transition-all h-full`}>
                  <span className="text-secondary font-label uppercase tracking-widest text-[10px] font-black mb-6 block">{v.type}</span>
                  <h3 className={`text-4xl md:text-5xl font-headline mb-2 uppercase tracking-tighter ${i === 1 ? 'text-white' : 'text-primary'}`}>{v.name}</h3>
                  <p className={`font-body text-sm uppercase tracking-[0.2rem] mb-8 ${i === 1 ? 'text-white/40' : 'text-primary/60'}`}>{v.role}</p>
                  <p className={`leading-relaxed font-light ${i === 1 ? 'text-white/60' : 'text-on-surface-variant'}`}>
                    {v.bio}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary text-white py-20 px-12 text-center overflow-hidden relative">
        <h2 className="text-5xl md:text-7xl font-headline mb-12 relative z-10 uppercase tracking-tighter">
          {data.cta?.title || "Witness the Height of Luxury."}
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-8 relative z-10">
           <button className="bg-secondary text-white px-12 py-5 text-sm font-label font-bold uppercase tracking-widest hover:bg-secondary-container hover:text-primary transition-all">
             {data.cta?.primaryBtn || "Request Portfolio"}
           </button>
           <button className="border-2 border-white/20 px-12 py-5 text-sm font-label font-bold uppercase tracking-widest hover:bg-white hover:text-primary transition-all">
             {data.cta?.secondaryBtn || "Corporate Overview"}
           </button>
        </div>
      </section>
    </>
  );
}
