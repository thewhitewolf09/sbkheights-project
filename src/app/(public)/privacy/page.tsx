import FadeIn from "@/components/animation/FadeIn";
import { getCMSContent } from "@/lib/actions";

export default async function LegalPage() {
  const data = await getCMSContent("legal", "all") || {
    updated: "April 2026",
    privacy: [{ title: "Privacy Protocol", content: "Our architectural privacy standards are being synchronized." }],
    terms: [{ title: "Service Agreement", content: "Our usage frameworks are being updated." }]
  };

  // Ensure sections are arrays even for legacy data
  const privacySections = Array.isArray(data.privacy) ? data.privacy : [{ title: "Privacy Policy", content: data.privacy }];
  const termsSections = Array.isArray(data.terms) ? data.terms : [{ title: "Terms of Service", content: data.terms }];

  return (
    <div className="min-h-screen bg-surface pt-20 md:pt-32">
      <section className="px-6 md:px-12 py-32 max-w-480 mx-auto">
        <FadeIn className="mb-20">
          <div className="inline-block bg-secondary px-4 py-1 mb-6">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary">Legal Document</span>
          </div>
          <h1 className="text-5xl md:text-9xl font-headline font-bold text-primary mb-8 leading-[0.9] tracking-tighter uppercase italic">
            Privacy Policy &amp; <br />
            Terms of Service
          </h1>
          <div className="flex flex-col md:flex-row md:items-center gap-6 mt-12 pt-8 border-t border-outline-variant/10">
            <p className="text-on-surface-variant max-w-2xl text-lg font-light leading-relaxed font-body italic">
              Our commitment to architectural transparency and digital security. These documents govern your engagement with the SBK legacy.
            </p>
            <div className="md:ml-auto text-right">
              <p className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-1">Last Updated</p>
              <p className="text-2xl font-headline font-bold text-primary italic uppercase">{data.updated || 'April 2026'}</p>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <aside className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-40 space-y-12">
              <nav className="flex flex-col space-y-6">
                <a className="text-secondary font-bold text-[10px] uppercase tracking-[0.3em] border-l-2 border-secondary pl-6 transition-all" href="#privacy">01. Privacy Policy</a>
                <a className="text-on-surface-variant/40 hover:text-primary font-bold text-[10px] uppercase tracking-[0.3em] pl-6 transition-all border-l-2 border-transparent" href="#terms">02. Terms of Service</a>
              </nav>
              <div className="bg-primary p-8 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-secondary"></div>
                <h4 className="font-headline text-lg font-bold mb-4 uppercase tracking-tighter text-secondary italic">Governance</h4>
                <p className="text-[10px] text-white/40 mb-8 leading-relaxed font-label uppercase tracking-widest font-bold">Our legal team is available to clarify any aspects of our service agreements.</p>
                <a className="text-white text-[10px] font-bold border-b border-secondary/40 pb-1 inline-block uppercase tracking-widest hover:text-secondary transition-colors" href="mailto:legal@sbkheights.com">legal@sbkheights.com</a>
              </div>
            </div>
          </aside>

          <article className="lg:col-span-9 space-y-32">
            <section id="privacy" className="scroll-mt-40">
              <div className="flex items-end gap-4 mb-16">
                <span className="text-6xl font-headline font-bold text-secondary italic leading-none opacity-20">01</span>
                <h2 className="text-4xl md:text-6xl font-headline font-bold text-primary uppercase tracking-tighter italic">Privacy Policy</h2>
              </div>
              
              <div className="space-y-20">
                {privacySections.map((section: any, idx: number) => (
                  <FadeIn key={idx} className="space-y-6">
                    <h3 className="text-xs font-label uppercase tracking-[0.3em] text-secondary font-black flex items-center gap-4">
                      <span className="w-8 h-[1px] bg-secondary/30"></span>
                      {section.title}
                    </h3>
                    <div className="prose prose-slate max-w-none">
                      <p className="text-on-surface-variant text-lg leading-relaxed font-body whitespace-pre-wrap italic opacity-80 pl-12 border-l border-outline-variant/10">{section.content}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </section>

            <FadeIn direction="none" distance={0} className="w-full h-[500px] overflow-hidden relative group">
                <div className="absolute inset-0 bg-primary/20 z-10 group-hover:bg-primary/0 transition-all duration-[2s]"></div>
                <img className="w-full h-full object-cover grayscale scale-110 group-hover:scale-100 transition-all duration-[3s]" src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" alt="Governance Architecture" />
            </FadeIn>

            <section id="terms" className="scroll-mt-40">
              <div className="flex items-end gap-4 mb-16">
                <span className="text-6xl font-headline font-bold text-secondary italic leading-none opacity-20">02</span>
                <h2 className="text-4xl md:text-6xl font-headline font-bold text-primary uppercase tracking-tighter italic">Usage Framework</h2>
              </div>
              
              <div className="space-y-20">
                {termsSections.map((section: any, idx: number) => (
                  <FadeIn key={idx} className="space-y-6">
                    <h3 className="text-xs font-label uppercase tracking-[0.3em] text-secondary font-black flex items-center gap-4">
                      <span className="w-8 h-[1px] bg-secondary/30"></span>
                      {section.title}
                    </h3>
                    <div className="prose prose-slate max-w-none">
                      <p className="text-on-surface-variant text-lg leading-relaxed font-body whitespace-pre-wrap italic opacity-80 pl-12 border-l border-outline-variant/10">{section.content}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </section>

            <section className="bg-primary p-16 md:p-24 text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-2 h-full bg-secondary"></div>
               <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary/5 rounded-full group-hover:bg-secondary/10 transition-all duration-[3s]"></div>
               <h3 className="text-4xl font-headline mb-8 uppercase tracking-tighter italic text-secondary relative z-10">Commitment to Integrity</h3>
               <p className="text-white/40 leading-relaxed mb-12 font-body text-xl italic relative z-10 max-w-2xl">
                 "SBK Heights is built on a foundation of trust. These legal documents ensure our client relationships remain as permanent as the structures we curate."
               </p>
               <button className="bg-secondary text-primary px-12 py-5 text-[10px] font-label font-bold uppercase tracking-[0.3em] hover:bg-white transition-all shadow-xl relative z-10">Download Governance Packet</button>
            </section>
          </article>
        </div>
      </section>
    </div>
  );
}
