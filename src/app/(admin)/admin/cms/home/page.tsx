"use client";
import FadeIn from "@/components/animation/FadeIn";
import { useState, useEffect } from "react";
import { getCMSContent, updateCMSContent } from "@/lib/actions";

export default function HomeCMSEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<any>({
    hero: { badge: "", title: "", subtitle: "", primaryBtn: "", secondaryBtn: "" },
    vision: { title: "", about_text: "", mission_text: "", quote: "" },
    cta: { title: "", stats: [] }
  });
  const [pillars, setPillars] = useState<any>({ title: "", subtitle: "", pillars: [] });

  useEffect(() => {
    async function load() {
      const [homeData, pillarData] = await Promise.all([
        getCMSContent("home", "all"),
        getCMSContent("why-choose-us", "pillars")
      ]);
      if (homeData) setContent(homeData);
      if (pillarData) setPillars(pillarData);
      setLoading(false);
    }
    load();
  }, []);

  async function handleSave() {
    setSaving(true);
    const [res1, res2] = await Promise.all([
      updateCMSContent("home", "all", content),
      updateCMSContent("why-choose-us", "pillars", pillars)
    ]);
    
    if (res1.success && res2.success) {
      alert("Home Screen updated successfully.");
    } else {
      alert("Error updating some sections. Check console.");
    }
    setSaving(false);
  }

  const addStat = () => {
    const newStats = [...content.cta.stats, { val: "0", label: "New Stat" }];
    setContent({ ...content, cta: { ...content.cta, stats: newStats } });
  };

  const removeStat = (index: number) => {
    const newStats = content.cta.stats.filter((_: any, i: number) => i !== index);
    setContent({ ...content, cta: { ...content.cta, stats: newStats } });
  };

  const addPillar = () => {
    const newP = [...pillars.pillars, { title: "New Feature", icon: "star", desc: "Description here" }];
    setPillars({ ...pillars, pillars: newP });
  };

  const removePillar = (index: number) => {
    const newP = pillars.pillars.filter((_: any, i: number) => i !== index);
    setPillars({ ...pillars, pillars: newP });
  };

  if (loading) return <div className="p-12 text-primary font-label animate-pulse">Initializing Data Stream...</div>;

  return (
    <div className="space-y-12 pb-20">
      <FadeIn>
        <div className="flex justify-between items-end mb-12 border-b border-outline-variant/10 pb-8">
          <div>
            <h1 className="text-4xl font-headline text-primary mb-2">Home Page Editor</h1>
            <p className="text-on-surface-variant font-body">Manage the landing experience for SBK Heights.</p>
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={handleSave}
              disabled={saving}
              className="px-8 py-4 bg-primary text-white text-xs font-label font-bold uppercase tracking-widest hover:bg-primary/90 transition-all disabled:opacity-50"
            >
              {saving ? "Publishing..." : "Publish All Changes"}
            </button>
          </div>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          {/* 1. Hero Section */}
          <FadeIn className="bg-white p-10 border border-outline-variant/10">
            <h3 className="text-xl font-headline text-primary mb-8 pb-4 border-b border-outline-variant/5 uppercase tracking-tighter">1. Hero Section</h3>
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Badge Text</label>
                  <input 
                    type="text" 
                    value={content.hero.badge} 
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, badge: e.target.value } })}
                    className="w-full bg-surface p-4 text-xs font-label uppercase tracking-widest outline-none border-b border-transparent focus:border-secondary transition-all" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Main Title</label>
                <textarea 
                  value={content.hero.title} 
                  onChange={(e) => setContent({ ...content, hero: { ...content.hero, title: e.target.value } })}
                  className="w-full bg-surface p-4 text-2xl font-headline text-primary outline-none border-b border-transparent focus:border-secondary transition-all min-h-[100px]" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Subtitle</label>
                <textarea 
                  value={content.hero.subtitle} 
                  onChange={(e) => setContent({ ...content, hero: { ...content.hero, subtitle: e.target.value } })}
                  className="w-full bg-surface p-4 text-sm font-body text-on-surface-variant outline-none border-b border-transparent focus:border-secondary transition-all min-h-[100px]" 
                />
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Primary Button</label>
                  <input 
                    type="text" 
                    value={content.hero.primaryBtn} 
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, primaryBtn: e.target.value } })}
                    className="w-full bg-surface p-4 text-xs font-label uppercase tracking-widest outline-none border-b border-transparent focus:border-secondary transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Secondary Button</label>
                  <input 
                    type="text" 
                    value={content.hero.secondaryBtn} 
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, secondaryBtn: e.target.value } })}
                    className="w-full bg-surface p-4 text-xs font-label uppercase tracking-widest outline-none border-b border-transparent focus:border-secondary transition-all" 
                  />
                </div>
              </div>
            </div>
          </FadeIn>

          {/* 2. Vision Section */}
          <FadeIn className="bg-white p-10 border border-outline-variant/10">
            <h3 className="text-xl font-headline text-primary mb-8 pb-4 border-b border-outline-variant/5 uppercase tracking-tighter">2. Vision Section</h3>
            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Vision Title</label>
                <input 
                  type="text" 
                  value={content.vision.title} 
                  onChange={(e) => setContent({ ...content, vision: { ...content.vision, title: e.target.value } })}
                  className="w-full bg-surface p-4 text-lg font-headline text-primary outline-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Main Text (Paragraph One)</label>
                <textarea 
                  value={content.vision.about_text || content.vision.text} 
                  onChange={(e) => setContent({ ...content, vision: { ...content.vision, about_text: e.target.value, text: e.target.value } })}
                  className="w-full bg-surface p-4 text-sm font-body text-on-surface-variant outline-none min-h-[120px]" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Mission Text (Highlighted Quote)</label>
                <textarea 
                  value={content.vision.mission_text} 
                  onChange={(e) => setContent({ ...content, vision: { ...content.vision, mission_text: e.target.value } })}
                  className="w-full bg-surface p-4 text-sm font-headline font-bold text-primary outline-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Attribution Quote</label>
                <input 
                  type="text" 
                  value={content.vision.quote} 
                  onChange={(e) => setContent({ ...content, vision: { ...content.vision, quote: e.target.value } })}
                  className="w-full bg-surface p-4 text-xs font-label uppercase tracking-widest outline-none" 
                />
              </div>
            </div>
          </FadeIn>

          {/* 3. Excellence / Why Choose Us */}
          <FadeIn className="bg-white p-10 border border-outline-variant/10">
            <h3 className="text-xl font-headline text-primary mb-8 pb-4 border-b border-outline-variant/5 uppercase tracking-tighter">3. Pillars of Excellence</h3>
            <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Section Title</label>
                  <input 
                    type="text" 
                    value={pillars.title} 
                    onChange={(e) => setPillars({ ...pillars, title: e.target.value })}
                    className="w-full bg-surface p-4 text-sm font-headline text-primary outline-none" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Section Subtitle</label>
                  <input 
                    type="text" 
                    value={pillars.subtitle} 
                    onChange={(e) => setPillars({ ...pillars, subtitle: e.target.value })}
                    className="w-full bg-surface p-4 text-[10px] font-label uppercase tracking-widest outline-none" 
                  />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {pillars.pillars.map((item: any, i: number) => (
                <div key={i} className="p-6 bg-surface border border-outline-variant/10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="material-symbols-outlined text-secondary text-2xl">{item.icon}</span>
                    <input 
                      type="text" 
                      value={item.icon} 
                      onChange={(e) => {
                        const newP = [...pillars.pillars];
                        newP[i].icon = e.target.value;
                        setPillars({ ...pillars, pillars: newP });
                      }}
                      className="bg-transparent text-[8px] font-mono text-secondary outline-none border border-outline-variant/10 px-1" 
                    />
                  </div>
                  <input 
                    type="text" 
                    value={item.title} 
                    onChange={(e) => {
                      const newP = [...pillars.pillars];
                      newP[i].title = e.target.value;
                      setPillars({ ...pillars, pillars: newP });
                    }}
                    className="w-full bg-transparent font-bold text-xs uppercase tracking-widest mb-2 outline-none border-b border-transparent focus:border-secondary transition-all" 
                  />
                  <textarea 
                    value={item.desc} 
                    onChange={(e) => {
                      const newP = [...pillars.pillars];
                      newP[i].desc = e.target.value;
                      setPillars({ ...pillars, pillars: newP });
                    }}
                    className="w-full bg-transparent text-[10px] font-light leading-relaxed outline-none resize-none min-h-[100px]" rows={3} 
                  />
                  <div className="flex justify-end mt-4">
                    <button 
                      onClick={() => removePillar(i)}
                      className="text-[8px] font-bold uppercase tracking-widest text-primary/20 hover:text-red-500 transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-xs">delete</span> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <button 
                onClick={addPillar}
                className="px-6 py-3 border border-dashed border-secondary/30 text-secondary text-[10px] font-bold uppercase tracking-widest hover:bg-secondary/5 transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">add_circle</span> Add Pillar
              </button>
            </div>
          </FadeIn>
        </div>

        <div className="lg:col-span-4 space-y-12">
          {/* CTA + Stats */}
          <FadeIn className="bg-white p-8 border border-outline-variant/10">
            <h3 className="text-lg font-headline text-primary mb-6 pb-2 border-b border-outline-variant/5">CTA & Stats</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">CTA Title</label>
                <input 
                  type="text" 
                  value={content.cta.title} 
                  onChange={(e) => setContent({ ...content, cta: { ...content.cta, title: e.target.value } })}
                  className="w-full bg-surface p-3 text-sm font-bold text-primary outline-none" 
                />
              </div>
              <div className="grid grid-cols-1 gap-4 pt-4 border-t border-outline-variant/5">
                {content.cta.stats.map((stat: any, i: number) => (
                  <div key={i} className="flex items-center space-x-4 bg-surface p-2">
                    <input 
                      type="text" 
                      value={stat.val} 
                      onChange={(e) => {
                        const newStats = [...content.cta.stats];
                        newStats[i].val = e.target.value;
                        setContent({ ...content, cta: { ...content.cta, stats: newStats } });
                      }}
                      className="w-20 bg-white p-2 text-sm font-headline text-primary text-center outline-none" 
                    />
                    <input 
                      type="text" 
                      value={stat.label} 
                      onChange={(e) => {
                        const newStats = [...content.cta.stats];
                        newStats[i].label = e.target.value;
                        setContent({ ...content, cta: { ...content.cta, stats: newStats } });
                      }}
                      className="flex-1 bg-transparent text-[9px] font-bold uppercase tracking-widest text-on-surface-variant outline-none" 
                    />
                    <button 
                      onClick={() => removeStat(i)}
                      className="text-primary/10 hover:text-red-500 transition-colors p-1"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                ))}
                <button 
                  onClick={addStat}
                  className="w-full text-[9px] font-bold uppercase tracking-[0.2em] text-secondary hover:text-primary transition-colors mt-4 py-3 border border-dashed border-secondary/20"
                >
                  + Add New Stat
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
