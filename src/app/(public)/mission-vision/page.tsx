import FadeIn from "@/components/animation/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animation/Stagger";
import { getCMSContent } from "@/lib/actions";

export default async function MissionVisionPage() {
  const data = await getCMSContent("vision", "all") || {
    hero: {
      badge: "Our Philosophy",
      title: "Redefining the Skyline of Living",
      subtitle: "At SBK Heights, we don't just build structures; we sculpt experiences. Our commitment to architectural excellence and human-centric design sets a new benchmark for urban sophistication."
    },
    mission: "To architecturally inspire modern urbanity by sculpting vertical monoliths that redefine the standard of luxury. We deliver sustainable, ultra-luxury residential ecosystems that prioritize wellness, security, and unparalleled aesthetic precision. Through engineering excellence, we create eternal landmarks that stand as a testament to structural permanence.",
    vision: "To be the global gold standard in vertical luxury development, where the SBK name is synonymous with the future of urban sophistication. We envision a world where architecture and nature exist in a seamless harmony of glass and steel, inspiring future generations to look upward.",
    values: [
      { title: "Integrity", icon: "verified", text: "Transparent operations and ethical construction practices are the bedrock of our reputation." },
      { title: "Excellence", icon: "diamond", text: "From the master plan to the final fixture, we pursue a standard that transcends the ordinary." },
      { title: "Innovation", icon: "lightbulb", text: "Integrating cutting-edge smart home technology and engineering feats into every floor." },
      { title: "Sustainability", icon: "eco", text: "Building for tomorrow with eco-conscious materials and energy-efficient vertical landscapes." }
    ]
  };

  return (
    <>
      <section className="relative min-h-[819px] flex flex-col md:flex-row items-stretch overflow-hidden pt-20">
        <FadeIn direction="right" className="w-full md:w-1/2 bg-primary p-12 md:p-24 flex flex-col justify-center order-2 md:order-1">
          <span className="text-secondary-fixed-dim font-label uppercase tracking-[0.2rem] text-xs mb-6">
            {data.hero.badge}
          </span>
          <h1 className="text-on-primary font-headline text-5xl md:text-7xl mb-8 leading-tight tracking-tight whitespace-pre-line">
            {data.hero.title}
          </h1>
          <p className="text-on-primary-container text-lg md:text-xl max-w-lg font-light leading-relaxed">
            {data.hero.subtitle}
          </p>
        </FadeIn>
        <FadeIn direction="none" distance={0} className="w-full md:w-1/2 relative min-h-[400px] order-1 md:order-2">
          <img
            alt="Architectural perspective"
            className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaS69Lz21_XwjndAC9AARPSgeExTcB-r23fbiZZ9abYkm7NlU5HxsUXDGh4KrpGl5Zwpr67keEEsWdhgYiysHivce_cAssRzOshcSV8Ex8OYRrwdt6ythkPXZrKPdmi4guy2UOOgMBWmZzObqWR13kMRGftJsQuT-dyejkn-Wkwv_CBY3z89zuMYQN0jGTp7sPrTCuGX28zFHEPUpT_7oSRF-i9jCgQyy9G_IPoLo07JsYpakC5XvJ1b3ZB2qc3yk0BYZtoOQjomk"
          />
          <div className="absolute inset-0 bg-primary/10"></div>
        </FadeIn>
      </section>

      <section className="py-32 px-12 md:px-24 max-w-7xl mx-auto bg-surface">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
          <FadeIn direction="up" className="flex flex-col space-y-8">
            <div className="w-12 h-[2px] bg-secondary mb-4"></div>
            <h2 className="font-headline text-4xl text-primary uppercase tracking-tighter">Mission Statement</h2>
            <p className="font-body text-xl text-on-surface-variant leading-loose">{data.mission}</p>
          </FadeIn>

          <FadeIn direction="up" delay={0.3} className="flex flex-col space-y-8 md:mt-48">
            <div className="w-12 h-[2px] bg-secondary mb-4"></div>
            <h2 className="font-headline text-4xl text-primary uppercase tracking-tighter">Vision Statement</h2>
            <p className="font-body text-xl text-on-surface-variant leading-loose">{data.vision}</p>
          </FadeIn>
        </div>
      </section>

      <section className="py-32 bg-surface-container-low px-12 md:px-24">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="mb-20 text-center md:text-left">
            <h2 className="font-headline text-5xl text-primary mb-4 tracking-tight">Our Core Values</h2>
            <p className="text-on-surface-variant max-w-2xl font-body">The structural pillars upon which SBK Heights is built.</p>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-0 border-t border-outline-variant/30">
            {data.values.map((v: any, i: number) => (
              <StaggerItem key={i} className="group p-12 bg-white border-r border-b border-outline-variant/30 hover:bg-primary transition-all duration-500 relative overflow-hidden h-full">
                <div className="relative z-10">
                  <span className="material-symbols-outlined text-secondary text-4xl mb-8 block">{v.icon}</span>
                  <h3 className="font-headline text-2xl mb-6 text-primary group-hover:text-white transition-colors">{v.title}</h3>
                  <p className="text-on-surface-variant group-hover:text-on-primary-container leading-relaxed font-light transition-colors">{v.text}</p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
