"use client";
import { useState, useEffect } from "react";
import { getCMSContent, updateCMSContent } from "@/lib/actions";

export default function LegalCMSEditor() {
  const [activeTab, setActiveTab] = useState<"privacy" | "terms">("privacy");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<any>({
    updated: "",
    privacy: [],
    terms: []
  });

  useEffect(() => {
    async function load() {
      const data = await getCMSContent("legal", "all");
      if (data) {
        const migrated = {
          updated: data.updated || new Date().toLocaleDateString(undefined, { month: 'long', year: 'numeric' }),
          privacy: Array.isArray(data.privacy) ? data.privacy : [{ title: "Privacy Policy", content: data.privacy || "" }],
          terms: Array.isArray(data.terms) ? data.terms : [{ title: "Terms of Service", content: data.terms || "" }]
        };
        setContent(migrated);
      }
      setLoading(false);
    }
    load();
  }, []);

  async function handleSave() {
    setSaving(true);
    const result = await updateCMSContent("legal", "all", content);
    if (result.success) {
      alert(`${activeTab.toUpperCase()} updated successfully.`);
    } else {
      alert("Error: " + result.error);
    }
    setSaving(false);
  }

  const addSection = () => {
    const defaultTitle = activeTab === 'privacy' ? "New Privacy Clause" : "New Terms Provision";
    const newSection = { title: defaultTitle, content: "" };
    setContent((prev: any) => ({
      ...prev,
      [activeTab]: [...(prev[activeTab] || []), newSection]
    }));
  };

  const removeSection = (i: number) => {
    if (!confirm("Remove this section permanently?")) return;
    setContent((prev: any) => ({
      ...prev,
      [activeTab]: prev[activeTab].filter((_: any, idx: number) => idx !== i)
    }));
  };

  const moveSection = (i: number, direction: 'up' | 'down') => {
    const newSections = [...content[activeTab]];
    const targetIdx = direction === 'up' ? i - 1 : i + 1;
    if (targetIdx < 0 || targetIdx >= newSections.length) return;
    [newSections[i], newSections[targetIdx]] = [newSections[targetIdx], newSections[i]];
    setContent({ ...content, [activeTab]: newSections });
  };

  const updateSection = (i: number, field: string, value: string) => {
    const newSections = [...content[activeTab]];
    newSections[i] = { ...newSections[i], [field]: value };
    setContent({ ...content, [activeTab]: newSections });
  };

  if (loading) return <div className="p-12 text-primary font-bold animate-pulse">Establishing Connection to Legal CMS...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-primary/10 pb-8 gap-6">
        <div>
          <h1 className="text-4xl font-headline font-bold text-primary uppercase tracking-tighter">Legal & Governance</h1>
          <p className="text-on-surface-variant font-body text-sm mt-1">Manage Privacy Policy and Terms of Service sections for the SBK Heights platform.</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab("privacy")}
            className={`px-8 py-3 text-[10px] font-bold uppercase tracking-widest rounded-md transition-all ${activeTab === 'privacy' ? 'bg-primary text-white shadow-lg' : 'text-gray-500 hover:text-primary'}`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab("terms")}
            className={`px-8 py-3 text-[10px] font-bold uppercase tracking-widest rounded-md transition-all ${activeTab === 'terms' ? 'bg-primary text-white shadow-lg' : 'text-gray-500 hover:text-primary'}`}
          >
            Terms of Service
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-8">
          {(content[activeTab] || []).length === 0 && (
            <div className="p-20 border-2 border-dashed border-gray-200 text-center text-gray-400 font-label uppercase tracking-widest text-[10px]">
              No sections found in {activeTab === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}.
            </div>
          )}
          
          {(content[activeTab] || []).map((section: any, i: number) => (
            <div key={i} className="bg-white border-2 border-primary/5 p-8 relative group hover:border-secondary/20 transition-all rounded-xl shadow-sm">
                <div className="absolute top-4 right-4 flex gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all">
                  <button onClick={() => moveSection(i, 'up')} disabled={i === 0} className="w-8 h-8 flex items-center justify-center bg-gray-50 text-gray-400 hover:text-secondary disabled:opacity-20 border border-gray-100 rounded"><span className="material-symbols-outlined text-sm">north</span></button>
                  <button onClick={() => moveSection(i, 'down')} disabled={i === content[activeTab].length - 1} className="w-8 h-8 flex items-center justify-center bg-gray-50 text-gray-400 hover:text-secondary disabled:opacity-20 border border-gray-100 rounded"><span className="material-symbols-outlined text-sm">south</span></button>
                  <button onClick={() => removeSection(i)} className="w-8 h-8 flex items-center justify-center bg-red-50 text-red-200 hover:text-red-600 border border-red-100 rounded"><span className="material-symbols-outlined text-sm">delete</span></button>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="text-secondary font-bold text-xs">{(i + 1).toString().padStart(2, '0')}</span>
                    <input 
                      type="text" 
                      value={section.title}
                      onChange={(e) => updateSection(i, "title", e.target.value)}
                      className="w-full bg-transparent border-b border-gray-100 py-2 text-xl font-headline font-bold text-primary outline-none focus:border-secondary transition-all"
                      placeholder="Title of this clause..."
                    />
                  </div>
                  <textarea 
                    value={section.content}
                    onChange={(e) => updateSection(i, "content", e.target.value)}
                    className="w-full bg-gray-50/50 p-6 border border-gray-100 rounded-lg font-body text-sm text-on-surface-variant leading-relaxed min-h-[150px] outline-none focus:border-secondary/30 transition-all resize-none"
                    placeholder="Enter the detailed legal content for this section..."
                  />
                </div>
            </div>
          ))}

          <button 
            onClick={addSection}
            className="w-full py-6 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:border-secondary hover:text-secondary hover:bg-secondary/5 transition-all font-label uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 font-black"
          >
            <span className="material-symbols-outlined text-lg">add_circle</span>
            Add New Content Section
          </button>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-primary p-8 rounded-xl text-white shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full -mr-16 -mt-16"></div>
             <h3 className="text-lg font-headline font-bold text-secondary mb-6 border-b border-white/10 pb-2 uppercase">Metadata</h3>
             <div className="space-y-4">
                <div className="space-y-2">
                   <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">Last Updated Display</label>
                   <input 
                      type="text" 
                      value={content.updated}
                      onChange={(e) => setContent({ ...content, updated: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 p-4 text-[11px] font-label text-secondary uppercase tracking-[0.2em] rounded-lg outline-none focus:border-secondary transition-all"
                   />
                </div>
                <p className="text-[10px] text-white/30 leading-relaxed">
                   Changes to legal sections take effect immediately upon publication. Ensure all structural wording is verified.
                </p>
             </div>
          </div>

          <button 
            onClick={handleSave}
            disabled={saving}
            className="w-full py-6 bg-secondary text-primary font-black uppercase tracking-[0.3em] text-xs hover:bg-white transition-all shadow-xl rounded-xl border border-secondary disabled:opacity-50"
          >
            {saving ? "Publishing..." : `Publish ${activeTab.toUpperCase()}`}
          </button>
        </div>
      </div>
    </div>
  );
}
