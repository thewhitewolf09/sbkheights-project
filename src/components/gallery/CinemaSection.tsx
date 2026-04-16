"use client";

import { useState, useEffect } from "react";
import FadeIn from "@/components/animation/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animation/Stagger";

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
  return url || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80";
};

export default function CinemaSection({ data }: { data: any }) {
  const [activeVideo, setActiveVideo] = useState(data.main);

  // If the user hasn't interacted, maybe we want to autoplay? No, auto play requires mute.
  // We'll just render iframe or img.
  
  const activeYtId = getYoutubeId(activeVideo.url);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <FadeIn direction="right" className="relative aspect-video group overflow-hidden bg-black flex flex-col">
        {activeYtId ? (
          <iframe
            className="w-full h-full object-cover z-10"
            src={`https://www.youtube.com/embed/${activeYtId}?autoplay=1&rel=0`}
            title={activeVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; outline-none; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <>
            <div className="absolute inset-0 z-10 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center pointer-events-none">
              <div className="w-24 h-24 border border-white/50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform bg-white/10 backdrop-blur-sm">
                <span className="material-symbols-outlined text-white text-5xl font-variation-fill">play_arrow</span>
              </div>
            </div>
            <img
              alt="Featured Cinema"
              className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 scale-105 group-hover:scale-100 opacity-60"
              src={activeVideo.url || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"}
            />
          </>
        )}
        
        {!activeYtId && (
          <div className="absolute bottom-8 left-8 z-20 pointer-events-none">
            <p className="text-white font-headline text-2xl tracking-tight">{activeVideo.title}</p>
            <p className="text-secondary-container font-label uppercase text-xs tracking-widest mt-2">{activeVideo.meta}</p>
          </div>
        )}
      </FadeIn>

      <StaggerContainer className="flex flex-col justify-center space-y-8">
        {[data.main, ...(data.items || [])].map((v: any, i: number) => {
          const isSelected = activeVideo.url === v.url && activeVideo.title === v.title;
          
          return (
            <StaggerItem key={i}>
              <div 
                onClick={() => setActiveVideo(v)}
                className={`group flex gap-8 items-center cursor-pointer p-6 transition-colors border-b border-white/10 ${isSelected ? 'bg-white/10' : 'hover:bg-white/5'}`}
              >
                <div className="w-32 aspect-video bg-surface-container-low overflow-hidden relative">
                  {v.url && getYoutubeId(v.url) && (
                     <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
                       <span className="material-symbols-outlined text-white/80 group-hover:text-white text-2xl font-variation-fill">play_circle</span>
                     </div>
                  )}
                  <img
                    alt="Preview"
                    className={`w-full h-full object-cover transition-opacity ${isSelected ? 'opacity-100' : 'opacity-50 group-hover:opacity-100'}`}
                    src={getThumbnail(v.url)}
                  />
                </div>
                <div>
                  <h3 className={`font-headline text-xl mb-1 transition-colors ${isSelected ? 'text-secondary' : 'text-white group-hover:text-secondary-container'}`}>{v.title}</h3>
                  <p className="text-gray-400 font-label text-xs uppercase tracking-widest">{v.meta}</p>
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </div>
  );
}
