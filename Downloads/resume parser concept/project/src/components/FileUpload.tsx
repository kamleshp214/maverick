import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, File, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from './Button';

type FileUploadProps = {
  multiple?: boolean;
  onFilesSelected: (files: File[]) => void;
  acceptedFileTypes?: Record<string, string[]>;
  maxFiles?: number;
  maxSize?: number;
  className?: string;
  selectedFiles: File[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
};

const FileUpload: React.FC<FileUploadProps> = ({
  multiple = false,
  onFilesSelected,
  acceptedFileTypes = {
    'application/pdf': ['.pdf'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  },
  maxFiles = 10,
  maxSize = 5 * 1024 * 1024, // 5MB
  className = '',
  selectedFiles,
  setSelectedFiles,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const validFiles = acceptedFiles.slice(0, maxFiles - selectedFiles.length);
      
      if (validFiles.length > 0) {
        const newFiles = [...selectedFiles, ...validFiles];
        setSelectedFiles(newFiles);
        onFilesSelected(newFiles);
      }
    },
    [maxFiles, onFilesSelected, selectedFiles, setSelectedFiles]
  );

  const removeFile = (index: number) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
    onFilesSelected(newFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    multiple,
    maxSize,
    maxFiles: maxFiles - selectedFiles.length,
  });

  return (
    <div className={className}>
      <motion.div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-coral bg-coral/10' : 'border-gray-300 hover:border-coral'
        }`}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <input {...getInputProps()} />
        
        <UploadCloud size={48} className="mx-auto mb-4 text-coral" />
        
        <p className="text-lg font-medium mb-2">
          {isDragActive ? 'Drop the files here' : 'Drag & drop resume files here'}
        </p>
        
        <p className="text-sm text-gray-500 mb-4">
          {multiple
            ? `Upload up to ${maxFiles} PDF or DOCX files (max 5MB each)`
            : 'Upload a PDF or DOCX file (max 5MB)'}
        </p>
        
        <Button size="sm" variant="outline">
          Browse Files
        </Button>
      </motion.div>

      {selectedFiles.length > 0 && (
        <div className="mt-4">
          <h3 className="font-medium mb-2">Selected Files ({selectedFiles.length})</h3>
          <ul className="space-y-2">
            {selectedFiles.map((file, index) => (
              <motion.li
                key={`${file.name}-${index}`}
                className="flex items-center justify-between bg-ivory p-3 rounded-md"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="flex items-center">
                  <File size={20} className="mr-2 text-charcoal" />
                  <span className="truncate max-w-[200px] md:max-w-xs">{file.name}</span>
                  <span className="ml-2 text-xs text-gray-500">
                    ({(file.size / 1024).toFixed(0)} KB)
                  </span>
                </div>
                <Button
                  onClick={() => removeFile(index)}
                  size="sm"
                  variant="outline"
                  className="ml-2 !p-1 !border-0"
                  icon={<X size={16} />}
                >
                  <span className="sr-only">Remove</span>
                </Button>
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUpload;