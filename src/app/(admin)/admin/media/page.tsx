"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MediaFile {
  name: string;
  url: string;
  size: number;
  type: "image" | "video";
  uploadedAt: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function MediaLibraryPage() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [selected, setSelected] = useState<MediaFile | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "image" | "video">("all");
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchFiles = useCallback(async () => {
    try {
      const res = await fetch("/api/media");
      const data = await res.json();
      setFiles(data.files || []);
    } catch {
      showToast("Failed to load media library", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const handleUpload = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setUploading(true);

    try {
      // 1. Get upload signature
      const signRes = await fetch("/api/media/sign");
      if (!signRes.ok) throw new Error("Failed to get upload signature");
      
      const { signature, timestamp, cloudName, apiKey } = await signRes.json();

      let successCount = 0;

      // 2. Upload files directly to Cloudinary
      for (const file of Array.from(fileList)) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", apiKey);
        formData.append("timestamp", timestamp.toString());
        formData.append("signature", signature);
        formData.append("folder", "sbkheights");

        const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
          method: "POST",
          body: formData,
        });

        if (uploadRes.ok) {
          successCount++;
        } else {
          const errData = await uploadRes.json();
          console.error("Upload error:", errData);
          showToast(`Failed to upload ${file.name}`, "error");
        }
      }

      if (successCount > 0) {
        showToast(`${successCount} file(s) uploaded successfully`);
        await fetchFiles();
      }
    } catch (err: any) {
      console.error(err);
      showToast(err.message || "Upload failed", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (file: MediaFile) => {
    if (!confirm(`Delete "${file.name}"? This cannot be undone.`)) return;
    setDeleting(file.name);

    try {
      const res = await fetch("/api/media", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: file.name }),
      });
      if (res.ok) {
        showToast(`"${file.name}" deleted`);
        if (selected?.name === file.name) setSelected(null);
        await fetchFiles();
      } else {
        const data = await res.json();
        showToast(data.error || "Delete failed", "error");
      }
    } catch {
      showToast("Delete failed", "error");
    } finally {
      setDeleting(null);
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(window.location.origin + url);
    showToast("URL copied to clipboard");
  };

  const filtered = files.filter((f) => filter === "all" || f.type === filter);

  return (
    <div className="space-y-10 pb-20">

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 right-6 z-50 px-6 py-4 text-sm font-label font-bold uppercase tracking-widest shadow-xl ${
              toast.type === "success" ? "bg-primary text-secondary" : "bg-red-600 text-white"
            }`}
          >
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-secondary font-label uppercase tracking-[0.3rem] text-[10px] mb-2 font-bold">Admin Console</p>
          <h1 className="text-4xl font-headline text-primary font-bold uppercase tracking-tighter">Media Library</h1>
          <p className="text-on-surface-variant font-body text-sm mt-2">
            {files.length} file{files.length !== 1 ? "s" : ""} stored · Images & Videos
          </p>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="gold-gradient-bg text-primary px-8 py-4 font-label font-black uppercase tracking-widest text-xs hover:-translate-y-0.5 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-3"
        >
          <span className="material-symbols-outlined text-sm">upload</span>
          {uploading ? "Uploading…" : "Upload Files"}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*"
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
        />
      </div>

      {/* Drag & Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleUpload(e.dataTransfer.files); }}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed p-12 text-center cursor-pointer transition-all duration-300 ${
          dragOver
            ? "border-secondary bg-secondary/5 scale-[1.01]"
            : "border-outline-variant/30 hover:border-secondary/50 hover:bg-surface"
        }`}
      >
        <span className="material-symbols-outlined text-5xl text-secondary mb-4 block">cloud_upload</span>
        <p className="text-primary font-headline text-lg font-bold uppercase tracking-tighter mb-1">
          Drag & Drop Files Here
        </p>
        <p className="text-on-surface-variant text-xs font-label font-bold uppercase tracking-widest">
          or click to browse · Images & Videos supported
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        {(["all", "image", "video"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-6 py-2 text-xs font-label font-black uppercase tracking-widest transition-all ${
              filter === tab
                ? "bg-primary text-secondary"
                : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            {tab === "all" ? `All (${files.length})` : tab === "image" ? `Images (${files.filter(f => f.type === "image").length})` : `Videos (${files.filter(f => f.type === "video").length})`}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-square bg-surface-container-high animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-32 text-center">
          <span className="material-symbols-outlined text-6xl text-outline-variant mb-4 block">photo_library</span>
          <p className="text-on-surface-variant font-label uppercase tracking-widest text-xs font-bold">No media found</p>
          <p className="text-on-surface-variant/60 font-body text-sm mt-2">Upload files using the button above</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <AnimatePresence>
            {filtered.map((file) => (
              <motion.div
                key={file.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                layout
                onClick={() => setSelected(file)}
                className={`group relative aspect-square bg-surface-container-high overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                  selected?.name === file.name ? "border-secondary" : "border-transparent hover:border-secondary/50"
                }`}
              >
                {file.type === "video" ? (
                  <video
                    src={file.url}
                    className="w-full h-full object-cover"
                    muted
                    onMouseOver={(e) => (e.currentTarget as HTMLVideoElement).play()}
                    onMouseOut={(e) => { (e.currentTarget as HTMLVideoElement).pause(); (e.currentTarget as HTMLVideoElement).currentTime = 0; }}
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/60 transition-all duration-300 flex flex-col items-end justify-start p-3 gap-2 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(file); }}
                    disabled={deleting === file.name}
                    className="w-8 h-8 bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors"
                    title="Delete"
                  >
                    <span className="material-symbols-outlined text-sm">
                      {deleting === file.name ? "hourglass_empty" : "delete"}
                    </span>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); copyUrl(file.url); }}
                    className="w-8 h-8 bg-secondary text-primary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                    title="Copy URL"
                  >
                    <span className="material-symbols-outlined text-sm">link</span>
                  </button>
                </div>

                {/* Type badge */}
                <div className="absolute bottom-2 left-2">
                  <span className="text-[8px] font-black uppercase tracking-widest bg-primary/80 text-white px-2 py-0.5">
                    {file.type}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Detail panel */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            className="fixed top-20 right-0 w-80 h-[calc(100vh-5rem)] bg-white border-l border-outline-variant/20 shadow-2xl z-40 flex flex-col overflow-y-auto"
          >
            <div className="flex items-center justify-between p-6 border-b border-outline-variant/10">
              <h3 className="font-headline text-primary uppercase tracking-tighter font-bold">File Details</h3>
              <button onClick={() => setSelected(null)} className="text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6 space-y-6 flex-1">
              {/* Preview */}
              <div className="aspect-video bg-surface-container-high overflow-hidden">
                {selected.type === "video" ? (
                  <video src={selected.url} controls className="w-full h-full object-contain" />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={selected.url} alt={selected.name} className="w-full h-full object-contain" />
                )}
              </div>

              {/* Metadata */}
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-secondary mb-1">Filename</p>
                  <p className="text-sm text-primary font-body break-all">{selected.name}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-secondary mb-1">Type</p>
                  <p className="text-sm text-primary capitalize">{selected.type}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-secondary mb-1">Size</p>
                  <p className="text-sm text-primary">{formatBytes(selected.size)}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-secondary mb-1">Uploaded At</p>
                  <p className="text-sm text-primary">{formatDate(selected.uploadedAt)}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-secondary mb-1">URL Path</p>
                  <p className="text-xs text-on-surface-variant font-mono break-all">{selected.url}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-4 border-t border-outline-variant/10">
                <button
                  onClick={() => copyUrl(selected.url)}
                  className="w-full bg-primary text-secondary py-3 font-label font-black uppercase tracking-widest text-xs hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">link</span>
                  Copy URL
                </button>
                <a
                  href={selected.url}
                  download={selected.name}
                  className="w-full bg-surface-container-low text-primary py-3 font-label font-black uppercase tracking-widest text-xs hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">download</span>
                  Download
                </a>
                <button
                  onClick={() => handleDelete(selected)}
                  disabled={deleting === selected.name}
                  className="w-full bg-red-50 text-red-600 py-3 font-label font-black uppercase tracking-widest text-xs hover:bg-red-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-sm">delete</span>
                  {deleting === selected.name ? "Deleting…" : "Delete File"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
