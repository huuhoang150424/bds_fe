'use client';

import type React from 'react';
import { useRef, useState } from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  className?: string;
}

export function FileUpload({
  onFilesSelected,
  accept = 'image/*',
  multiple = true,
  maxFiles = 10,
  className,
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    onFilesSelected(fileArray);

    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fileArray = Array.from(e.dataTransfer.files).filter((file) => {
        // Filter files based on accept attribute
        if (accept === '*' || accept === '*/*') return true;
        if (accept.includes('/*')) {
          const acceptType = accept.split('/')[0];
          return file.type.startsWith(`${acceptType}/`);
        }
        return accept.split(',').some((type) => file.type === type.trim());
      });

      if (fileArray.length > 0) {
        onFilesSelected(fileArray.slice(0, maxFiles));
      }
    }
  };

  return (
    <div className={className}>
      <input
        type='file'
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        multiple={multiple}
        className='hidden'
        id='file-upload'
      />

      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragging ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-red-400 hover:bg-gray-50'
        }`}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className='h-10 w-10 mx-auto text-gray-400' />
        <p className='mt-2 text-gray-600 font-medium'>Kéo thả hoặc nhấp để tải lên</p>
        <p className='text-sm text-gray-400 mt-1'>
          {multiple ? `Tối đa ${maxFiles} tệp` : 'Chỉ 1 tệp'} • {accept.replace('*', 'Tất cả các loại')}
        </p>
      </div>
    </div>
  );
}
