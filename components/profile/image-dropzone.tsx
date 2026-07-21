"use client";

import { useRef, useState, type DragEvent } from "react";
import { UserAvatar } from "@/components/shared/user-avatar";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

const MAX_FILE_SIZE_MB = 5;

interface ImageDropzoneProps {
  name: string;
  currentImage?: string | null;
}

export function ImageDropzone({ name, currentImage }: ImageDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null | undefined>(
    currentImage,
  );

  const uploadFile = async (file: File) => {
    setError(null);

    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`Image must be smaller than ${MAX_FILE_SIZE_MB}MB`);
      return;
    }
    if (!CLOUD_NAME || !UPLOAD_PRESET) {
      setError("Image upload is not configured");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData },
      );

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();
      const secureUrl = data.secure_url as string;

      const { error: updateError } = await authClient.updateUser({
        image: secureUrl,
      });

      if (updateError) {
        setError(updateError.message ?? "Failed to save image");
        return;
      }

      setPreviewUrl(secureUrl);
    } catch {
      setError("Something went wrong while uploading the image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  return (
    <div className="space-y-2">
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "flex cursor-pointer items-center gap-4 rounded-md border-2 border-dashed p-4 transition-colors",
          isDragging ? "border-primary bg-accent" : "border-border",
          isUploading && "pointer-events-none opacity-60",
        )}
      >
        <UserAvatar name={name} image={previewUrl} size="lg" />

        <div className="text-sm">
          <p className="font-medium">
            {isUploading
              ? "Uploading..."
              : "Drag & drop an image, or click to browse"}
          </p>
          <p className="text-muted-foreground">
            PNG or JPG, up to {MAX_FILE_SIZE_MB}MB
          </p>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) uploadFile(file);
          }}
        />
      </div>

      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  );
}
