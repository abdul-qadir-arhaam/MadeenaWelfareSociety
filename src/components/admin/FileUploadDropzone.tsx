"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, Loader2, CheckCircle2, Image as ImageIcon, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface FileUploadDropzoneProps {
  onUploadComplete: (uploaded: Array<{ url: string; name: string }>) => void;
  multiple?: boolean;
  label?: string;
  sublabel?: string;
  compact?: boolean;
}

export function FileUploadDropzone({
  onUploadComplete,
  multiple = true,
  label = "Upload photos from your computer",
  sublabel = "Supports PNG, JPG, JPEG, WebP. Drag & drop or click to browse.",
  compact = false,
}: FileUploadDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [successCount, setSuccessCount] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadError(null);
    setSuccessCount(null);

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append(multiple ? "files" : "file", files[i]);
    }

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to upload files");
      }

      if (data.files && data.files.length > 0) {
        onUploadComplete(data.files);
        setSuccessCount(data.files.length);
        setTimeout(() => setSuccessCount(null), 4000);
      } else if (data.url) {
        onUploadComplete([{ url: data.url, name: files[0].name }]);
        setSuccessCount(1);
        setTimeout(() => setSuccessCount(null), 4000);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error uploading file";
      setUploadError(message);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  if (compact) {
    return (
      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-[#047857] border border-emerald-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer disabled:opacity-60"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <UploadCloud className="w-3.5 h-3.5" />
              <span>{label}</span>
            </>
          )}
        </button>
        {uploadError && (
          <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            <span>{uploadError}</span>
          </p>
        )}
      </div>
    );
  }

  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={() => fileInputRef.current?.click()}
      className={`relative border-2 border-dashed rounded-xl p-5 text-center transition-all cursor-pointer ${
        isDragging
          ? "border-emerald-500 bg-emerald-50/80 scale-[1.01]"
          : "border-slate-300 hover:border-emerald-600 hover:bg-slate-50/80 bg-white"
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
      />

      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#047857] flex items-center justify-center shadow-xs">
          {isUploading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <UploadCloud className="w-5 h-5" />
          )}
        </div>

        <div>
          <span className="text-xs font-bold text-[#0B2238] block">
            {isUploading ? "Uploading photos from system..." : label}
          </span>
          <span className="text-[11px] text-slate-500 mt-0.5 block">{sublabel}</span>
        </div>

        {successCount !== null && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-semibold animate-in fade-in">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Successfully added {successCount} photo{successCount > 1 ? "s" : ""}!</span>
          </div>
        )}

        {uploadError && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-100 text-red-800 text-[11px] font-semibold">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{uploadError}</span>
          </div>
        )}
      </div>
    </div>
  );
}
