import Link from "next/link";
import { getCMSContent } from "@/lib/actions";

export default async function Footer() {
  const data = await getCMSContent("contact", "main") || {
    details: {
      address: "Khasra No. 68, Behind Canara Bank,\nSector 45, Noida – 201301",
      phone: "+91 9350962929",
      email: "shreebkinfratech@gmail.com",
      socials: []
    }
  };

  return (
    <footer className="bg-primary w-full border-t border-white/10 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-6 md:px-12 py-20 w-full max-w-7xl mx-auto">
        <div>
          <div className="text-xl font-bold text-secondary uppercase mb-8 font-headline tracking-tighter">
            SBK Heights
          </div>
          <p className="text-white/50 font-body text-sm tracking-wide leading-relaxed max-w-xs">
            Elevating lifestyle through architectural mastery and uncompromised quality
            in the heart of Sector 45.
          </p>
          <div className="mt-8 space-y-2">
            <p className="text-secondary/60 text-[10px] font-bold uppercase tracking-widest">Main Office</p>
            <p className="text-white/60 text-xs font-body whitespace-pre-line leading-relaxed">
              Khasra No. 68, Behind Canara Bank,{"\n"}
              Sector 45, Noida – 201301
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-2 w-fit">Explore</h4>
            <ul className="space-y-4 font-body text-sm tracking-wide">
              <li><Link className="text-white/40 hover:text-secondary transition-colors" href="/project">Floor Plans</Link></li>
              <li><Link className="text-white/40 hover:text-secondary transition-colors" href="/gallery">Gallery</Link></li>
              <li><Link className="text-white/40 hover:text-secondary transition-colors" href="/about">About Us</Link></li>
              <li><Link className="text-white/40 hover:text-secondary transition-colors" href="/contact">Location</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-2 w-fit">Legal</h4>
            <ul className="space-y-4 font-body text-sm tracking-wide">
              <li><Link className="text-white/40 hover:text-secondary transition-colors" href="/privacy">Privacy Policy</Link></li>
              <li><Link className="text-white/40 hover:text-secondary transition-colors" href="/privacy#terms">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:items-end">
          <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-2">Get In Touch</h4>
          <div className="space-y-4 text-right">
            <p className="text-secondary font-headline text-2xl tracking-tight">{data.details.phone}</p>
            <p className="text-white/40 font-body text-sm lowercase tracking-wider">{data.details.email}</p>
          </div>
          
          <div className="mt-12 flex gap-4">
             {data.details.socials?.map((s: any, i: number) => {
                const name = s.name.toLowerCase();
                let icon = <span className="material-symbols-outlined text-sm">open_in_new</span>;
                
                if (name.includes("instagram")) icon = <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>;
                if (name.includes("linkedin")) icon = <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>;
                if (name.includes("facebook")) icon = <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.13v-3.622h3.13v-2.673c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>;
                if (name.includes("whatsapp")) icon = <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.891 11.891-11.891 3.181 0 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.232 3.481 8.403 0 6.556-5.332 11.891-11.891 11.891-2.093 0-4.141-.544-5.946-1.587l-6.047 1.587zm6.541-3.69c1.554.912 3.518 1.487 5.293 1.487 5.4 0 9.791-4.391 9.791-9.791 0-2.619-1.02-5.081-2.871-6.932-1.854-1.853-4.316-2.871-6.917-2.871-5.401 0-9.792 4.391-9.792 9.791 0 1.841.516 3.633 1.49 5.215l-1.002 3.657 3.754-.984zm11.232-7.513c-.302-.151-1.785-.881-2.062-.982-.276-.1-.477-.151-.678.151-.201.302-.779 1.054-.955 1.256-.176.202-.352.227-.654.077-.302-.151-1.274-.47-2.425-1.497-.895-.799-1.5-1.786-1.676-2.088-.176-.302-.019-.465.132-.615.136-.135.302-.352.453-.529.151-.176.201-.302.302-.503.101-.201.05-.377-.025-.528-.075-.151-.678-1.634-.93-2.238-.245-.59-.513-.51-.678-.518-.174-.009-.374-.011-.574-.011-.201 0-.528.075-.804.377-.276.302-1.056 1.03-1.056 2.515 0 1.485 1.081 2.92 1.231 3.121.151.201 2.126 3.245 5.151 4.553.719.311 1.281.496 1.719.636.723.23 1.381.198 1.901.12.58-.087 1.785-.73 2.037-1.435.251-.704.251-1.307.176-1.433-.075-.125-.276-.201-.578-.352z"/></svg>;
                if (name.includes("youtube")) icon = <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>;
                if (name.includes("x") || name.includes("twitter")) icon = <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;

                return (
                 <a key={i} href={s.url} className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/40 hover:text-secondary hover:border-secondary transition-all group overflow-hidden relative" title={s.name}>
                    <div className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    <span className="relative z-10 group-hover:text-primary transition-colors duration-300">
                      {icon}
                    </span>
                 </a>
                );
             })}
          </div>
        </div>
      </div>

      <div className="px-6 md:px-12 py-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-4">
        <p className="text-white/30 font-label text-xs uppercase tracking-widest">
          © {new Date().getFullYear()} SBK Heights. All Rights Reserved.
        </p>
        <p className="text-white/30 font-label text-xs uppercase tracking-widest opacity-50">
          Curated Architectural Excellence
        </p>
      </div>
    </footer>
  );
}
