"use client";
import FadeIn from "@/components/animation/FadeIn";
import { useState, useEffect } from "react";
import { getCMSContent, updateCMSContent } from "@/lib/actions";

export default function ProjectCMSEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<any>({
    hero: {
      badge: "The Residency",
      title: "SBK Heights \nResidential Suites",
      stats: [
        { label: "Location", val: "Sector 45, Noida" },
        { label: "Structure", val: "Basement + G + 7 Floors" },
        { label: "Property Type", val: "Freehold" },
      ],
    },
    units: [
      {
        type: "3 BHK Floor Plan",
        image: "/images/bhk_3.png",
        specs: [
          { label: "Area", val: "1750 sq. ft." },
          { label: "Interior", val: "1600 sq. ft." },
          { label: "Bedrooms", val: "3 Bedrooms" },
          { label: "Bathrooms", val: "3 Bathrooms" },
          { label: "Pool Access", val: "Private Access" },
          { label: "Additionals", val: "Study Room" },
        ]
      },
    ],
    details: {
      title: "Property Details",
      subtitle: "In our society you will get multiple amenities like this.",
    },
    facilities_meta: {
      title: "Modern Amenities",
      subtitle: "Designed to facilitate an effortless lifestyle, our premium facilities ensure safety, health, and convenience at every turn.",
    },
    legal_meta: {
      title: "Legal & Compliance",
      subtitle: "All legal and land-related documents for SBK Heights are verified and cleared by the respective authorities.",
    },
    partners_meta: { title: "Loan Partners", subtitle: "" },
    facilities: [
      {
        name: "Terrace Garden",
        icon: "park",
        desc: "Serene green escape with panoramic city views.",
      },
      {
        name: "Modern Gym",
        icon: "fitness_center",
        desc: "Fully equipped wellness studio for residents.",
      },
      {
        name: "24x7 Security",
        icon: "security",
        desc: "Advanced surveillance and on-site guards.",
      },
      {
        name: "Retail Stores",
        icon: "shopping_basket",
        desc: "Daily essentials available within the perimeter.",
      },
    ],
    legal: [
      "Registry / Sale Deed",
      "Khata / Khasra Details",
      "Approved Layout Plan",
      "Local Authority Approvals",
      "Freehold Verification",
      "Clear Land Title",
    ],
    partners: [
      { name: "Piramal Finance", logo: "/images/piramal.png" },
      { name: "Aadhar Housing Finance", logo: "/images/aadhar.png" },
      { name: "GIC Housing Finance", logo: "/images/gic.png" },
      { name: "ICICI Bank", logo: "/images/icici.png" },
      { name: "PNB Housing Finance", logo: "/images/pnb.png" },
    ],
    cta: {
      title: "Secure Your Unit",
      desc: "Private viewings for our 1, 2, and 3 BHK models are available by appointment. Contact our concierge to schedule your experience.",
    },
  });

  useEffect(() => {
    async function load() {
      const data = await getCMSContent("project", "main");
      if (data) {
        // Robust normalization for legacy data structures
        const normalizedUnits = (data.units || []).map((u: any) => {
          if (typeof u === "string") {
            let img = "/images/bhk_3.png";
            if (u.includes("2")) img = "/images/bhk_2.png";
            if (u.includes("1")) img = "/images/bhk_1.png";
            return {
              type: u,
              image: img,
              specs: []
            };
          }
          // Migration from legacy fixed keys to dynamic specs
          if (!u.specs) {
            const specs = [
              { label: "Total Area", val: u.area || "" },
              { label: "Interior", val: u.interior || "" },
              { label: "Bedrooms", val: u.beds || "" },
              { label: "Bathrooms", val: u.baths || "" },
              { label: "Pool Access", val: u.pool || "" },
              { label: "Additionals", val: u.additionals || "" },
            ].filter(s => s.val); // Only keep non-empty specs
            return { ...u, specs };
          }
          return u;
        });

        const normalizedFacilities = (data.facilities || []).map((f: any) =>
          typeof f === "string" ? { name: f, icon: "star", desc: "" } : f,
        );

        const normalizedPartners = (data.partners || []).map((p: any) => {
          if (typeof p === "string") {
            let logo = "";
            const name = p.toLowerCase();
            if (name.includes("piramal")) logo = "/images/piramal.png";
            else if (name.includes("aadhar")) logo = "/images/aadhar.png";
            else if (name.includes("gic")) logo = "/images/gic.png";
            else if (name.includes("icici")) logo = "/images/icici.png";
            else if (name.includes("pnb")) logo = "/images/pnb.png";
            return { name: p, logo };
          }
          return p;
        });

        setContent({
          ...content,
          ...data,
          hero: { ...content.hero, ...data.hero },
          details: { ...content.details, ...data.details },
          facilities_meta: {
            ...content.facilities_meta,
            ...data.facilities_meta,
          },
          legal_meta: { ...content.legal_meta, ...data.legal_meta },
          partners_meta: { ...content.partners_meta, ...data.partners_meta },
          units: normalizedUnits,
          facilities: normalizedFacilities,
          partners: normalizedPartners,
          cta: { ...content.cta, ...data.cta },
        });
      }
      setLoading(false);
    }
    load();
  }, []);

  async function handleSave() {
    setSaving(true);
    const result = await updateCMSContent("project", "main", content);
    if (result.success) {
      alert("Project screen synchronized.");
    } else {
      alert("Error: " + result.error);
    }
    setSaving(false);
  }

  const addUnit = () =>
    setContent({
      ...content,
      units: [
        ...content.units,
        {
          type: "New Unit Type",
          image: "",
          specs: [
            { label: "Area", val: "" },
            { label: "Beds", val: "" }
          ],
        },
      ],
    });

  const addSpec = (unitIdx: number) => {
    const newUnits = [...content.units];
    newUnits[unitIdx].specs = [...(newUnits[unitIdx].specs || []), { label: "New Spec", val: "" }];
    setContent({ ...content, units: newUnits });
  };

  const removeSpec = (unitIdx: number, specIdx: number) => {
    const newUnits = [...content.units];
    newUnits[unitIdx].specs = newUnits[unitIdx].specs.filter((_: any, idx: number) => idx !== specIdx);
    setContent({ ...content, units: newUnits });
  };
  const removeUnit = (i: number) =>
    setContent({
      ...content,
      units: content.units.filter((_: any, idx: number) => idx !== i),
    });

  const addFacility = () =>
    setContent({
      ...content,
      facilities: [
        ...content.facilities,
        { name: "New Amenity", icon: "star", desc: "" },
      ],
    });
  const removeFacility = (i: number) =>
    setContent({
      ...content,
      facilities: content.facilities.filter((_: any, idx: number) => idx !== i),
    });

  const addPartner = () =>
    setContent({
      ...content,
      partners: [...content.partners, { name: "New Partner", logo: "" }],
    });
  const removePartner = (i: number) =>
    setContent({
      ...content,
      partners: content.partners.filter((_: any, idx: number) => idx !== i),
    });

  const addLegal = () =>
    setContent({ ...content, legal: [...content.legal, "New Document"] });
  const removeLegal = (i: number) =>
    setContent({
      ...content,
      legal: content.legal.filter((_: any, idx: number) => idx !== i),
    });

  if (loading)
    return (
      <div className="p-12 text-primary font-label animate-pulse italic">
        Connecting to Project Architecture...
      </div>
    );

  return (
    <div className="space-y-12 pb-20">
      <FadeIn>
        <div className="flex justify-between items-end mb-12 border-b border-outline-variant/10 pb-8">
          <div>
            <h1 className="text-4xl font-headline text-primary mb-2 uppercase">
              Project Screen Editor
            </h1>
            <p className="text-on-surface-variant font-body">
              Complete management of 'The Residency' specifications and
              amenities.
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-8 py-4 bg-primary text-white text-xs font-label font-bold uppercase tracking-[0.2rem] hover:bg-secondary hover:text-primary transition-all disabled:opacity-50 shadow-xl"
          >
            {saving ? "Synchronizing..." : "Publish & Sync"}
          </button>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          <FadeIn className="bg-white p-10 border border-outline-variant/10 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 -mr-16 -mt-16 group-hover:bg-secondary/10 transition-colors duration-700"></div>
            <h3 className="text-xl font-headline text-primary mb-8 pb-4 border-b border-outline-variant/5 uppercase tracking-tighter">
              1. Hero & Core Specs
            </h3>
            <div className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">
                    Badge
                  </label>
                  <input
                    type="text"
                    value={content.hero.badge}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, badge: e.target.value },
                      })
                    }
                    className="w-full bg-surface p-4 text-xs font-label uppercase tracking-widest outline-none border border-transparent focus:border-secondary transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                    Main Heading
                  </label>
                  <textarea
                    value={content.hero.title}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, title: e.target.value },
                      })
                    }
                    className="w-full bg-surface p-4 text-lg font-headline text-primary outline-none border border-transparent focus:border-secondary transition-all whitespace-pre-line"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">
                  Hero Background Image Path
                </label>
                <input
                  type="text"
                  value={content.hero.bgImage || "/images/bhk_3.png"}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, bgImage: e.target.value },
                    })
                  }
                  className="w-full bg-surface p-4 text-xs font-label text-on-surface-variant outline-none border border-transparent focus:border-secondary transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-outline-variant/5 text-center">
                {content.hero.stats.map((stat: any, i: number) => (
                  <div key={i} className="bg-surface p-6 space-y-2 group/stat">
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => {
                        const newS = [...content.hero.stats];
                        newS[i].label = e.target.value;
                        setContent({
                          ...content,
                          hero: { ...content.hero, stats: newS },
                        });
                      }}
                      className="w-full bg-transparent text-[8px] font-bold text-on-surface-variant/50 uppercase tracking-widest outline-none text-center group-hover/stat:text-secondary transition-colors"
                    />
                    <input
                      type="text"
                      value={stat.val}
                      onChange={(e) => {
                        const newS = [...content.hero.stats];
                        newS[i].val = e.target.value;
                        setContent({
                          ...content,
                          hero: { ...content.hero, stats: newS },
                        });
                      }}
                      className="w-full bg-transparent text-xs font-black text-primary uppercase outline-none text-center"
                    />
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn className="bg-white p-10 border border-outline-variant/10 shadow-sm relative">
            <div className="flex justify-between items-center mb-10 border-b border-outline-variant/5 pb-4">
              <h3 className="text-xl font-headline text-primary uppercase tracking-tighter">
                Property Introduction
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-secondary tracking-widest">Section Label</label>
                <input
                  type="text"
                  value={content.details.title}
                  onChange={(e) => setContent({...content, details: {...content.details, title: e.target.value}})}
                  className="w-full bg-surface p-4 text-xs font-black text-primary outline-none focus:border-secondary transition-all uppercase"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-on-surface-variant tracking-widest">Section Subtitle</label>
                <textarea
                  value={content.details.subtitle}
                  onChange={(e) => setContent({...content, details: {...content.details, subtitle: e.target.value}})}
                  className="w-full bg-surface p-4 text-[10px] font-body text-on-surface-variant outline-none focus:border-secondary transition-all resize-none h-20"
                />
              </div>
            </div>
          </FadeIn>

          <FadeIn className="bg-white p-10 border border-outline-variant/10 shadow-sm relative">
            <div className="flex justify-between items-center mb-10 border-b border-outline-variant/5 pb-4">
              <div className="space-y-2 flex-1">
                <label className="text-[10px] font-bold uppercase text-secondary tracking-widest">Section Heading</label>
                <input
                  type="text"
                  value={content.units_meta?.title || "Unit Configuration"}
                  onChange={(e) => setContent({...content, units_meta: {...(content.units_meta || {}), title: e.target.value}})}
                  className="w-full bg-transparent text-xl font-headline text-primary uppercase tracking-tighter outline-none"
                />
              </div>
              <button
                onClick={addUnit}
                className="text-[10px] font-black uppercase text-secondary border border-secondary/20 px-4 py-2 hover:bg-secondary hover:text-primary transition-all self-end"
              >
                Add Unit Type
              </button>
            </div>
            <div className="space-y-12">
              {(content.units || []).map((unit: any, i: number) => (
                <div
                  key={i}
                  className="p-8 bg-surface space-y-8 relative group border border-transparent hover:border-outline-variant/10 transition-all"
                >
                  <button
                    onClick={() => removeUnit(i)}
                    className="absolute top-4 right-4 text-on-surface-variant/20 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">
                      delete
                    </span>
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-secondary">
                        Unit Title
                      </label>
                      <input
                        type="text"
                        value={unit.type}
                        onChange={(e) => {
                          const newU = [...content.units];
                          newU[i].type = e.target.value;
                          setContent({ ...content, units: newU });
                        }}
                        className="w-full bg-white border border-outline-variant/10 p-4 text-xs font-black text-primary outline-none focus:border-secondary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-secondary">
                        Image Path / URL
                      </label>
                      <input
                        type="text"
                        value={unit.image}
                        onChange={(e) => {
                          const newU = [...content.units];
                          newU[i].image = e.target.value;
                          setContent({ ...content, units: newU });
                        }}
                        className="w-full bg-white border border-outline-variant/10 p-4 text-xs font-label text-primary outline-none focus:border-secondary"
                      />
                    </div>
                  </div>
                  <div className="space-y-6 pt-6 border-t border-outline-variant/5">
                    <div className="flex justify-between items-center">
                       <label className="text-[10px] font-bold uppercase text-secondary tracking-widest">
                        Unit Specifications
                      </label>
                      <button 
                        onClick={() => addSpec(i)}
                        className="text-[10px] font-black uppercase text-secondary/60 hover:text-secondary"
                      >
                        + Add Spec
                      </button>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                      {(unit.specs || []).map((spec: any, j: number) => (
                        <div key={j} className="bg-white border border-outline-variant/10 p-4 relative group/spec">
                          <button 
                            onClick={() => removeSpec(i, j)}
                            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover/spec:opacity-100 transition-all z-10"
                          >
                            <span className="material-symbols-outlined text-[10px]">close</span>
                          </button>
                          <input 
                            type="text"
                            value={spec.label}
                            placeholder="Label (e.g. Area)"
                            onChange={(e) => {
                              const newU = [...content.units];
                              newU[i].specs[j].label = e.target.value;
                              setContent({ ...content, units: newU });
                            }}
                            className="w-full bg-transparent text-[8px] font-bold text-secondary uppercase tracking-widest outline-none mb-1"
                          />
                          <input 
                            type="text"
                            value={spec.val}
                            placeholder="Value"
                            onChange={(e) => {
                              const newU = [...content.units];
                              newU[i].specs[j].val = e.target.value;
                              setContent({ ...content, units: newU });
                            }}
                            className="w-full bg-transparent text-xs font-headline text-primary font-bold outline-none"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn className="bg-white p-10 border border-outline-variant/10 shadow-sm">
            <div className="flex justify-between items-center mb-10 border-b border-outline-variant/5 pb-4">
              <div className="space-y-6 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-secondary tracking-widest">Amenities Heading</label>
                    <input
                      type="text"
                      value={content.facilities_meta.title}
                      onChange={(e) => setContent({...content, facilities_meta: {...content.facilities_meta, title: e.target.value}})}
                      className="w-full bg-surface p-4 text-xs font-black text-primary outline-none focus:border-secondary transition-all uppercase"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-secondary tracking-widest">Amenities Subtitle</label>
                    <textarea
                      value={content.facilities_meta.subtitle}
                      onChange={(e) => setContent({...content, facilities_meta: {...content.facilities_meta, subtitle: e.target.value}})}
                      className="w-full bg-surface p-4 text-[10px] font-body text-on-surface-variant outline-none focus:border-secondary transition-all resize-none h-20"
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={addFacility}
                className="text-[10px] font-black uppercase text-secondary border border-secondary/20 px-4 py-2 hover:bg-secondary hover:text-primary transition-all self-end ml-4"
              >
                Add Amenity
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(content.facilities || []).map((f: any, i: number) => (
                <div
                  key={i}
                  className="p-6 bg-surface space-y-4 group relative border border-transparent hover:border-outline-variant/10"
                >
                  <button
                    onClick={() => removeFacility(i)}
                    className="absolute top-4 right-4 text-on-surface-variant/20 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all font-label"
                  >
                    <span className="material-symbols-outlined text-sm">
                      delete
                    </span>
                  </button>
                  <div className="flex gap-4">
                    <div className="space-y-1 flex-1">
                      <label className="text-[10px] font-bold uppercase text-secondary tracking-widest">
                        Icon Name
                      </label>
                      <input
                        type="text"
                        value={f.icon}
                        onChange={(e) => {
                          const newF = [...content.facilities];
                          newF[i].icon = e.target.value;
                          setContent({ ...content, facilities: newF });
                        }}
                        className="w-full bg-white border border-outline-variant/10 p-3 text-xs font-black text-primary outline-none focus:border-secondary"
                      />
                    </div>
                    <div className="space-y-1 flex-[2]">
                      <label className="text-[10px] font-bold uppercase text-on-surface-variant tracking-widest">
                        Amenity Name
                      </label>
                      <input
                        type="text"
                        value={f.name}
                        onChange={(e) => {
                          const newF = [...content.facilities];
                          newF[i].name = e.target.value;
                          setContent({ ...content, facilities: newF });
                        }}
                        className="w-full bg-white border border-outline-variant/10 p-3 text-xs font-black text-primary outline-none focus:border-secondary"
                      />
                    </div>
                  </div>
                  <textarea
                    value={f.desc}
                    placeholder="Description..."
                    onChange={(e) => {
                      const newF = [...content.facilities];
                      newF[i].desc = e.target.value;
                      setContent({ ...content, facilities: newF });
                    }}
                    className="w-full bg-white border border-outline-variant/10 p-4 text-[10px] font-body text-on-surface-variant outline-none focus:border-secondary h-20 resize-none"
                  />
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        <div className="lg:col-span-4 space-y-12">
          <FadeIn className="bg-primary p-8 text-white relative group overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-2 h-full bg-secondary"></div>
            <div className="flex justify-between items-center mb-8 pb-2 border-b border-white/5">
              <div className="space-y-4 flex-1">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-secondary tracking-tighter">Legal Heading</label>
                  <input
                    type="text"
                    value={content.legal_meta.title}
                    onChange={(e) => setContent({...content, legal_meta: {...content.legal_meta, title: e.target.value}})}
                    className="w-full bg-white/10 border border-white/10 p-4 text-xs font-black text-secondary outline-none focus:border-secondary transition-all uppercase"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-white/40 tracking-tighter">Legal Subtitle</label>
                  <textarea
                    value={content.legal_meta.subtitle}
                    onChange={(e) => setContent({...content, legal_meta: {...content.legal_meta, subtitle: e.target.value}})}
                    className="w-full bg-white/10 border border-white/10 p-4 text-[10px] font-body text-white/60 outline-none focus:border-secondary transition-all resize-none h-20"
                  />
                </div>
              </div>
              <button
                onClick={addLegal}
                className="text-[10px] font-black uppercase text-secondary hover:text-white transition-colors self-end ml-4"
              >
                Add Doc
              </button>
            </div>
            <div className="space-y-4 relative z-10">
              {(content.legal || []).map((doc: string, i: number) => (
                <div
                  key={i}
                  className="flex gap-4 p-4 bg-white/5 border border-white/5 group border-transparent hover:border-secondary/20 transition-all items-center"
                >
                  <span className="material-symbols-outlined text-secondary text-sm">
                    verified
                  </span>
                  <input
                    type="text"
                    value={doc}
                    onChange={(e) => {
                      const newL = [...content.legal];
                      newL[i] = e.target.value;
                      setContent({ ...content, legal: newL });
                    }}
                    className="flex-1 bg-transparent font-bold text-[10px] uppercase text-white outline-none"
                  />
                  <button
                    onClick={() => removeLegal(i)}
                    className="text-white/10 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <span className="material-symbols-outlined text-xs">
                      close
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn className="bg-white p-8 border border-outline-variant/10 shadow-sm">
            <div className="flex justify-between items-center mb-8 pb-2 border-b border-outline-variant/5">
              <div className="space-y-4 flex-1">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-primary tracking-tighter">Partners Heading</label>
                  <input
                    type="text"
                    value={content.partners_meta.title}
                    onChange={(e) => setContent({...content, partners_meta: {...content.partners_meta, title: e.target.value}})}
                    className="w-full bg-surface p-3 text-xs font-black text-primary outline-none focus:border-secondary transition-all uppercase"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-on-surface-variant tracking-tighter">Partners Subtitle</label>
                  <input
                    type="text"
                    value={content.partners_meta.subtitle}
                    onChange={(e) => setContent({...content, partners_meta: {...content.partners_meta, subtitle: e.target.value}})}
                    className="w-full bg-surface p-3 text-[10px] font-body text-on-surface-variant outline-none focus:border-secondary transition-all"
                  />
                </div>
              </div>
              <button
                onClick={addPartner}
                className="text-[10px] font-black uppercase text-secondary hover:text-primary transition-colors self-end ml-4"
              >
                Add Bank
              </button>
            </div>
            <div className="space-y-6">
              {(content.partners || []).map((p: any, i: number) => (
                <div
                  key={i}
                  className="p-6 bg-surface space-y-4 group relative border border-transparent hover:border-outline-variant/10"
                >
                  <button
                    onClick={() => removePartner(i)}
                    className="absolute top-2 right-2 text-on-surface-variant/10 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <span className="material-symbols-outlined text-xs">
                      delete
                    </span>
                  </button>
                  <input
                    type="text"
                    value={p.name}
                    placeholder="Bank Name"
                    onChange={(e) => {
                      const newP = [...content.partners];
                      newP[i].name = e.target.value;
                      setContent({ ...content, partners: newP });
                    }}
                    className="w-full bg-white border border-outline-variant/10 p-2 text-[10px] font-black text-primary outline-none focus:border-secondary"
                  />
                  <input
                    type="text"
                    value={p.logo}
                    placeholder="Logo Path..."
                    onChange={(e) => {
                      const newP = [...content.partners];
                      newP[i].logo = e.target.value;
                      setContent({ ...content, partners: newP });
                    }}
                    className="w-full bg-white border border-outline-variant/10 p-2 text-[8px] font-label text-on-surface-variant outline-none focus:border-secondary"
                  />
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn className="bg-surface p-8 border border-outline-variant/10">
            <h3 className="text-lg font-headline text-primary mb-6 pb-2 border-b border-outline-variant/5 uppercase tracking-tighter">
              6. Bottom CTA
            </h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-secondary">
                  CTA Heading
                </label>
                <input
                  type="text"
                  value={content.cta.title}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      cta: { ...content.cta, title: e.target.value },
                    })
                  }
                  className="w-full bg-white border border-outline-variant/10 p-4 text-xs font-black text-primary outline-none focus:border-secondary uppercase"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-on-surface-variant">
                  CTA Description
                </label>
                <textarea
                  value={content.cta.desc}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      cta: { ...content.cta, desc: e.target.value },
                    })
                  }
                  className="w-full bg-white border border-outline-variant/10 p-4 text-[11px] font-body text-on-surface-variant outline-none focus:border-secondary h-24 resize-none leading-relaxed"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
