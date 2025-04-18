"use client";
import { Car } from "lucide-react";
import Image from "next/image";
import { useRef, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export function ImageUploader() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && inputRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      inputRef.current.files = dataTransfer.files;

      setPreview(URL.createObjectURL(file));
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: { "image/*": [] } });

  return (
    <div
      {...getRootProps()}
      className="w-full h-52 rounded-2xl border-2 border-dashed border-muted bg-muted/10 hover:bg-muted/20 transition-all duration-300 flex flex-col justify-center items-center text-center cursor-pointer p-4"
    >
      <input {...getInputProps()} />
      <input
        type="file"
        name="image"
        accept="image/*"
        ref={inputRef}
        className="hidden"
        readOnly
      />
      {preview ? (
        <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-muted shadow-md">
          <Image
            src={preview}
            alt="Image preview"
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-2 text-muted-foreground">
          <Car className="w-10 h-10"/>
          <p className="text-sm font-medium">Drag & drop an image or click to upload</p>
          <p className="text-xs text-muted-foreground">PNG, JPG, JPEG only</p>
        </div>
      )}
    </div>
  );
}
