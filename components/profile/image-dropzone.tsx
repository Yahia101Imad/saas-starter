"use client";

import { useRef, useState, type DragEvent } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/shared/user-avatar";
import { ImageCropModal } from "./image-crop-modal";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import {
  saveImagePublicId,
  removeProfileImage,
} from "@/app/(dashboard)/dashboard/profile/actions";

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
  const [isRemoving, setIsRemoving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null | undefined>(
    currentImage,
  );
  const [pendingImageSrc, setPendingImageSrc] = useState<string | null>(null);

  const validateAndRead = (file: File) => {
    setError(null);

    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`Image must be smaller than ${MAX_FILE_SIZE_MB}MB`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setPendingImageSrc(reader.result as string);
    reader.readAsDataURL(file);
  };

  const uploadCroppedImage = async (blob: Blob) => {
    setPendingImageSrc(null);

    if (!CLOUD_NAME || !UPLOAD_PRESET) {
      setError("Image upload is not configured");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", blob, "avatar.jpg");
      formData.append("upload_preset", UPLOAD_PRESET);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData },
      );

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      const secureUrl = data.secure_url as string;
      const publicId = data.public_id as string;

      const { error: updateError } = await authClient.updateUser({
        image: secureUrl,
      });

      if (updateError) {
        setError(updateError.message ?? "Failed to save image");
        return;
      }

      await saveImagePublicId(publicId);
      setPreviewUrl(secureUrl);
    } catch {
      setError("Something went wrong while uploading the image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = async () => {
    setIsRemoving(true);
    setError(null);

    try {
      const result = await removeProfileImage();

      if (!result.success) {
        setError(result.error ?? "Failed to remove image");
        return;
      }

      await authClient.updateUser({ image: null });
      setPreviewUrl(null);
    } finally {
      setIsRemoving(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) validateAndRead(file);
  };

  return (
    <>
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
            (isUploading || isRemoving) && "pointer-events-none opacity-60",
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
              if (file) validateAndRead(file);
              e.target.value = "";
            }}
          />
        </div>

        {previewUrl && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleRemove();
            }}
            disabled={isRemoving || isUploading}
            className="text-destructive hover:text-destructive"
          >
            <X className="h-4 w-4" />
            {isRemoving ? "Removing..." : "Remove photo"}
          </Button>
        )}

        {error && <p className="text-destructive text-sm">{error}</p>}
      </div>

      {pendingImageSrc && (
        <ImageCropModal
          imageSrc={pendingImageSrc}
          onCancel={() => setPendingImageSrc(null)}
          onConfirm={uploadCroppedImage}
        />
      )}
    </>
  );
}
