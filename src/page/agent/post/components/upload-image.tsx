"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Upload, X, ImageIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ImageFile {
  id: string;
  file: File;
  preview: string;
}

interface MultiImageUploadProps {
  onImagesSelect?: (files: File[]) => void; // Updated to return File[]
  className?: string;
  maxSizeMB?: number;
  acceptedTypes?: string[];
  maxFiles?: number;
}

export function MultiImageUpload({
  onImagesSelect,
  className,
  maxSizeMB = 5,
  acceptedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"],
  maxFiles = 10,
}: MultiImageUploadProps) {
  const [selectedImages, setSelectedImages] = useState<ImageFile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFiles(Array.from(files));
    }
  };

  const handleFiles = (files: File[]) => {
    setError(null);

    if (!files.length) return;

    if (selectedImages.length + files.length > maxFiles) {
      setError(`Không thể chọn quá ${maxFiles} ảnh`);
      return;
    }

    const newImages: ImageFile[] = [];
    const invalidFiles: string[] = [];
    const oversizedFiles: string[] = [];
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    files.forEach((file) => {
      if (!acceptedTypes.includes(file.type)) {
        invalidFiles.push(file.name);
        return;
      }

      if (file.size > maxSizeBytes) {
        oversizedFiles.push(file.name);
        return;
      }

      const id = `${file.name}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const preview = URL.createObjectURL(file);
      newImages.push({ id, file, preview });
    });

    setSelectedImages((prev) => [...prev, ...newImages]);
    if (onImagesSelect) {
      onImagesSelect(newImages.map((img) => img.file)); // Return File[] directly
    }

    if (invalidFiles.length || oversizedFiles.length) {
      let errorMessage = "";
      if (invalidFiles.length) {
        errorMessage += `Các file không hợp lệ: ${invalidFiles.join(", ")}. Chỉ chấp nhận: ${acceptedTypes
          .map((type) => type.replace("image/", "."))
          .join(", ")}. `;
      }
      if (oversizedFiles.length) {
        errorMessage += `Các file vượt quá ${maxSizeMB}MB: ${oversizedFiles.join(", ")}.`;
      }
      setError(errorMessage);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files) {
      handleFiles(Array.from(files));
    }
  };

  const removeImage = (id: string) => {
    setSelectedImages((prev) => {
      const newImages = prev.filter((img) => img.id !== id);
      const removedImage = prev.find((img) => img.id === id);
      if (removedImage) URL.revokeObjectURL(removedImage.preview);
      if (onImagesSelect) {
        onImagesSelect(newImages.map((img) => img.file)); // Return File[] directly
      }
      return newImages;
    });
  };

  const clearAllImages = () => {
    selectedImages.forEach((img) => URL.revokeObjectURL(img.preview));
    setSelectedImages([]);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (onImagesSelect) {
      onImagesSelect([]); // Return empty File[]
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      selectedImages.forEach((img) => URL.revokeObjectURL(img.preview));
    };
  }, [selectedImages]);

  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="p-6">
        <div
          className={cn(
            "relative flex flex-col items-center justify-center w-full min-h-[200px] rounded-lg border-2 border-dashed transition-colors",
            isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25",
            "p-6"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
              <ImageIcon className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Kéo và thả ảnh vào đây hoặc nhấn để chọn</p>
              <p className="text-xs text-muted-foreground">
                Hỗ trợ: {acceptedTypes.map((type) => type.replace("image/", ".")).join(", ")} (tối đa {maxSizeMB}MB)
              </p>
              <p className="text-xs text-muted-foreground">Số lượng: tối đa {maxFiles} ảnh</p>
            </div>
            <Button variant="secondary" onClick={triggerFileInput} className="gap-2">
              <Upload className="h-4 w-4" />
              Chọn ảnh
            </Button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedTypes.join(",")}
            className="hidden"
            onChange={handleFileChange}
            multiple
          />
        </div>

        {error && <p className="text-destructive text-sm mt-2">{error}</p>}

        {selectedImages.length > 0 && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">
                Ảnh đã chọn ({selectedImages.length}/{maxFiles})
              </h3>
              <Button variant="outline" size="sm" onClick={clearAllImages} className="gap-1">
                <Trash2 className="h-3.5 w-3.5" />
                Xóa tất cả
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {selectedImages.map((image) => (
                <div key={image.id} className="relative group aspect-square rounded-md overflow-hidden border">
                  <img
                    src={image.preview || "/placeholder.svg"}
                    alt={`Ảnh ${image.file.name}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => removeImage(image.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 truncate">
                    {image.file.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}