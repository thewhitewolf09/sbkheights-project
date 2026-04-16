"use client";
import { useState, useEffect } from "react";
import { getEnquiries, deleteEnquiry, updateEnquiry, addEnquiry } from "@/lib/actions";

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

export default function EnquiryManagementPage() {
  const [loading, setLoading] = useState(true);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEnquiry, setEditingEnquiry] = useState<Enquiry | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [formSaving, setFormSaving] = useState(false);

  async function load() {
    setLoading(true);
    const data = await getEnquiries();
    if (data) setEnquiries(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you certain you want to purge this communication record? This action is irreversible.")) return;
    setDeletingId(id);
    const result = await deleteEnquiry(id);
    if (result.success) {
      setEnquiries(enquiries.filter(e => e._id !== id));
    } else {
      alert("System Conflict: " + result.error);
    }
    setDeletingId(null);
  };

  const openModal = (enquiry: Enquiry | null = null) => {
    if (enquiry) {
      setEditingEnquiry(enquiry);
      setFormData({ name: enquiry.name, email: enquiry.email, phone: enquiry.phone, message: enquiry.message });
    } else {
      setEditingEnquiry(null);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSaving(true);
    
    if (editingEnquiry) {
      const result = await updateEnquiry(editingEnquiry._id, formData);
      if (result.success) {
        setEnquiries(enquiries.map(e => e._id === editingEnquiry._id ? { ...e, ...formData } : e));
        setIsModalOpen(false);
      } else {
        alert("Update Error: " + result.error);
      }
    } else {
      const result = await addEnquiry(formData);
      if (result.success) {
        load();
        setIsModalOpen(false);
      } else {
        alert("Creation Error: " + result.error);
      }
    }
    setFormSaving(false);
  };

  const filteredEnquiries = enquiries.filter(e => 
    (e.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (e.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (e.phone || "").includes(searchTerm) ||
    (e.message || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && enquiries.length === 0) return <div className="p-12 text-primary font-bold animate-pulse">Establishing Data Connection...</div>;

  return (
    <div className="space-y-12 pb-20 max-w-7xl mx-auto px-4 md:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-primary/10 pb-8 gap-6">
        <div>
          <h1 className="text-4xl font-headline text-primary mb-2 uppercase italic font-bold leading-none tracking-tighter">Communication Log</h1>
          <p className="text-on-surface-variant font-body italic text-sm">Monitor and manage all incoming leads and enquiries for SBK Heights.</p>
        </div>
        <div className="flex w-full md:w-auto gap-4">
           <div className="flex-1 md:w-80 relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">search</span>
              <input 
                type="text" 
                placeholder="Search interactions..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-gray-200 pl-12 pr-6 py-4 text-[10px] font-label uppercase tracking-widest outline-none focus:border-secondary transition-all shadow-sm rounded-lg"
              />
           </div>
           <button 
             onClick={() => openModal()}
             className="px-8 py-4 bg-primary text-secondary text-[10px] font-black uppercase tracking-widest hover:bg-white border-2 border-primary transition-all shadow-xl rounded-lg flex items-center gap-2"
           >
             <span className="material-symbols-outlined text-lg">add_box</span>
             Add Lead
           </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden relative">
        <div className="grid grid-cols-12 gap-4 px-8 py-6 bg-gray-50 border-b border-gray-100 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">
          <div className="col-span-3">User Contact</div>
          <div className="col-span-2">Phone System</div>
          <div className="col-span-4">Message Summary</div>
          <div className="col-span-3 text-right">Actions</div>
        </div>
        
        <div className="divide-y divide-gray-100">
          {filteredEnquiries.length === 0 ? (
            <div className="p-24 text-center text-gray-400 font-label uppercase tracking-[0.5rem] text-[10px] italic">
              {searchTerm ? "No records match your search criteria." : "No communication records found."}
            </div>
          ) : (
            filteredEnquiries.map((enquiry) => (
              <div key={enquiry._id} className={`grid grid-cols-12 gap-4 px-8 py-8 items-center group transition-all duration-300 ${deletingId === enquiry._id ? 'opacity-20 pointer-events-none' : 'hover:bg-gray-50/50'}`}>
                <div className="col-span-3 cursor-pointer" onClick={() => openModal(enquiry)}>
                  <p className="text-sm font-bold text-primary uppercase tracking-widest mb-1 group-hover:text-secondary transition-colors">{enquiry.name}</p>
                  <p className="text-[10px] text-gray-500 font-light truncate tracking-wider group-hover:text-primary transition-colors">{enquiry.email || 'NO EMAIL LOGGED'}</p>
                </div>
                <div className="col-span-2">
                   <p className="text-[10px] font-mono text-secondary bg-secondary/5 px-2 py-1 rounded w-fit border border-secondary/20 tracking-tight font-bold">{enquiry.phone}</p>
                </div>
                <div className="col-span-4 cursor-pointer" onClick={() => openModal(enquiry)}>
                  <p className="text-[11px] text-gray-500 font-light line-clamp-3 leading-relaxed italic border-l-2 border-gray-100 pl-6 py-1">
                    "{enquiry.message || 'The user requested a callback without a message.'}"
                  </p>
                </div>
                <div className="col-span-3 flex justify-end items-center gap-6">
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 font-bold font-label uppercase tracking-widest mb-1">
                      {new Date(enquiry.createdAt).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="flex gap-2">
                     <button 
                       onClick={() => openModal(enquiry)}
                       className="w-10 h-10 border border-gray-100 bg-white text-gray-400 hover:text-primary hover:border-primary transition-all flex items-center justify-center rounded shadow-sm"
                     >
                       <span className="material-symbols-outlined text-lg">edit</span>
                     </button>
                     <button 
                       onClick={() => handleDelete(enquiry._id)}
                       className="w-10 h-10 border border-red-50 bg-white text-red-200 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center rounded shadow-sm"
                     >
                       <span className="material-symbols-outlined text-lg">delete</span>
                     </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-6">
           <div className="bg-white w-full max-w-2xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.3)] rounded-2xl border border-gray-200">
              <div className="bg-primary p-8 text-white flex justify-between items-center">
                 <div>
                    <h3 className="text-2xl font-headline uppercase italic text-secondary leading-none mb-1">{editingEnquiry ? "Modify Prospect" : "New Lead Entry"}</h3>
                    <p className="text-[10px] font-label uppercase tracking-widest text-white/40 font-bold">Synchronize communication records</p>
                 </div>
                 <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 flex items-center justify-center hover:bg-white/10 transition-colors rounded-full outline-none"><span className="material-symbols-outlined">close</span></button>
              </div>
              <form onSubmit={handleFormSubmit} className="p-10 space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-secondary block">Full Name</label>
                       <input 
                         type="text" 
                         required
                         value={formData.name}
                         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                         className="w-full bg-gray-50 border border-gray-100 p-4 text-xs font-label uppercase tracking-widest outline-none focus:border-secondary focus:bg-white transition-all rounded-lg" 
                         placeholder="Enter prospect name"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-secondary block">Phone Number</label>
                       <input 
                         type="text" 
                         required
                         value={formData.phone}
                         onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                         className="w-full bg-gray-50 border border-gray-100 p-4 text-xs font-label uppercase tracking-widest outline-none focus:border-secondary focus:bg-white transition-all rounded-lg" 
                         placeholder="+91 XXX XXX XXXX"
                       />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-secondary block">Email Address</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-100 p-4 text-xs font-label outline-none focus:border-secondary focus:bg-white transition-all rounded-lg italic" 
                      placeholder="prospect@example.com"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-secondary block">Communication Context</label>
                    <textarea 
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-100 p-6 text-xs font-body text-on-surface-variant outline-none focus:border-secondary focus:bg-white transition-all min-h-[160px] resize-none italic rounded-lg" 
                      placeholder="Add conversation notes or initial enquiry details..."
                    />
                 </div>
                 <div className="pt-6">
                    <button 
                      type="submit"
                      disabled={formSaving}
                      className="w-full py-6 bg-primary text-secondary text-[10px] font-black uppercase tracking-[0.4rem] hover:bg-secondary hover:text-primary transition-all shadow-2xl disabled:opacity-50 rounded-xl"
                    >
                      {formSaving ? "Synchronizing..." : editingEnquiry ? "Update Prospect Record" : "Register New Lead"}
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}
