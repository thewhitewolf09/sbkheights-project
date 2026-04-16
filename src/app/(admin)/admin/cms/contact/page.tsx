"use client";
import FadeIn from "@/components/animation/FadeIn";
import { useState, useEffect } from "react";
import { getCMSContent, updateCMSContent } from "@/lib/actions";

export default function ContactUsCMSEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<any>({
    header: { badge: "Visit Our Site", title: "Find Your Dream \nHouse Today." },
    details: { 
      address: "Khasra No. 68, Behind Canara Bank,\nSector 45, Noida – 201301", 
      phone: "+91 9350962929", 
      email: "shreebkinfratech@gmail.com",
      socials: [
        { name: "Instagram", url: "https://instagram.com/sbk" },
        { name: "LinkedIn", url: "https://linkedin.com/sbk" }
      ]
    },
    proximity: [
      { cat: "Hyper-Local Connectivity", items: [{ n: "Sustain Green", d: "50 m" }] }
    ],
    map: {
      image: "/images/map.png",
      embedUrl: "https://www.google.com/maps?q=28.555657,77.355366&hl=en&z=17&output=embed"
    }
  });

  useEffect(() => {
    async function load() {
      const cmsData = await getCMSContent("contact", "main");
      if (cmsData) {
        setContent({
          ...content,
          ...cmsData,
          header: { ...content.header, ...cmsData.header },
          details: { ...content.details, ...cmsData.details },
          map: { ...content.map, ...cmsData.map }
        });
      }
      setLoading(false);
    }
    load();
  }, []);

  async function handleSave() {
    setSaving(true);
    const result = await updateCMSContent("contact", "main", content);
    if (result.success) {
      alert("Contact architecture synchronized.");
    } else {
      alert("Error: " + result.error);
    }
    setSaving(false);
  }

  const addSocial = () => {
    const newSocials = [...(content.details.socials || []), { name: "Instagram", url: "" }];
    setContent({ ...content, details: { ...content.details, socials: newSocials } });
  };

  const removeSocial = (i: number) => {
    const newSocials = content.details.socials.filter((_: any, idx: number) => idx !== i);
    setContent({ ...content, details: { ...content.details, socials: newSocials } });
  };

  const addProximityCat = () => {
    setContent({ ...content, proximity: [...(content.proximity || []), { cat: "New Category", items: [{ n: "New Point", d: "0 m" }] }] });
  };

  const removeProximityCat = (i: number) => {
    setContent({ ...content, proximity: content.proximity.filter((_: any, idx: number) => idx !== i) });
  };

  const addProximityItem = (cIdx: number) => {
    const newProx = [...content.proximity];
    newProx[cIdx].items = [...newProx[cIdx].items, { n: "New Point", d: "0 m" }];
    setContent({ ...content, proximity: newProx });
  };

  const removeProximityItem = (cIdx: number, itemIdx: number) => {
    const newProx = [...content.proximity];
    newProx[cIdx].items = newProx[cIdx].items.filter((_: any, idx: number) => idx !== itemIdx);
    setContent({ ...content, proximity: newProx });
  };

  if (loading) return <div className="p-12 text-primary font-label animate-pulse italic">Connecting to Contact Channels...</div>;

  return (
    <div className="space-y-12 pb-20">
      <FadeIn>
        <div className="flex justify-between items-end mb-12 border-b border-outline-variant/10 pb-8">
          <div>
            <h1 className="text-4xl font-headline text-primary mb-2 uppercase italic">Contact Screen Editor</h1>
            <p className="text-on-surface-variant font-body italic">Manage geography, connectivity, and communication channels.</p>
          </div>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="px-8 py-4 bg-primary text-white text-xs font-label font-bold uppercase tracking-[0.2rem] hover:bg-secondary hover:text-primary transition-all disabled:opacity-50 shadow-xl"
          >
            {saving ? "Syncing..." : "Publish & Sync"}
          </button>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          {/* 1. Header & Address */}
          <FadeIn className="bg-white p-10 border border-outline-variant/10 shadow-sm relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 -mr-16 -mt-16 group-hover:bg-secondary/10 transition-colors duration-700"></div>
            <h3 className="text-xl font-headline text-primary mb-8 pb-4 border-b border-outline-variant/5 uppercase tracking-tighter italic">1. Header & Base Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
               <div className="space-y-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Intro Badge</label>
                     <input 
                       type="text" 
                       value={content.header.badge} 
                       onChange={(e) => setContent({ ...content, header: { ...content.header, badge: e.target.value } })}
                       className="w-full bg-surface p-4 text-xs font-label uppercase tracking-widest outline-none border border-transparent focus:border-secondary transition-all" 
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Main Heading</label>
                     <textarea 
                       value={content.header.title} 
                       onChange={(e) => setContent({ ...content, header: { ...content.header, title: e.target.value } })}
                       className="w-full bg-surface p-4 text-lg font-headline text-primary outline-none border border-transparent focus:border-secondary transition-all whitespace-pre-line min-h-30" 
                     />
                  </div>
               </div>
               <div className="space-y-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Office Address</label>
                     <textarea 
                       value={content.details.address} 
                       onChange={(e) => setContent({ ...content, details: { ...content.details, address: e.target.value } })}
                       className="w-full bg-surface p-4 text-xs font-body text-primary outline-none border border-transparent focus:border-secondary transition-all min-h-55 whitespace-pre-line" 
                     />
                  </div>
               </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 pt-8 border-t border-outline-variant/5">
               <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-secondary text-center block">Phone Number</label>
                  <input 
                    type="text" 
                    value={content.details.phone} 
                    onChange={(e) => setContent({ ...content, details: { ...content.details, phone: e.target.value } })}
                    className="w-full bg-surface p-4 text-center text-lg font-headline text-primary outline-none border border-transparent focus:border-secondary transition-all italic font-bold" 
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-secondary text-center block">Email Address</label>
                  <input 
                    type="text" 
                    value={content.details.email} 
                    onChange={(e) => setContent({ ...content, details: { ...content.details, email: e.target.value } })}
                    className="w-full bg-surface p-4 text-center text-xs font-body text-primary outline-none border border-transparent focus:border-secondary transition-all italic" 
                  />
               </div>
            </div>
          </FadeIn>

          {/* 2. Proximity Categories */}
          <FadeIn className="bg-white p-10 border border-outline-variant/10 shadow-sm">
             <div className="flex justify-between items-center mb-10 border-b border-outline-variant/5 pb-4">
                <h3 className="text-xl font-headline text-primary uppercase tracking-tighter italic">2. Location Proximity</h3>
                <button onClick={addProximityCat} className="text-[10px] font-black uppercase text-secondary border border-secondary/20 px-4 py-2 hover:bg-secondary hover:text-primary transition-all">Add Category</button>
             </div>
             <div className="space-y-12">
                {(content.proximity || []).map((cat: any, cIdx: number) => (
                  <div key={cIdx} className="p-8 bg-surface space-y-8 relative group border-l-4 border-secondary">
                     <button onClick={() => removeProximityCat(cIdx)} className="absolute top-4 right-4 text-on-surface-variant/20 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                       <span className="material-symbols-outlined text-sm">delete</span>
                     </button>
                     <div className="flex justify-between items-center">
                        <input 
                          type="text" 
                          value={cat.cat} 
                          onChange={(e) => {
                            const newP = [...content.proximity];
                            newP[cIdx].cat = e.target.value;
                            setContent({ ...content, proximity: newP });
                          }}
                          className="bg-transparent text-xl font-headline font-bold text-primary italic outline-none border-b border-transparent focus:border-secondary/20 w-full max-w-md" 
                        />
                        <button onClick={() => addProximityItem(cIdx)} className="text-[8px] font-bold uppercase tracking-widest p-2 border border-outline-variant/20 hover:bg-secondary hover:text-primary transition-all">Add Point</button>
                     </div>
                     
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {cat.items.map((item: any, iIdx: number) => (
                           <div key={iIdx} className="bg-white p-6 border border-outline-variant/5 shadow-sm group/item relative">
                              <button onClick={() => removeProximityItem(cIdx, iIdx)} className="absolute top-2 right-2 text-on-surface-variant/10 hover:text-red-500 opacity-0 group-hover/item:opacity-100">
                                <span className="material-symbols-outlined text-xs">close</span>
                              </button>
                              <input 
                                type="text" 
                                value={item.n} 
                                placeholder="Location Name"
                                onChange={(e) => {
                                  const newProxLocal = [...content.proximity];
                                  newProxLocal[cIdx].items[iIdx].n = e.target.value;
                                  setContent({ ...content, proximity: newProxLocal });
                                }}
                                className="w-full bg-transparent text-[10px] font-bold text-primary uppercase tracking-widest outline-none mb-1 shadow-none border-none" 
                              />
                              <input 
                                type="text" 
                                value={item.d} 
                                placeholder="Distance (e.g. 500m)"
                                onChange={(e) => {
                                  const newProxLocal = [...content.proximity];
                                  newProxLocal[cIdx].items[iIdx].d = e.target.value;
                                  setContent({ ...content, proximity: newProxLocal });
                                }}
                                className="w-full bg-transparent text-xs text-secondary font-headline italic font-bold outline-none" 
                              />
                           </div>
                        ))}
                     </div>
                  </div>
                ))}
             </div>
          </FadeIn>
        </div>

        <div className="lg:col-span-4 space-y-12">
          {/* 3. Map Config */}
          <FadeIn className="bg-primary p-8 text-white relative shadow-2xl">
             <div className="absolute top-0 left-0 w-2 h-full bg-secondary"></div>
             <h3 className="text-lg font-headline uppercase tracking-tighter text-secondary italic mb-8 pb-2 border-b border-white/5">3. Map Configuration</h3>
             <div className="space-y-6">
                <div className="space-y-2">
                   <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Static Map Asset</label>
                   <input 
                     type="text" 
                     value={content.map.image} 
                     onChange={(e) => setContent({ ...content, map: { ...content.map, image: e.target.value } })}
                     className="w-full bg-white/5 p-4 text-[10px] font-label text-secondary outline-none border border-transparent focus:border-secondary transition-all" 
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Google Maps Embed URL</label>
                   <textarea 
                     value={content.map.embedUrl} 
                     onChange={(e) => setContent({ ...content, map: { ...content.map, embedUrl: e.target.value } })}
                     className="w-full bg-white/5 p-4 text-[10px] font-body text-white/60 outline-none border border-transparent focus:border-secondary transition-all min-h-[140px]" 
                   />
                </div>
             </div>
          </FadeIn>

          {/* 4. Social Links */}
          <FadeIn className="bg-white p-8 border border-outline-variant/10 shadow-sm relative group">
             <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 -mr-12 -mt-12 group-hover:bg-secondary/10 transition-colors duration-700"></div>
             <div className="flex justify-between items-center mb-8 pb-2 border-b border-outline-variant/5">
                <h3 className="text-lg font-headline text-primary uppercase tracking-tighter italic">4. Strategic Socials</h3>
                <button onClick={addSocial} className="text-[10px] font-black uppercase text-secondary border border-secondary/20 px-3 py-1 hover:bg-secondary hover:text-primary transition-all">Add Platform</button>
             </div>
             <div className="space-y-6 relative z-10">
                {(content.details.socials || []).map((s: any, i: number) => (
                  <div key={i} className="p-5 bg-surface space-y-4 group relative border border-transparent hover:border-outline-variant/10 shadow-sm transition-all animate-in fade-in slide-in-from-right-4">
                     <button onClick={() => removeSocial(i)} className="absolute top-3 right-3 text-on-surface-variant/10 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                       <span className="material-symbols-outlined text-sm">close</span>
                     </button>
                     <div className="space-y-1">
                       <label className="text-[8px] font-bold uppercase tracking-widest text-secondary">Channel Platform</label>
                       <select 
                         value={s.name} 
                         onChange={(e) => {
                           const newS = [...content.details.socials];
                           newS[i].name = e.target.value;
                           setContent({ ...content, details: { ...content.details, socials: newS } });
                         }}
                         className="w-full bg-white border border-outline-variant/5 p-3 text-[10px] font-black text-primary outline-none focus:border-secondary appearance-none cursor-pointer"
                       >
                          <option value="Instagram">Instagram</option>
                          <option value="LinkedIn">LinkedIn</option>
                          <option value="Facebook">Facebook</option>
                          <option value="WhatsApp">WhatsApp</option>
                          <option value="YouTube">YouTube</option>
                          <option value="X (Twitter)">X (Twitter)</option>
                          <option value="Other">Other / Website</option>
                       </select>
                     </div>
                     <div className="space-y-1">
                       <label className="text-[8px] font-bold uppercase tracking-widest text-on-surface-variant">Destination URL</label>
                       <input 
                         type="text" 
                         value={s.url} 
                         placeholder="https://..."
                         onChange={(e) => {
                           const newS = [...content.details.socials];
                           newS[i].url = e.target.value;
                           setContent({ ...content, details: { ...content.details, socials: newS } });
                         }}
                         className="w-full bg-white border border-outline-variant/5 p-3 text-[9px] font-label text-on-surface-variant outline-none focus:border-secondary italic" 
                       />
                     </div>
                  </div>
                ))}
             </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
