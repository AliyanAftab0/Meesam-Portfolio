"use client";

import { useState, useRef } from "react";
import { Upload, X, File, Image as ImageIcon, Film } from "lucide-react";
import styles from "./FileUpload.module.css";

interface FileUploadProps {
  onUpload: (url: string) => void;
  accept: string;
  label: string;
  defaultValue?: string;
  type: "image" | "video";
}

export default function FileUpload({
  onUpload,
  accept,
  label,
  defaultValue,
  type,
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(defaultValue || "");
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0]);
    }
  };

  const handleFiles = async (file: File) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setPreview(data.url);
        onUpload(data.url);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview("");
    onUpload("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div
      className={`${styles.uploadZone} ${dragActive ? styles.dragActive : ""} ${
        preview ? styles.hasPreview : ""
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        className={styles.hiddenInput}
        accept={accept}
        onChange={handleChange}
      />

      {preview ? (
        <div className={styles.previewContainer}>
          {type === "image" ? (
            <img src={preview} alt="Preview" className={styles.previewImage} />
          ) : (
            <div className={styles.videoPlaceholder}>
              <Film size={40} />
              <span>Video Selected</span>
            </div>
          )}
          <button className={styles.removeBtn} onClick={removeFile}>
            <X size={16} />
          </button>
        </div>
      ) : (
        <div className={styles.uploadContent}>
          <div className={styles.iconWrapper}>
            {type === "image" ? <ImageIcon size={24} /> : <Film size={24} />}
            <Upload size={16} className={styles.uploadBadge} />
          </div>
          <div className={styles.textWrapper}>
            <p className={styles.label}>{label}</p>
            <p className={styles.hint}>
              {isUploading ? "Uploading..." : "Drag & drop or click to select"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
