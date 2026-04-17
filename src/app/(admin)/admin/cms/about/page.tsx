"use client";
import FadeIn from "@/components/animation/FadeIn";
import { useState, useEffect } from "react";
import { getCMSContent, updateCMSContent } from "@/lib/actions";

export default function AboutCMSEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<any>({
    hero: { badge: "The Vertical Monolith", title: "Architectural Authority Since 1994." },
    intro: { 
      title: "Redefining the Sky’s Limit.", 
      paragraph1: "SBK Heights is more than a developer; we are the curators of the modern skyline. Founded on the principle of structural permanence and aesthetic purity, our firm has spent three decades crafting environments that command respect and offer unrivaled luxury.", 
      paragraph2: "Our philosophy centers on \"The Vertical Monolith\"—the belief that a building should be a singular, powerful statement of intent. We reject the generic in favor of the monumental." 
    },
    portfolio: { 
      completed: [
        { n: "Chambal River Front", loc: "Kota, Rajasthan", val: "₹7 Cr" },
        { n: "Aerodrome Circle", loc: "Kota, Rajasthan", val: "₹8 Cr" },
        { n: "Mumbai Metro Works", loc: "Goregaon/DN Nagar", val: "₹12 Cr" },
        { n: "CGST Building", loc: "Ghaziabad", val: "₹3 Cr" }
      ], 
      ongoing: [
        { n: "Solid Pink Stone Gate", loc: "District Gonda", val: "₹35 Cr" },
        { n: "Spiritual Experience", loc: "Bundi, Rajasthan", val: "₹15.57 Cr" },
        { n: "DMI Bihar", loc: "Bihta, Bihar", val: "₹5 Cr" }
      ] 
    },
    visionaries: [
      { type: "Lead Developer", name: "Sanjay Garg", role: "FOUNDER & VISIONARY", bio: "With a track record of delivering high-impact structural projects across India, Sanjay Garg brings engineering precision and a commitment to quality to the SBK Heights development. Successfully delivered multiple landmark projects including the Chambal River Front." },
      { type: "The Firm", name: "Shree BK Infratech LLP", role: "ENGINEERING EXCELLENCE", bio: "A legacy-driven development firm focused on vertical luxury and structural integrity. Committed to delivering modern, safe, and high-quality residential solutions that offer long-term value for residents and investors alike." }
    ],
    cta: { title: "Witness the Height of Luxury.", primaryBtn: "Request Portfolio", secondaryBtn: "Corporate Overview" },
    principles: [],
    values: []
  });
  const [vision, setVision] = useState<any>({
    hero: { badge: "Monolith Vision", title: "Engineering Eternal Landmarks.", subtitle: "The SBK Ethos" },
    mission: "To architecturally inspire modern urbanity by sculpting vertical monoliths that redefine the standard of luxury. We deliver sustainable, ultra-luxury residential ecosystems that prioritize wellness, security, and unparalleled aesthetic precision. Through engineering excellence, we create eternal landmarks that stand as a testament to structural permanence.",
    vision: "To be the global gold standard in vertical luxury development, where the SBK name is synonymous with the future of urban sophistication. We envision a world where architecture and nature exist in a seamless harmony of glass and steel, inspiring future generations to look upward.",
    values: [
      { icon: "architecture", title: "Structural Integrity", text: "Uncompromising engineering that ensures every development stands as a testament to permanence." },
      { icon: "diamond", title: "Refined Luxury", text: "A curated experience where every texture and finish is selected for its aesthetic purity." },
      { icon: "verified", title: "Absolute Trust", text: "Thirty years of delivering on our promises to the world's most discerning residents." },
      { icon: "public", title: "Global Vision", text: "Integrating international design standards to create world-class living environments." }
    ]
  });
  const [team, setTeam] = useState<any>({ members: [] });

  useEffect(() => {
    async function load() {
      const [aboutData, visionData, teamData] = await Promise.all([
        getCMSContent("about", "all"),
        getCMSContent("vision", "all"),
        getCMSContent("team", "all")
      ]);
      if (aboutData) setContent((prev: any) => ({ ...prev, ...aboutData }));
      if (visionData) setVision(visionData);
      if (teamData) setTeam(teamData);
      setLoading(false);
    }
    load();
  }, []);

  async function handleSave() {
    setSaving(true);
    const [res1, res2, res3] = await Promise.all([
      updateCMSContent("about", "all", content),
      updateCMSContent("vision", "all", vision),
      updateCMSContent("team", "all", team)
    ]);
    if (res1.success && res2.success && res3.success) {
      alert("About Screen updated successfully.");
    } else {
      alert("Error updating some sections. Check console.");
    }
    setSaving(false);
  }

  const addPortfolioItem = (type: 'completed' | 'ongoing') => {
    const newItems = [...content.portfolio[type], { n: "New Project", loc: "Location", val: "₹0 Cr" }];
    setContent({ ...content, portfolio: { ...content.portfolio, [type]: newItems } });
  };

  const removePortfolioItem = (type: 'completed' | 'ongoing', index: number) => {
    const newItems = content.portfolio[type].filter((_: any, i: number) => i !== index);
    setContent({ ...content, portfolio: { ...content.portfolio, [type]: newItems } });
  };

  const addVisionary = () => {
    setContent({
      ...content,
      visionaries: [...content.visionaries, { type: "New Member", name: "", role: "", bio: "" }]
    });
  };

  const removeVisionary = (index: number) => {
    setContent({
      ...content,
      visionaries: content.visionaries.filter((_: any, i: number) => i !== index)
    });
  };

  if (loading) return <span className="p-12 text-primary font-label animate-pulse">Syncing Corporate Identity...</span>;

  return (
    <div className="space-y-12 pb-20">
      <FadeIn>
        <div className="flex justify-between items-end mb-12 border-b border-outline-variant/10 pb-8">
          <div>
            <h1 className="text-4xl font-headline text-primary mb-2">About Company Editor</h1>
            <p className="text-on-surface-variant font-body">Manage the narrative and heritage of SBK Heights.</p>
          </div>
          <button 
            onClick={handleSave} 
            disabled={saving}
            className="px-8 py-4 bg-primary text-white text-xs font-label font-bold uppercase tracking-widest hover:bg-primary/90 transition-all disabled:opacity-50"
          >
            {saving ? "Publishing..." : "Publish Brand Update"}
          </button>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          {/* A. Hero */}
          <FadeIn className="bg-white p-10 border border-outline-variant/10">
            <h3 className="text-xl font-headline text-primary mb-8 pb-4 border-b border-outline-variant/5 uppercase tracking-tighter text-secondary">A. Narrative Hero</h3>
            <div className="space-y-6">
               <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Section Badge</label>
                  <input type="text" value={content.hero.badge} onChange={(e) => setContent({...content, hero: {...content.hero, badge: e.target.value}})} className="w-full bg-surface p-4 text-xs font-label uppercase tracking-widest outline-none" />
               </div>
               <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Main Headline</label>
                  <textarea value={content.hero.title} onChange={(e) => setContent({...content, hero: {...content.hero, title: e.target.value}})} className="w-full bg-surface p-4 text-2xl font-headline text-primary outline-none" />
               </div>
               <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Background Image URL</label>
                  <input type="text" value={content.hero.image || ""} onChange={(e) => setContent({...content, hero: {...content.hero, image: e.target.value}})} className="w-full bg-surface p-4 text-xs font-label outline-none" />
               </div>
            </div>
          </FadeIn>

          {/* B. Corporate Philosophy */}
          <FadeIn className="bg-white p-10 border border-outline-variant/10">
            <h3 className="text-xl font-headline text-primary mb-8 pb-4 border-b border-outline-variant/5 uppercase tracking-tighter text-secondary">B. Corporate Philosophy</h3>
            <div className="space-y-6">
               <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Philosophy Title</label>
                  <input type="text" value={content.intro.title} onChange={(e) => setContent({...content, intro: {...content.intro, title: e.target.value}})} className="w-full bg-surface p-4 text-lg font-headline text-primary outline-none" />
               </div>
               <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Narrative Paragraph 1</label>
                  <textarea value={content.intro.paragraph1} onChange={(e) => setContent({...content, intro: {...content.intro, paragraph1: e.target.value}})} className="w-full bg-surface p-4 text-sm font-body text-on-surface-variant outline-none min-h-[120px]" />
               </div>
               <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Narrative Paragraph 2</label>
                  <textarea value={content.intro.paragraph2} onChange={(e) => setContent({...content, intro: {...content.intro, paragraph2: e.target.value}})} className="w-full bg-surface p-4 text-sm font-body text-on-surface-variant outline-none min-h-[120px]" />
               </div>
            </div>
          </FadeIn>

          {/* C. Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeIn className="bg-white p-10 border border-outline-variant/10">
               <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-6 border-b border-outline-variant/5 pb-4">Mission Statement</h4>
               <textarea 
                 value={vision.mission} 
                 onChange={(e) => setVision({ ...vision, mission: e.target.value })}
                 className="w-full bg-transparent text-sm font-body text-on-surface-variant outline-none leading-loose min-h-[200px]" 
               />
            </FadeIn>
            <FadeIn className="bg-white p-10 border border-outline-variant/10">
               <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-6 border-b border-outline-variant/5 pb-4">Vision Statement</h4>
               <textarea 
                 value={vision.vision} 
                 onChange={(e) => setVision({ ...vision, vision: e.target.value })}
                 className="w-full bg-transparent text-sm font-body text-on-surface-variant outline-none leading-loose min-h-[200px]" 
               />
            </FadeIn>
          </div>

          {/* D. Portfolio of Excellence */}
          <FadeIn className="bg-white p-10 border border-outline-variant/10">
            <h3 className="text-xl font-headline text-primary mb-8 pb-4 border-b border-outline-variant/5 uppercase tracking-tighter text-secondary">D. Portfolio of Excellence</h3>
            <div className="space-y-12">
               {/* Portfolio Image */}
               <div className="space-y-1 pb-8 border-b border-outline-variant/10">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Side Display Image URL</label>
                  <input type="text" value={content.portfolio?.image || ""} onChange={(e) => setContent({...content, portfolio: {...content.portfolio, image: e.target.value}})} className="w-full bg-surface p-4 text-xs font-label outline-none" />
               </div>

               {/* Completed Landmarks */}
               <div>
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-primary">Completed Landmarks</h4>
                    <button onClick={() => addPortfolioItem('completed')} className="text-[10px] text-secondary hover:text-primary transition-colors flex items-center gap-1 font-bold">
                       <span className="material-symbols-outlined text-xs">add_circle</span> Add Project
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {content.portfolio?.completed?.map((p: any, i: number) => (
                      <div key={i} className="p-4 bg-surface border border-outline-variant/10 group">
                        <div className="flex justify-between mb-2">
                           <input type="text" value={p.n} onChange={(e) => {
                             const newC = [...content.portfolio.completed];
                             newC[i].n = e.target.value;
                             setContent({...content, portfolio: {...content.portfolio, completed: newC}});
                           }} className="bg-transparent font-bold text-xs uppercase text-primary outline-none flex-1" />
                           <button onClick={() => removePortfolioItem('completed', i)} className="text-primary/10 hover:text-red-500 transition-colors">
                             <span className="material-symbols-outlined text-xs">delete</span>
                           </button>
                        </div>
                        <div className="flex gap-4">
                           <input type="text" value={p.loc} onChange={(e) => {
                             const newC = [...content.portfolio.completed];
                             newC[i].loc = e.target.value;
                             setContent({...content, portfolio: {...content.portfolio, completed: newC}});
                           }} className="bg-transparent text-[10px] text-on-surface-variant/60 outline-none w-1/2" placeholder="Location" />
                           <input type="text" value={p.val} onChange={(e) => {
                             const newC = [...content.portfolio.completed];
                             newC[i].val = e.target.value;
                             setContent({...content, portfolio: {...content.portfolio, completed: newC}});
                           }} className="bg-transparent text-[10px] text-on-surface-variant/60 outline-none w-1/2 text-right" placeholder="Value" />
                        </div>
                      </div>
                    ))}
                  </div>
               </div>

               {/* Ongoing Developments */}
               <div>
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-primary">Ongoing Developments</h4>
                    <button onClick={() => addPortfolioItem('ongoing')} className="text-[10px] text-secondary hover:text-primary transition-colors flex items-center gap-1 font-bold">
                       <span className="material-symbols-outlined text-xs">add_circle</span> Add Project
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {content.portfolio?.ongoing?.map((p: any, i: number) => (
                      <div key={i} className="p-4 bg-primary/5 border border-outline-variant/10 group">
                        <div className="flex justify-between mb-2">
                           <input type="text" value={p.n} onChange={(e) => {
                             const newO = [...content.portfolio.ongoing];
                             newO[i].n = e.target.value;
                             setContent({...content, portfolio: {...content.portfolio, ongoing: newO}});
                           }} className="bg-transparent font-bold text-xs uppercase text-primary outline-none flex-1" />
                           <button onClick={() => removePortfolioItem('ongoing', i)} className="text-primary/10 hover:text-red-500 transition-colors">
                             <span className="material-symbols-outlined text-xs">delete</span>
                           </button>
                        </div>
                        <div className="flex gap-4">
                           <input type="text" value={p.loc} onChange={(e) => {
                             const newO = [...content.portfolio.ongoing];
                             newO[i].loc = e.target.value;
                             setContent({...content, portfolio: {...content.portfolio, ongoing: newO}});
                           }} className="bg-transparent text-[10px] text-on-surface-variant/60 outline-none w-1/2" placeholder="Location" />
                           <input type="text" value={p.val} onChange={(e) => {
                             const newO = [...content.portfolio.ongoing];
                             newO[i].val = e.target.value;
                             setContent({...content, portfolio: {...content.portfolio, ongoing: newO}});
                           }} className="bg-transparent text-[10px] text-on-surface-variant/60 outline-none w-1/2 text-right" placeholder="Value" />
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </FadeIn>

          {/* E. Core Visionaries */}
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-headline text-primary uppercase tracking-tighter text-secondary">E. Core Visionaries</h3>
              <button onClick={addVisionary} className="px-4 py-2 border border-secondary text-secondary text-[10px] font-bold uppercase tracking-widest hover:bg-secondary hover:text-white transition-all flex items-center gap-2">
                <span className="material-symbols-outlined text-xs">add_circle</span> Add Member
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {content.visionaries?.map((v: any, i: number) => (
                <FadeIn key={i} className={`p-10 border border-outline-variant/10 ${i % 2 === 1 ? 'bg-primary text-white' : 'bg-surface'}`}>
                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                       <input type="text" value={v.type} onChange={(e) => {
                         const newV = [...content.visionaries];
                         newV[i].type = e.target.value;
                         setContent({...content, visionaries: newV});
                       }} className={`font-label uppercase tracking-widest text-[10px] font-black block bg-transparent outline-none w-full ${i % 2 === 1 ? 'text-secondary-container' : 'text-secondary'}`} />
                       <button onClick={() => removeVisionary(i)} className={`${i % 2 === 1 ? 'text-white/20 hover:text-red-400' : 'text-primary/20 hover:text-red-500'} transition-colors ml-4`}>
                         <span className="material-symbols-outlined text-xs">delete</span>
                       </button>
                    </div>
                    <div className="space-y-1">
                      <label className={`text-[8px] uppercase tracking-tighter ${i % 2 === 1 ? 'text-white/40' : 'text-on-surface-variant/40'}`}>Full Name</label>
                      <input type="text" value={v.name} onChange={(e) => {
                        const newV = [...content.visionaries];
                        newV[i].name = e.target.value;
                        setContent({...content, visionaries: newV});
                      }} className={`w-full bg-transparent text-3xl font-headline outline-none italic ${i % 2 === 1 ? 'text-white' : 'text-primary'}`} />
                    </div>
                    <div className="space-y-1">
                      <label className={`text-[8px] uppercase tracking-tighter ${i % 2 === 1 ? 'text-white/40' : 'text-on-surface-variant/40'}`}>Role Tile</label>
                      <input type="text" value={v.role} onChange={(e) => {
                        const newV = [...content.visionaries];
                        newV[i].role = e.target.value;
                        setContent({...content, visionaries: newV});
                      }} className={`w-full bg-transparent text-xs font-label uppercase tracking-widest outline-none ${i % 2 === 1 ? 'text-secondary-container' : 'text-secondary'}`} />
                    </div>
                    <div className="space-y-1">
                      <label className={`text-[8px] uppercase tracking-tighter ${i % 2 === 1 ? 'text-white/40' : 'text-on-surface-variant/40'}`}>Narrative Bio</label>
                      <textarea value={v.bio} onChange={(e) => {
                        const newV = [...content.visionaries];
                        newV[i].bio = e.target.value;
                        setContent({...content, visionaries: newV});
                      }} className={`w-full bg-transparent text-sm leading-relaxed outline-none min-h-[120px] resize-none ${i % 2 === 1 ? 'text-white/60' : 'text-on-surface-variant'}`} />
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-12">
            {/* Core Values */}
            <FadeIn className="bg-secondary p-8 text-primary">
               <h3 className="text-lg font-headline mb-6 pb-2 border-b border-primary/10">Core Values</h3>
               <div className="space-y-6">
                  {vision.values.map((v: any, i: number) => (
                    <div key={i} className="space-y-2">
                       <input type="text" value={v.title} onChange={(e) => {
                         const newV = [...vision.values];
                         newV[i].title = e.target.value;
                         setVision({...vision, values: newV});
                       }} className="bg-transparent text-xs font-bold uppercase tracking-widest text-primary outline-none block w-full" />
                       <textarea value={v.text} onChange={(e) => {
                         const newV = [...vision.values];
                         newV[i].text = e.target.value;
                         setVision({...vision, values: newV});
                       }} className="bg-transparent text-[10px] text-primary/60 w-full outline-none resize-none" rows={2} />
                    </div>
                  ))}
               </div>
            </FadeIn>

            {/* CTA */}
            <FadeIn className="bg-primary/5 p-8 border border-primary/10">
               <h3 className="text-lg font-headline text-primary mb-6 pb-2 border-b border-primary/10">Bottom CTA</h3>
               <div className="space-y-4">
                  <div className="space-y-1">
                     <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">CTA Title</label>
                     <textarea value={content.cta.title} onChange={(e) => setContent({...content, cta: {...content.cta, title: e.target.value}})} className="w-full bg-surface p-4 text-sm font-headline text-primary outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Primary Link</label>
                        <input type="text" value={content.cta.primaryBtn} onChange={(e) => setContent({...content, cta: {...content.cta, primaryBtn: e.target.value}})} className="w-full bg-surface p-3 text-[10px] uppercase tracking-widest outline-none" />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Secondary Link</label>
                        <input type="text" value={content.cta.secondaryBtn} onChange={(e) => setContent({...content, cta: {...content.cta, secondaryBtn: e.target.value}})} className="w-full bg-surface p-3 text-[10px] uppercase tracking-widest outline-none" />
                     </div>
                  </div>
               </div>
            </FadeIn>
        </div>
      </div>
    </div>
  );
}
