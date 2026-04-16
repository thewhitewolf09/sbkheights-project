"use client";
import FadeIn from "@/components/animation/FadeIn";
import { useState, useEffect } from "react";
import { getCMSContent, updateCMSContent } from "@/lib/actions";

const getYoutubeId = (url: string) => {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})/);
  return match ? match[1] : null;
};

const getThumbnail = (url: string) => {
  const ytId = getYoutubeId(url);
  if (ytId) {
    return `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
  }
  return url;
};

export default function GalleryCMSEditor() {
  const [activeView, setActiveView] = useState("images");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<any>({
    images: {
      badge: "Visual Journey",
      title: "Architectural Excellence In Frame",
      items: [
        { id: 1, title: "Exterior View - Dusk Perspective", type: "Exterior", url: "/images/gall_1.png" },
        { id: 2, title: "Lobby Grandeur", type: "Interior", url: "/images/gall_2.png" },
        { id: 3, title: "Sky Pool Horizon", type: "Amenity", url: "/images/gall_8.png" },
        { id: 4, title: "Master Suite Detail", type: "Interior", url: "/images/gall_5.png" }
      ]
    },
    cinema: {
      badge: "Cinematic Experience",
      title: "The Heights in Motion",
      main: { title: "Official Drone Walkthrough 2024", meta: "4:32 MIN • 4K ULTRA HD", url: "/images/gall_1.png" },
      items: [
        { title: "Interior Tour", meta: "2:15 MIN • HD", url: "/images/gall_3.png" },
        { title: "Amenities Showcase", meta: "3:45 MIN • 4K", url: "/images/gall_7.png" }
      ]
    }
  });

  useEffect(() => {
    async function load() {
      const data = await getCMSContent("gallery", "all");
      if (data) setContent(data);
      setLoading(false);
    }
    load();
  }, []);

  async function handleSave() {
    setSaving(true);
    const result = await updateCMSContent("gallery", "all", content);
    if (result.success) {
      alert("Gallery assets published.");
    } else {
      alert("Error: " + result.error);
    }
    setSaving(false);
  }

  if (loading) return <div className="p-12 text-primary font-label animate-pulse">Scanning Visual Repository...</div>;

  return (
    <div className="space-y-12 pb-20">
      <FadeIn>
        <div className="flex justify-between items-end mb-12 border-b border-outline-variant/10 pb-8">
          <div>
            <h1 className="text-4xl font-headline text-primary mb-2">Gallery Manager</h1>
            <p className="text-on-surface-variant font-body">Manage the visual and cinematic assets for SBK Heights.</p>
          </div>
          <div className="flex space-x-4">
             <div className="flex bg-surface p-1 border border-outline-variant/10 mr-4">
                <button
                  onClick={() => setActiveView("images")}
                  className={`px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${activeView === 'images' ? 'bg-primary text-white shadow-xl' : 'text-on-surface-variant'}`}
                >
                  Photo Library
                </button>
                <button
                  onClick={() => setActiveView("cinema")}
                  className={`px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${activeView === 'cinema' ? 'bg-primary text-white shadow-xl' : 'text-on-surface-variant'}`}
                >
                  Cinema (Video)
                </button>
             </div>
             <button 
               onClick={handleSave}
               disabled={saving}
               className="px-8 py-4 bg-primary text-white text-xs font-label font-bold uppercase tracking-widest hover:bg-primary/90 transition-all disabled:opacity-50"
             >
               {saving ? "Publishing..." : "Publish Gallery"}
             </button>
          </div>
        </div>
      </FadeIn>

      {activeView === "images" ? (
        <div className="space-y-12">
          {/* Photos Intro */}
          <FadeIn className="bg-white p-10 border border-outline-variant/10">
            <h3 className="text-xl font-headline text-primary mb-8 pb-4 border-b border-outline-variant/5 uppercase tracking-tighter">1. Gallery Introduction</h3>
            <div className="grid grid-cols-2 gap-8">
               <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Intro Badge</label>
                  <input 
                    type="text" 
                    value={content.images.badge} 
                    onChange={(e) => setContent({ ...content, images: { ...content.images, badge: e.target.value } })}
                    className="w-full bg-surface p-4 text-xs font-label uppercase tracking-widest outline-none" 
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Intro Title</label>
                  <input 
                    type="text" 
                    value={content.images.title} 
                    onChange={(e) => setContent({ ...content, images: { ...content.images, title: e.target.value } })}
                    className="w-full bg-surface p-4 text-sm font-headline text-primary outline-none" 
                  />
               </div>
            </div>
          </FadeIn>

          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-headline text-primary uppercase tracking-tighter">Photo Library ({content.images.items.length})</h3>
            <button 
              onClick={() => {
                const newItems = [...content.images.items, { id: Date.now(), title: "New Photo", type: "Exterior", url: "/images/placeholder.png" }];
                setContent({ ...content, images: { ...content.images, items: newItems } });
              }}
              className="bg-secondary text-primary px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-secondary-container transition-colors"
            >
              + Add Photo
            </button>
          </div>

          <FadeIn className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.images.items.map((item: any, i: number) => (
              <div key={i} className="bg-white border border-outline-variant/10 group overflow-hidden p-4 relative">
                <button 
                  onClick={() => {
                     const newItems = content.images.items.filter((_: any, index: number) => index !== i);
                     setContent({ ...content, images: { ...content.images, items: newItems } });
                  }}
                  className="absolute top-2 right-2 z-10 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs shadow-md"
                  title="Remove Photo"
                >✕</button>
                <div className="aspect-video bg-surface mb-4 flex items-center justify-center relative overflow-hidden">
                   {item.url ? (
                     <img src={item.url} alt="preview" className="w-full h-full object-cover" />
                   ) : (
                     <span className="text-[10px] font-bold text-primary/30 uppercase">No Image URL</span>
                   )}
                   <select 
                     value={item.type} 
                     onChange={(e) => {
                       const newItems = [...content.images.items];
                       newItems[i].type = e.target.value;
                       setContent({ ...content, images: { ...content.images, items: newItems } });
                     }}
                     className="absolute bottom-2 left-2 bg-primary text-white text-[9px] px-2 py-1 font-bold tracking-widest uppercase outline-none appearance-none cursor-pointer hover:bg-primary-container hover:text-primary transition-colors border-none"
                   >
                     <option value="Exterior">Exterior</option>
                     <option value="Interior">Interior</option>
                     <option value="Amenity">Amenity</option>
                     <option value="Landscape">Landscape</option>
                   </select>
                </div>
                <div className="space-y-2">
                  <input 
                    type="text" 
                    value={item.title} 
                    placeholder="Photo Title"
                    onChange={(e) => {
                      const newItems = [...content.images.items];
                      newItems[i].title = e.target.value;
                      setContent({ ...content, images: { ...content.images, items: newItems } });
                    }}
                    className="w-full bg-surface p-2 text-xs font-bold uppercase tracking-widest text-primary outline-none border border-transparent focus:border-secondary transition-colors" 
                  />
                  <input 
                    type="text" 
                    value={item.url} 
                    placeholder="/images/path.png"
                    onChange={(e) => {
                      const newItems = [...content.images.items];
                      newItems[i].url = e.target.value;
                      setContent({ ...content, images: { ...content.images, items: newItems } });
                    }}
                    className="w-full bg-surface p-2 text-[10px] font-mono tracking-wider text-on-surface-variant outline-none border border-transparent focus:border-secondary transition-colors" 
                  />
                </div>
              </div>
            ))}
          </FadeIn>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Cinema Intro */}
          <FadeIn className="bg-white p-10 border border-outline-variant/10">
            <h3 className="text-xl font-headline text-primary mb-8 pb-4 border-b border-outline-variant/5 uppercase tracking-tighter">Cinema Settings</h3>
            <div className="grid grid-cols-2 gap-8">
               <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Section Badge</label>
                  <input 
                    type="text" 
                    value={content.cinema.badge} 
                    onChange={(e) => setContent({ ...content, cinema: { ...content.cinema, badge: e.target.value } })}
                    className="w-full bg-surface p-4 text-xs font-label uppercase tracking-widest outline-none" 
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Section Title</label>
                  <input 
                    type="text" 
                    value={content.cinema.title} 
                    onChange={(e) => setContent({ ...content, cinema: { ...content.cinema, title: e.target.value } })}
                    className="w-full bg-surface p-4 text-sm font-headline text-primary outline-none" 
                  />
               </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <FadeIn className="bg-primary p-8 text-white relative flex gap-8">
                <div className="flex-1 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4 text-secondary">A. Main Featured Video</h4>
                  <div className="space-y-2">
                    <label className="text-[8px] font-bold uppercase text-white/40 tracking-widest">Video Title</label>
                    <input 
                      type="text" 
                      value={content.cinema.main.title} 
                      onChange={(e) => setContent({ ...content, cinema: { ...content.cinema, main: { ...content.cinema.main, title: e.target.value } } })}
                      className="w-full bg-white/10 border-none p-3 text-sm font-headline text-white outline-none focus:ring-1 focus:ring-secondary/50" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[8px] font-bold uppercase text-white/40 tracking-widest">Meta Info (e.g. 4k • duration)</label>
                    <input 
                      type="text" 
                      value={content.cinema.main.meta} 
                      onChange={(e) => setContent({ ...content, cinema: { ...content.cinema, main: { ...content.cinema.main, meta: e.target.value } } })}
                      className="w-full bg-white/10 border-none p-3 text-[10px] font-label text-secondary-container outline-none focus:ring-1 focus:ring-secondary/50" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[8px] font-bold uppercase text-white/40 tracking-widest">Video URL (YouTube link supported)</label>
                    <input 
                      type="text" 
                      value={content.cinema.main.url || ""} 
                      onChange={(e) => setContent({ ...content, cinema: { ...content.cinema, main: { ...content.cinema.main, url: e.target.value } } })}
                      className="w-full bg-white/10 border-none p-3 text-[10px] font-mono text-white/70 outline-none focus:ring-1 focus:ring-secondary/50" 
                    />
                  </div>
                </div>
                <div className="w-1/3 flex-none pt-12">
                   <div className="aspect-video bg-black/50 border border-white/10 rounded-sm overflow-hidden relative flex items-center justify-center">
                      <img src={getThumbnail(content.cinema.main.url)} alt="Main Video" className="w-full h-full object-cover opacity-80" />
                      {getYoutubeId(content.cinema.main.url) && (
                         <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <span className="material-symbols-outlined text-white text-4xl shadow-2xl">play_circle</span>
                         </div>
                      )}
                   </div>
                </div>
              </FadeIn>
            </div>

            
            <div className="lg:col-span-4 space-y-6">
              <div className="flex justify-between items-center border-b border-outline-variant/20 pb-2">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary px-2">B. Feature Clips</h4>
                <button 
                  onClick={() => {
                    const newItems = [...(content.cinema.items || []), { title: "New Clip", meta: "MIN • HD", url: "/images/placeholder.png" }];
                    setContent({ ...content, cinema: { ...content.cinema, items: newItems } });
                  }}
                  className="bg-secondary/20 text-primary px-3 py-1 text-[10px] font-bold tracking-widest uppercase hover:bg-secondary transition-colors rounded-sm"
                >
                  + Add Clip
                </button>
              </div>
              {content.cinema.items?.map((clip: any, i: number) => (
                <FadeIn key={i} className="bg-white p-4 border border-outline-variant/10 group relative flex gap-4 items-center">
                  <div className="w-24 aspect-video bg-surface overflow-hidden relative flex-none border border-outline-variant/10">
                     <img src={getThumbnail(clip.url)} alt="Clip" className="w-full h-full object-cover" />
                     {getYoutubeId(clip.url) && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                           <span className="material-symbols-outlined text-white text-lg">play_circle</span>
                        </div>
                     )}
                  </div>
                  <div className="space-y-3 flex-1">
                    <input 
                      type="text" 
                      value={clip.title} 
                      onChange={(e) => {
                        const newItems = [...content.cinema.items];
                        newItems[i].title = e.target.value;
                        setContent({ ...content, cinema: { ...content.cinema, items: newItems } });
                      }}
                      className="w-full bg-surface p-2 font-bold text-[10px] uppercase tracking-widest text-primary outline-none border border-transparent focus:border-secondary transition-colors" 
                    />
                    <input 
                      type="text" 
                      value={clip.meta} 
                      onChange={(e) => {
                        const newItems = [...content.cinema.items];
                        newItems[i].meta = e.target.value;
                        setContent({ ...content, cinema: { ...content.cinema, items: newItems } });
                      }}
                      className="w-full bg-surface p-2 text-[8px] font-bold uppercase tracking-widest text-secondary outline-none border border-transparent focus:border-secondary transition-colors" 
                    />
                    <input 
                      type="text" 
                      value={clip.url || ""}
                      placeholder="URL or YouTube link"
                      onChange={(e) => {
                        const newItems = [...content.cinema.items];
                        newItems[i].url = e.target.value;
                        setContent({ ...content, cinema: { ...content.cinema, items: newItems } });
                      }}
                      className="w-full bg-surface p-2 text-[10px] font-mono tracking-wider text-on-surface-variant outline-none border border-transparent focus:border-secondary transition-colors" 
                    />
                  </div>
                  <button 
                    onClick={() => {
                       const newItems = content.cinema.items.filter((_: any, index: number) => index !== i);
                       setContent({ ...content, cinema: { ...content.cinema, items: newItems } });
                    }}
                    className="absolute top-2 right-2 z-10 w-6 h-6 bg-red-100 text-red-600 rounded-full hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center text-xs font-bold"
                    title="Remove Clip"
                  >✕</button>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
